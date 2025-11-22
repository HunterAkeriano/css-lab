import { Router } from 'express'
import { getDb } from '../config/db'
import type { Env } from '../config/env'

export function createUsersRouter(env: Env) {
  const router = Router()
  const db = getDb()

  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: Получить список пользователей
   *     description: Возвращает список всех пользователей с пагинацией, фильтрацией и сортировкой (исключая супер-админа)
   *     tags: [Users]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *         description: Номер страницы
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 20
   *         description: Количество на странице
   *       - in: query
   *         name: tier
   *         schema:
   *           type: string
   *           enum: [all, free, pro, premium]
   *           default: all
   *         description: Фильтр по тарифу
   *       - in: query
   *         name: sortBy
   *         schema:
   *           type: string
   *           enum: [name, email, createdAt, subscriptionTier]
   *           default: createdAt
   *         description: Поле для сортировки
   *       - in: query
   *         name: sortOrder
   *         schema:
   *           type: string
   *           enum: [asc, desc]
   *           default: desc
   *         description: Направление сортировки
   *     responses:
   *       200:
   *         description: Список пользователей успешно получен
   */
  router.get('/', async (req, res) => {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1)
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20))
      const tier = ((req.query.tier as string) || 'all').toLowerCase()
      const sortBy = ((req.query.sortBy as string) || 'createdAt').toLowerCase()
      const sortOrder = ((req.query.sortOrder as string) || 'desc').toLowerCase()
      const offset = (page - 1) * limit

      const allowedTiers = ['all', 'free', 'pro', 'premium'] as const
      const allowedSortFields = ['name', 'email', 'createdat', 'subscriptiontier'] as const
      const sanitizedTier = allowedTiers.includes(tier as any) ? tier : 'all'
      const sanitizedSortBy = allowedSortFields.includes(sortBy as any) ? sortBy : 'createdat'
      const sanitizedSortOrder = sortOrder === 'asc' ? 'asc' : 'desc'

      // Исключаем супер-админа
      const superAdminEmail = env.SUPER_ADMIN_EMAIL.toLowerCase()

      // Построение WHERE условий
      let whereClause = 'WHERE LOWER(email) != LOWER($1)'
      const queryParams: any[] = [superAdminEmail]
      let paramIndex = 2

      if (sanitizedTier !== 'all') {
        whereClause += ` AND subscription_tier = $${paramIndex}`
        queryParams.push(sanitizedTier)
        paramIndex++
      }

      // Маппинг полей для сортировки
      const sortFieldMap: Record<(typeof allowedSortFields)[number], string> = {
        name: `COALESCE(NULLIF(name, ''), split_part(email, '@', 1))`,
        email: 'email',
        createdat: 'created_at',
        subscriptiontier: 'subscription_tier'
      }

      const sortField = sortFieldMap[sanitizedSortBy as (typeof allowedSortFields)[number]] || 'created_at'
      const sortDirection = sanitizedSortOrder === 'asc' ? 'ASC' : 'DESC'

      // Получение общего количества
      const countQuery = `SELECT COUNT(*)::int AS total FROM users ${whereClause}`
      const countResult = await db.query(countQuery, queryParams)
      const total = countResult.rows[0]?.total || 0

      // Получение пользователей
      const usersQuery = `
        SELECT
          id,
          email,
          name,
          avatar_url as "avatarUrl",
          subscription_tier as "subscriptionTier",
          created_at as "createdAt"
        FROM users
        ${whereClause}
        ORDER BY
          CASE
            WHEN subscription_tier = 'premium' THEN 1
            WHEN subscription_tier = 'pro' THEN 2
            WHEN subscription_tier = 'free' THEN 3
            ELSE 4
          END,
          ${sortField} ${sortDirection}
        LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
      `

      queryParams.push(limit, offset)
      const usersResult = await db.query(usersQuery, queryParams)

      res.json({
        users: usersResult.rows,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasMore: offset + limit < total
        }
      })
    } catch (error) {
      console.error('Failed to fetch users:', error)
      res.status(500).json({ message: 'Failed to fetch users' })
    }
  })

  return router
}

import { Router } from 'express'

/**
 * @swagger
 * /api/health/health:
 *   get:
 *     summary: Проверка состояния API
 *     description: Возвращает статус работы API и текущее время сервера
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API работает нормально
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-11-21T12:00:00.000Z
 */
export const healthRouter = Router().get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

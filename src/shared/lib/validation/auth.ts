import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'EMAIL_REQUIRED').email('EMAIL_INVALID'),
  password: z.string().min(1, 'PASSWORD_REQUIRED').min(8, 'PASSWORD_MIN')
})

export const registerSchema = z.object({
  email: z.string().min(1, 'EMAIL_REQUIRED').email('EMAIL_INVALID'),
  password: z.string().min(1, 'PASSWORD_REQUIRED').min(8, 'PASSWORD_MIN'),
  name: z.string().min(1, 'NAME_MIN').max(120, 'NAME_MAX').optional()
})

export const updateProfileSchema = z.object({
  name: z.string().min(1, 'NAME_MIN').max(120, 'NAME_MAX').optional(),
  avatarUrl: z.string().url('EMAIL_INVALID').optional()
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type UpdateProfileData = z.infer<typeof updateProfileSchema>

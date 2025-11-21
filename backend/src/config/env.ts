import { z } from 'zod'

const EnvSchema = z.object({
  PORT: z.string().optional(),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(12),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  SUPER_ADMIN_EMAIL: z.string().email().default('superuser@gmail.com'),
  SUPER_ADMIN_PASSWORD: z.string().min(8).default('12345678')
})

export type Env = z.infer<typeof EnvSchema>

export function loadEnv(): Env {
  const parsed = EnvSchema.safeParse(process.env)
  if (!parsed.success) {
    console.error('❌ Invalid environment variables', parsed.error.flatten().fieldErrors)
    throw new Error('Invalid environment')
  }
  return parsed.data
}

import type { ZodSchema } from 'zod'

export function safeValidate<T>(schema: ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data)
  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    }
  }
  return {
    success: true,
    data: result.data,
  }
}

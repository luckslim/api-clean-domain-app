import z from 'zod';
export const envSchema = z.object({
  DATABASE_URL: z.url(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  AWS_PUBLIC_KEY: z.string(),
  AWS_SECRET_KEY: z.string(),
  BUCKET_NAME: z.string(),
  AWS_REGION: z.string(),
  PORT: z.coerce.number().optional().default(3333),
});
export type Env = z.infer<typeof envSchema>;

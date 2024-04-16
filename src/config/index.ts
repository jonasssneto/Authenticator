import "dotenv/config";
import z from "zod";

const zod = z.object({
  PORT: z.string(),
  CORS_ORIGIN: z.string(),
  DATABASE_URL: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_SENDER: z.string(),
});

const CONFIG = zod.parse(process.env);

export { CONFIG };


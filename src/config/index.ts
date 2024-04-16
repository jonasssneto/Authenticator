import "dotenv/config";
import z from "zod";

const zod = z.object({
    PORT: z.string(),
    CORS_ORIGIN: z.string(),
    DATABASE_URL: z.string(),
});

const CONFIG = zod.parse(process.env);

export {
    CONFIG
};


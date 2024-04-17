import { z } from "zod";

const login = z.object({
  body: z.object({
    username: z.string(),
    password: z.string().min(8),
  }),
});

const create = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string(),
  }),
});

const forgot = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

const reset = z.object({
  params: z.object({
    token: z.string(),
  }),
  body: z.object({
    password: z.string().min(8),
  }),
});

export { create, forgot, login, reset };


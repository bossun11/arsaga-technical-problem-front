import { z } from "zod";
import { loginSchema, signUpSchema } from "@/app/utils/validationSchema";

export type SignUpParams = z.infer<typeof signUpSchema>;

export type LoginParams = z.infer<typeof loginSchema>;

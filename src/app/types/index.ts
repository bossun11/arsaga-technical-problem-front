import { z } from "zod";
import { signUpSchema } from "@/app/utils/validationSchema";

export type SignUpParams = z.infer<typeof signUpSchema>;

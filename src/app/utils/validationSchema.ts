import { z } from "zod";

const name = z
  .string()
  .min(1, "名前は必須です。")
  .max(50, "50文字以下で入力してください。");

const email = z.string().email("メールアドレスの形式で入力してください。");

const password = z
  .string()
  .min(8, "パスワードは8文字以上で入力してください。")
  .max(50, "50文字以下で入力してください。");

export const signUpSchema = z.object({
  name,
  email,
  password,
});

export const loginSchema = z.object({
  email,
  password,
});

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

const title = z
  .string()
  .min(1, "タイトルは必須です。")
  .max(100, "100文字以下で入力してください。");

const content = z
  .string()
  .min(1, "本文は必須です。")
  .max(1000, "1000文字以下で入力してください。");

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const image = z
  .any()
  .refine((value) => {
    if (!(value instanceof FileList)) return true;
    const file = value[0];
    if (!file) return true;
    if (file.size > 10000000) return false;
    if (!IMAGE_TYPES.includes(file.type)) return false;
    return true;
  }, "画像は10MB以下のjpeg, png, webp形式で選択してください。")
  .transform((value) => (value instanceof FileList ? value[0] : value));

const tags = z
  .string()
  .max(255, "タグ全体で255文字以下で入力してください。")
  .refine((data) => data.split(/\s+/).filter(Boolean).length <= 3, {
    message: "タグは最大3つまでです。",
  });

export const signUpSchema = z.object({
  name,
  email,
  password,
});

export const loginSchema = z.object({
  email,
  password,
});

export const postSchema = z.object({
  title,
  content,
  image,
  tags,
});

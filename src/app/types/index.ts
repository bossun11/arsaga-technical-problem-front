import { z } from "zod";
import {
  loginSchema,
  postSchema,
  searchPostSchema,
  signUpSchema,
} from "@/app/utils/validationSchema";

export type SignUpParams = z.infer<typeof signUpSchema>;

export type LoginParams = z.infer<typeof loginSchema>;

export type PostFormParams = z.infer<typeof postSchema>;

export type SearchPostParams = z.infer<typeof searchPostSchema>;

export type PostApiParams = {
  title: string;
  content: string;
  image?: string;
  tags?: string[];
};

export type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
  user_id: number;
  user: {
    name: string;
  };
  tags: {
    id: number;
    name: string;
  }[];
};

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpParams } from "../types";
import { signUpSchema } from "../utils/validationSchema";
import Button from "./Button";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpParams>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (params: SignUpParams) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/register`,
        {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      router.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const buttonText = "登録する";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <label className="mb-2 text-md" htmlFor="name">
          ユーザー名
        </label>
        <input
          className="w-full px-3 py-1 border rounded-md"
          id="name"
          type="text"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-error">{errors.name.message}</span>
        )}
      </div>

      <div className="mb-2">
        <label className="mb-2 text-md" htmlFor="email">
          メールアドレス
        </label>
        <input
          className="w-full px-3 py-1 border rounded-md"
          id="email"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-error">{errors.email.message}</span>
        )}
      </div>

      <div className="mb-2">
        <label className="mb-2 text-md" htmlFor="password">
          パスワード
        </label>
        <input
          className="w-full px-3 py-1 border rounded-md"
          id="password"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-error">{errors.password.message}</span>
        )}
      </div>

      <div className="flex justify-center">
        <Button buttonText={buttonText} />
      </div>
    </form>
  );
};

export default SignUpForm;

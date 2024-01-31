"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpParams } from "../app/types";
import { signUpSchema } from "../app/utils/validationSchema";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<SignUpParams>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
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

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <div className="mb-2">
    //     <label className="mb-2 text-md" htmlFor="name">
    //       ユーザー名
    //     </label>
    //     <input
    //       className="w-full px-3 py-1 border rounded-md"
    //       id="name"
    //       type="text"
    //       {...register("name")}
    //     />
    //     {errors.name && (
    //       <span className="text-error">{errors.name.message}</span>
    //     )}
    //   </div>

    //   <div className="mb-2">
    //     <label className="mb-2 text-md" htmlFor="email">
    //       メールアドレス
    //     </label>
    //     <input
    //       className="w-full px-3 py-1 border rounded-md"
    //       id="email"
    //       type="email"
    //       {...register("email")}
    //     />
    //     {errors.email && (
    //       <span className="text-error">{errors.email.message}</span>
    //     )}
    //   </div>

    //   <div className="mb-2">
    //     <label className="mb-2 text-md" htmlFor="password">
    //       パスワード
    //     </label>
    //     <input
    //       className="w-full px-3 py-1 border rounded-md"
    //       id="password"
    //       type="password"
    //       {...register("password")}
    //     />
    //     {errors.password && (
    //       <span className="text-error">{errors.password.message}</span>
    //     )}
    //   </div>

    //   <div className="flex justify-center">
    //     <Button>登録する</Button>
    //   </div>
    // </form>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>ユーザー名</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button type="submit">登録する</Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;

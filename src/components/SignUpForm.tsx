"use client";

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
import { toast } from "react-toastify";
import { signUp } from "@/app/api/auth";

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
      await signUp(params);
      router.push("/login");
      toast.success("ユーザー登録が完了しました");
    } catch (e) {
      toast.error("ユーザー登録に失敗しました");
    }
  };

  return (
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
                <Input type="password" {...field} />
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

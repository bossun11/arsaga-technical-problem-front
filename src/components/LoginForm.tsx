"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { loginSchema } from "../app/utils/validationSchema";
import { LoginParams } from "../app/types";
import { getCurrentUser, login } from "@/app/api/auth";
import { useAuthContext } from "@/app/context/AuthContext";

const LoginForm = () => {
  const router = useRouter();
  const { setCurrentUser, setIsSignedIn } = useAuthContext();

  const form = useForm<LoginParams>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (params: LoginParams) => {
    try {
      login(params);
      const user = await getCurrentUser();
      setCurrentUser(user);
      setIsSignedIn(true);
      router.push("/posts");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button type="submit">ログイン</Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;

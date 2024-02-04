"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PostParams } from "@/app/types";
import { postSchema } from "@/app/utils/validationSchema";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PostForm = () => {
  const router = useRouter();

  const form = useForm<PostParams>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
  });

  const onSubmit = async (params: PostParams) => {
    // try {
    //   const formData = new FormData();
    //   formData.append("title", params.title);
    //   formData.append("content", params.content);
    //   formData.append("image", params.image);
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/posts`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //       body: formData,
    //       credentials: "include",
    //     }
    //   );
    //   const data = await res.json();
    //   console.log(data);
    //   router.push("/posts");
    // } catch (e) {
    //   console.log(e);
    // }
    console.log(params);
  };

  return (
    <Form {...form}>
      <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>投稿内容</FormLabel>
              <FormControl>
                <Textarea className="min-h-[160px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>イメージ写真</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button type="submit">投稿する</Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;

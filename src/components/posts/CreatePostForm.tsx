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
import { PostApiParams, PostFormParams } from "@/app/types";
import { postSchema } from "@/app/utils/validationSchema";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { createPost } from "@/app/api/posts";

const CreatePostForm = () => {
  const router = useRouter();

  const form = useForm<PostFormParams>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
      tags: "",
    },
  });

  const onSubmit = async (data: PostFormParams) => {
    const tagsArray = data.tags.split(/\s+/).filter(Boolean);
    const apiParams: PostApiParams = {
      ...data,
      tags: tagsArray,
    };
    try {
      await createPost(apiParams);
      router.push("/posts");
    } catch (e) {
      console.log(e);
    }
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
          name="tags"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>タグ</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="タグをスペース区切りで入力（最大3つ）"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ローカルストレージに画像を保存するとCORSエラーが発生するため、一旦コメントアウト */}
        {/* <FormField
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
        /> */}

        <div className="flex justify-center">
          <Button type="submit">投稿する</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePostForm;

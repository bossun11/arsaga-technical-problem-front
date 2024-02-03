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
import { useState } from "react";

const PostForm = () => {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | null>("");

  const form = useForm<PostParams>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
  });

  const onSubmit = async (params: PostParams) => {
    console.log(params);
    router.push("/posts");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>イメージ写真</FormLabel>
              <FormControl>
                <Input type="file" {...field} onChange={handleImageChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Image
          src={previewImage || "/no_image.webp"}
          alt="No Image"
          width={150}
          height={100}
          className="object-cover"
          priority
          objectFit="contain"
        />

        <div className="flex justify-center">
          <Button type="submit">投稿する</Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;

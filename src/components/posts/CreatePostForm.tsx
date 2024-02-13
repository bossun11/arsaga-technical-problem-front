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
import { PostFormParams } from "@/app/types";
import { postSchema } from "@/app/utils/validationSchema";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { createPost } from "@/app/api/posts";
import { toast } from "react-toastify";

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
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    tagsArray.forEach((tag) => {
      formData.append("tags[]", tag);
    });
    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      await createPost(formData);
      router.push("/posts");
      toast.success("投稿しました");
    } catch (e) {
      toast.error("投稿に失敗しました");
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

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>写真</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    const files = e.target.files;
                    field.onChange(files ? files[0] : null);
                  }}
                />
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

export default CreatePostForm;

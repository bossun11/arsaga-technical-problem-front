import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Post, PostApiParams, PostFormParams } from "@/app/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/app/utils/validationSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useParams } from "next/navigation";
import { updatePostById } from "@/app/api/posts";

type EditPostDialogProps = {
  post: Post | null;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

const EditPostDialog = ({ post, setPost }: EditPostDialogProps) => {
  const [open, setOpen] = useState(false);
  const { title, content, image, tags } = post || {};
  const tagsString = tags?.map((tag) => tag.name).join(" ");
  const { id } = useParams();

  const form = useForm<PostFormParams>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: title,
      content: content,
      image: image,
      tags: tagsString,
    },
  });

  const onSubmit = async (data: PostFormParams) => {
    const tagsArray = data.tags.split(/\s+/).filter(Boolean);
    const apiParams: PostApiParams = {
      ...data,
      tags: tagsArray,
    };
    try {
      const res = await updatePostById(id.toString(), apiParams);
      setPost(res);
    } catch (e) {
      console.error(e);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl mr-3">編集</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>投稿編集</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="grid gap-3">
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

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                キャンセル
              </Button>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                更新
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostDialog;

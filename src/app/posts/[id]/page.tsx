"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Post } from "@/app/types";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams();
  const router = useRouter();

  const getPost = useCallback(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/posts/${id}`
    );
    const data = await res.json();
    setPost(data);
  }, [id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const deletePost = async () => {
    const isConfirm = confirm("本当に削除しますか？");
    if (!isConfirm) return;
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/posts/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      router.push("/posts");
    } catch (e) {
      console.error(e);
    }
  };

  if (!post) return null;
  const { title, content, user, created_at } = post;
  const { name } = user;

  return (
    <div className=" h-screen p-4 flex flex-col items-center">
      <Card className="shadow-xl rounded-xl mb-5 w-1/2 hover:cursor-pointer">
        <CardHeader className="flex flex-col items-center justify-center">
          <Image
            src={"/no_image.webp"}
            width={300}
            height={200}
            alt="投稿画像"
            className="rounded-lg mb-3"
            priority
          />
          <CardTitle>{title}</CardTitle>
          <div className="flex items-start w-full gap-1">
            <Badge className="bg-deepRed hover:bg-rose-700">タグ1</Badge>
            <Badge className="bg-deepRed hover:bg-rose-700">タグ2</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="pl-5">
            <p>{content}</p>
          </div>
          <div className="p-5 flex justify-between">
            <div>
              <p>{name}</p>
              <p>投稿日 {new Date(created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <Button
                className="rounded-xl bg-deepRed hover:bg-rose-700"
                onClick={deletePost}
              >
                削除
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

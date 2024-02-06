"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Post } from "@/app/types";
import { useParams } from "next/navigation";

const Page = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams();

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

  if (!post) return null;

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
          <CardTitle>{post.title}</CardTitle>
          <div className="flex items-start w-full gap-1">
            <Badge className="bg-deepRed">タグ1</Badge>
            <Badge className="bg-deepRed">タグ2</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="pl-5">
            <p>{post.content}</p>
          </div>
          <div className="p-5">
            <p>{post.user.name}</p>
            <p>投稿日 {new Date(post.created_at).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

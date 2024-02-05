"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useEffect } from "react";

const Page = () => {
  const getPosts = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/posts`
    );
    const data = await res.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className=" h-screen p-4">
      <h2 className="text-3xl m-4 text-center">投稿一覧</h2>
      <div className="grid grid-cols-3 gap-4">
        <Card className="shadow-xl rounded-xl mb-5">
          <CardHeader className="flex flex-col items-center justify-center">
            <Image
              src="/no_image.webp"
              width={300}
              height={200}
              alt="投稿画像"
              className="rounded-lg mb-3"
              priority
            />
            <CardTitle className="text-center">タイトル</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-5">
              <p>ユーザー名</p>
              <p>投稿日 2021/10/10</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Page;

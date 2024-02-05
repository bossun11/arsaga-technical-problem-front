"use client";

import PostCard from "@/components/posts/PostCard";
import { useEffect, useState } from "react";
import { Post } from "../types";

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/posts`
    );
    const data = await res.json();
    setPosts(data.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className=" h-screen p-4">
      <h2 className="text-3xl m-4 text-center">投稿一覧</h2>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};
export default Page;

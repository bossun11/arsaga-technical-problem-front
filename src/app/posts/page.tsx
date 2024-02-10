"use client";

import PostCard from "@/components/posts/PostCard";
import { useEffect, useState } from "react";
import { Post } from "../types";
import { getAllPosts } from "../api/posts";
import SearchPostField from "@/components/posts/SearchPostField";

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async () => {
    try {
      const res = await getAllPosts();
      setPosts(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className=" h-screen p-4">
      <h2 className="text-3xl m-4 text-center">投稿一覧</h2>

      <SearchPostField setPosts={setPosts} />

      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};
export default Page;

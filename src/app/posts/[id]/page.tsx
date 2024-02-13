"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Post } from "@/app/types";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deletePostById, getPostById } from "@/app/api/posts";
import EditPostDialog from "@/components/posts/EditPostDialog";
import { useAuthContext } from "@/app/context/AuthContext";
import PostTag from "@/components/posts/PostTag";
import { toast } from "react-toastify";

const Page = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams();
  const router = useRouter();
  const { currentUser } = useAuthContext();

  const getPost = async () => {
    try {
      const res = await getPostById(id.toString());
      setPost(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getPost();
  }, [setPost]);

  const deletePost = async () => {
    const isConfirm = confirm("本当に削除しますか？");
    if (!isConfirm) return;
    try {
      await deletePostById(id.toString());
      router.push("/posts");
      toast.success("投稿を削除しました");
    } catch (e) {
      toast.error("投稿の削除に失敗しました");
    }
  };

  if (!post) return null;
  const { title, content, user, created_at, user_id, image } = post;
  const { name } = user;

  return (
    <div className=" h-screen p-4 flex flex-col items-center">
      <Card className="shadow-xl rounded-xl mb-5 w-1/2">
        <CardHeader className="flex flex-col items-center justify-center">
          <Image
            src={image || "/no_image.webp"}
            width={300}
            height={200}
            alt="投稿画像"
            className="rounded-lg mb-3"
            priority
            objectFit="fit"
          />
          <CardTitle>{title}</CardTitle>
          <div className="flex items-start w-full gap-1">
            {post.tags.map((tag) => (
              <PostTag key={tag.id} name={tag.name} />
            ))}
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
            {currentUser?.id === user_id && (
              <div>
                <EditPostDialog post={post} setPost={setPost} />
                <Button
                  className="rounded-xl bg-deepRed hover:bg-rose-700"
                  onClick={deletePost}
                >
                  削除
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

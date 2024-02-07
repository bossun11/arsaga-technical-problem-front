import { Post } from "@/app/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const PostCard = ({ id, title, image, user, created_at }: Post) => {
  return (
    <Link href={`/posts/${id}`}>
      <Card className="shadow-xl rounded-xl mb-5 hover:cursor-pointer">
        <CardHeader className="flex flex-col items-center justify-center">
          <Image
            src={image || "/no_image.webp"}
            width={300}
            height={200}
            alt="投稿画像"
            className="rounded-lg mb-3"
            priority
          />
          <CardTitle className="text-center">{title}</CardTitle>
          <div className="flex items-start w-full gap-1 pl-5">
            <Badge className="bg-deepRed hover:bg-rose-700">タグ1</Badge>
            <Badge className="bg-deepRed hover:bg-rose-700">タグ2</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="pl-5">
            <p>{user.name}</p>
            <p>投稿日 {new Date(created_at).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;

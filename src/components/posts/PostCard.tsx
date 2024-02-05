import { Post } from "@/app/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const PostCard = ({ title, image, user, created_at }: Post) => {
  return (
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
      </CardHeader>
      <CardContent>
        <div className="p-5">
          <p>{user.name}</p>
          <p>投稿日 {new Date(created_at).toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;

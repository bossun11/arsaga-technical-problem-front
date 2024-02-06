import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const page = () => {
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
          <CardTitle>タイトル</CardTitle>
          <div className="flex items-start w-full gap-1">
            <Badge className="bg-deepRed">タグ1</Badge>
            <Badge className="bg-deepRed">タグ2</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="pl-5">
            <p>投稿内容</p>
          </div>
          <div className="p-5">
            <p>ユーザー名</p>
            <p>投稿日</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;

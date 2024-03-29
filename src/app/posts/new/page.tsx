import CreatePostForm from "@/components/posts/CreatePostForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const page = () => {
  return (
    <div className="flex flex-col items-center mt-12 h-screen">
      <Card className="shadow-xl w-2/5">
        <CardHeader>
          <CardTitle className="text-center">投稿作成</CardTitle>
        </CardHeader>
        <CardContent>
          <CreatePostForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;

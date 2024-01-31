import LoginForm from "@/components/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center mt-20">
      <Card className="shadow-xl w-96">
        <CardHeader>
          <CardTitle className="text-center">ログイン画面</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <Link href="/signup" className="mt-6 mb-10">
        アカウントをお持ちでない方はこちら
      </Link>
    </div>
  );
};

export default page;

import Link from "next/link";
import SignUpForm from "../../components/SignUpForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex flex-col items-center mt-20">
      <Card className="shadow-xl w-96">
        <CardHeader>
          <CardTitle className="text-center">ユーザー登録画面</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
      <Link href="/login" className="mt-6 mb-10">
        すでにアカウントをお持ちの方はこちら
      </Link>
    </div>
  );
}

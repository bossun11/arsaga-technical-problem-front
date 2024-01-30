import Link from "next/link";
import SignUpForm from "../components/SignUpForm";

export default function Page() {
  return (
    <div className="flex flex-col items-center mt-20">
      <div className="w-96 bg-white rounded p-6 shadow-xl">
        <h2 className="text-2xl text-center font-bold mb-5 text-gray-800">
          ユーザー登録画面
        </h2>
        <SignUpForm />
      </div>
      <Link href="/login" className="mt-6 mb-10 link link-hover">
        すでにアカウントをお持ちの方はこちら
      </Link>
    </div>
  );
}

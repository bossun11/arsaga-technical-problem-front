import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex flex-col drawer-content">
      <nav className="bg-deepRed py-3 px-5 flex items-center justify-end">
        <Button className="mx-3">
          <Link href="/signup">新規登録</Link>
        </Button>
        <Button>
          <Link href="/login">ログイン</Link>
        </Button>
      </nav>
    </div>
  );
};

export default Header;

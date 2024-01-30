import React from "react";
import Button from "./Button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex flex-col drawer-content">
      <nav className="bg-deepRed py-3 px-5 flex items-center justify-end">
        <Link href="/" className="mx-3">
          <Button buttonText="新規登録" />
        </Link>
        <Link href="/login">
          <Button buttonText="ログイン" />
        </Link>
      </nav>
    </div>
  );
};

export default Header;

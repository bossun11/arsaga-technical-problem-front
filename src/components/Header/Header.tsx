"use client";

import React from "react";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import BeforeLoginMenu from "./BeforeLoginMenu";
import { useAuthContext } from "@/app/context/AuthContext";
import AfterLoginMenu from "./AfterLoginMenu";

const Header = () => {
  const { isSignedIn } = useAuthContext();
  return (
    <div className="flex flex-col drawer-content">
      <div className="bg-deepRed py-3 px-5 flex items-center justify-end">
        <NavigationMenu>
          {isSignedIn ? <AfterLoginMenu /> : <BeforeLoginMenu />}
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Header;

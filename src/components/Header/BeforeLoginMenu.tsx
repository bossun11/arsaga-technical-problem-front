import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";

const BeforeLoginMenu = () => {
  return (
    <NavigationMenuList className="gap-3 mr-3">
      <NavigationMenuItem>
        <Link href="/signup" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            新規登録
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/login" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            ログイン
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};

export default BeforeLoginMenu;

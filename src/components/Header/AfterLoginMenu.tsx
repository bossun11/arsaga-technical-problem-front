import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";

const AfterLoginMenu = () => {
  return (
    <NavigationMenuList className="gap-3 mr-3">
      <NavigationMenuItem>
        <Link href="" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            投稿一覧
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            投稿する
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/signup" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            ログアウト
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};

export default AfterLoginMenu;

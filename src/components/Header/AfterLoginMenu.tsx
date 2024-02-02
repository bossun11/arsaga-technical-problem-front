import { logout } from "@/app/api/auth";
import { useAuthContext } from "@/app/context/AuthContext";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";

const AfterLoginMenu = () => {
  const { setIsSignedIn, setCurrentUser } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
      setIsSignedIn(false);
      setCurrentUser(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <NavigationMenuList className="gap-3 mr-3">
      <NavigationMenuItem>
        <Link href="/posts" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            投稿一覧
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/posts/new" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            投稿する
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/signup" legacyBehavior passHref>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            onClick={handleLogout}
          >
            ログアウト
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};

export default AfterLoginMenu;

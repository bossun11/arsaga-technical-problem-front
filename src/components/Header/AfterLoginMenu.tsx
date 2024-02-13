import { logout } from "@/app/api/auth";
import { useAuthContext } from "@/app/context/AuthContext";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { toast } from "react-toastify";

const AfterLoginMenu = () => {
  const { setIsSignedIn, setCurrentUser } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
      setIsSignedIn(false);
      setCurrentUser(null);
      toast.success("ログアウトしました");
    } catch (e) {
      toast.error("ログアウトに失敗しました");
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
        <Link href="/login" legacyBehavior passHref>
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

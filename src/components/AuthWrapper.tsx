"use client";

import { getCurrentUser } from "@/app/api/auth";
import { useAuthContext } from "@/app/context/AuthContext";
import { ReactNode, useEffect } from "react";

type AuthWrapperProps = {
  children: ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { setCurrentUser, setLoading, setIsSignedIn } = useAuthContext();

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const user = await getCurrentUser();
        if (user) {
          setCurrentUser(user);
          setIsSignedIn(true);
        } else if (user === null) {
          setCurrentUser(null);
          setIsSignedIn(false);
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }

    fetchUser();
  }, []);

  return <>{children}</>;
};

export default AuthWrapper;

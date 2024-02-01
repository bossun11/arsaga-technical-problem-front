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
        const response = await getCurrentUser();
        if (response?.ok) {
          const user = await response.json();
          setCurrentUser(user);
          setIsSignedIn(true);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setCurrentUser(null);
      }
      setLoading(false);
    }

    fetchUser();
  }, [setCurrentUser, setLoading, setIsSignedIn]);

  return <>{children}</>;
};

export default AuthWrapper;

import { LoginParams } from "../types";
import { setCookie, hasCookie, getCookie } from "cookies-next";

export const login = async (params: LoginParams) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/login`,
    {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  setCookie("token", data.token);
  return data;
};

export const getCurrentUser = async () => {
  if (hasCookie("nothing")) return;

  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
};

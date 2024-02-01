import { LoginParams } from "../types";

// CSRFトークンを取得する関数を追加
export const getCsrfCookie = async () => {
  await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/sanctum/csrf-cookie`,
    {
      method: "GET",
      credentials: "include",
    }
  );
};

export const login = async (params: LoginParams) => {
  await getCsrfCookie();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/login`,
    {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("ログインに失敗しました");
  }
  const data = await res.json();
  return data;
};

export const getCurrentUser = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user`,
    {
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    }
  );

  if (!res) {
    throw new Error("ユーザー情報の取得に失敗しました");
  }

  return await res.json();
};

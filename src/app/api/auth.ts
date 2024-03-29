import { LoginParams, SignUpParams } from "../types";

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

export const signUp = async (params: SignUpParams) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/register`,
    {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await res.json();
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
  return await res.json();
};

export const logout = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("ログアウトに失敗しました");
  }
  return await res.json();
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

  if (res.status === 401) {
    return null;
  }

  if (!res) {
    throw new Error("ユーザー情報の取得に失敗しました");
  }

  return await res.json();
};

import { PostApiParams, SearchPostParams } from "../types";

export const getAllPosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/posts`
  );
  return await res.json();
};

export const getPostById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/posts/${id}`
  );
  return await res.json();
};

export const createPost = async (params: PostApiParams) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/posts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
      credentials: "include",
    }
  );
  return await res.json();
};

export const updatePostById = async (id: string, params: PostApiParams) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/posts/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
      credentials: "include",
    }
  );
  return await res.json();
};

export const deletePostById = async (id: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/posts/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return;
};

export const searchPostsByTag = async (params: SearchPostParams) => {
  const query = new URLSearchParams(params);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/posts/tags?${query}`
  );
  return await res.json();
};

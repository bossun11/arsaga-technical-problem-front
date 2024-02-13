"use client";

import "react-toastify/dist/ReactToastify.css";
import "../app/globals.css";
import { ToastContainer } from "react-toastify";

type ToastProviderProps = {
  children: React.ReactNode;
};

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        pauseOnHover={false}
        theme="colored"
      />
    </>
  );
}

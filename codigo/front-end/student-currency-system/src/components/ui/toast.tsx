import React from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
}

export const Toast = ({ message, type = "info" }: ToastProps) => {
  const colors = {
    success: "bg-emerald-100 text-emerald-800",
    error: "bg-rose-100 text-rose-800",
    info: "bg-gray-100 text-gray-800",
  };

  return (
    <div className={cn("px-4 py-2 rounded-lg shadow-md fixed bottom-4 right-4", colors[type])}>
      {message}
    </div>
  );
};

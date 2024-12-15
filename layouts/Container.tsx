import { cn } from "@/lib/utils";
import React from "react";

export function Container({ children, className, ...props }: { children: React.ReactNode, className?: string }) {
  return (
    <div
      className={cn("w-[90%] m-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}

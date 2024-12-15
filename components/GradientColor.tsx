import React from "react";
import { cn } from "@/lib/utils";

export function GradientColor({ children, className }: { children: React.ReactNode, className: string }) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-white/50 to-white/15 p-[1.6px] rounded-2xl ",
        className
      )}
    >
      {children}
    </div>
  );
}

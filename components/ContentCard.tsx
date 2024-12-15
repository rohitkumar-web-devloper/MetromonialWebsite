import { cn } from "@/lib/utils";
import React from "react";

export default function ContentCard({
  children,
  className,
  content,
  contentClass,
  ...props
}: {
  children: React.ReactNode, className?: string, content?: string, contentClass?: string
}) {
  return (
    <div
      className={cn(
        "bg-white bg-opacity-10  p-4 rounded-xl border-2 border-white border-opacity-10",
        className
      )}
      {...props}
    >
      {content && <h2 className={cn("pb-2 max-sm:text-[20px] text-[20px]", contentClass)}>{content}</h2>}
      {children}
    </div>
  );
}

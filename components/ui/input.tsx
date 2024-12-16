import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-[2rem] md:h-[2.5rem]  w-full rounded-lg border-[1px] border-white border-opacity-10 text-white bg-[#d4d4d41a] text-[14px] md:text-md pl-2  max-sm:placeholder:text-[12px] placeholder:text-[#A09BA5]   disabled:cursor-not-allowed disabled:opacity-50  focus:border-white focus:border-opacity-10 focus:outline-none focus:ring-0`,
          error ? "text-red-500" : "",
          className
        )}

        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

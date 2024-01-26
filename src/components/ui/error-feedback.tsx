import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ErrorFeedbackProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
}

export function ErrorFeedback({ message, className }: ErrorFeedbackProps) {
  return (
    <div
      className={cn(
        "w-full h-60 p-2 rounded-md grid place-items-center",
        className,
      )}
    >
      <p className="text-center text-sm text-muted-foreground font-normal">
        {message}
      </p>
    </div>
  );
}

"use client";

import { useTransition } from "react";

type AuthButtonProps = {
  label: string;
  action: () => Promise<void>;
  variant?: "primary" | "secondary";
};

export function AuthButton({
  label,
  action,
  variant = "primary"
}: AuthButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => action())}
      disabled={isPending}
      className={[
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary"
          ? "bg-sand text-ink hover:bg-white"
          : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
      ].join(" ")}
    >
      {isPending ? "Please wait..." : label}
    </button>
  );
}

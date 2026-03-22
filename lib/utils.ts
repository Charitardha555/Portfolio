import { clsx } from "clsx";

export function cn(...classes: Array<string | false | null | undefined>) {
  return clsx(classes);
}

export function formatDate(date?: Date | null) {
  if (!date) return "Draft";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function splitCommaSeparated(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

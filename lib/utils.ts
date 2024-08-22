import { type ClassValue, clsx } from "clsx";
import { format, subDays } from "date-fns";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDate = (sub: number = 0) => {
  const dateXDaysAgo = subDays(new Date(), sub);

  return format(dateXDaysAgo, "dd/MM/yyyy");
};

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

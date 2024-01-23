import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertRuntimeMovieToTime(runtime: number): string {
  const hours = Math.floor(runtime / 60);
  const remainingMinutes = runtime % 60;

  const hoursText = hours > 0 ? `${hours}h` : "";
  const minutesText = remainingMinutes > 0 ? ` ${remainingMinutes}m` : "";

  return `${hoursText}${
    hours > 0 && remainingMinutes > 0 ? " " : ""
  }${minutesText}`;
}

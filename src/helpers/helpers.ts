import { format } from "date-fns";
export const formattedDate = (date: Date | string): string => {
  if (!date) return "";
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  return format(parsedDate, "MMMM d, yyyy");
};

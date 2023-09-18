import { format } from "date-fns";
import { ArticleProps } from "../constants/types";

export const formattedDate = (date: Date | string): string => {
  if (!date) return "";
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  return format(parsedDate, "MMMM d, yyyy");
};

export const parseDatesInArticles = (articles: ArticleProps[]): ArticleProps[] => {
  return articles.map(({ createdAt, ...rest }) => ({
    createdAt: formattedDate(createdAt),
    ...rest,
  }));
};

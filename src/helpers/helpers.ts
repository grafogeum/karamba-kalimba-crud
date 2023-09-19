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

export function sortBy<T>(arr: T[], key: string): T[] {
  return arr.sort((a, b) => ((a as never)[key] > (b as never)[key] ? 1 : -1));
}

export function binarySearch(sortedArray: ArticleProps[], targetAuthor: string) {
  let left = 0;
  let right = sortedArray.length - 1;
  const result = [];

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const currentAuthor = sortedArray[mid].author.username;
    currentAuthor === targetAuthor && result.push(sortedArray[mid]);
    currentAuthor >= targetAuthor ? (right = mid - 1) : (left = mid + 1);
  }

  return result;
}

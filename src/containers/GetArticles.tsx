import { useState, useEffect, ReactNode, FC } from "react";
import { ArticleProps } from "../constants/types";
import { API_URL } from "../constants/constants";
import { formattedDate } from "../helpers/helpers";

interface ArticleContainerProps {
  render: (data: { data: ArticleProps[]; loading: boolean; error: Error }) => ReactNode;
}

export const parseDatesInArticles = (articles: ArticleProps[]): ArticleProps[] => {
  return articles.map(({ createdAt, ...rest }) => ({
    createdAt: formattedDate(createdAt),
    ...rest,
  }));
};

export const ArticlesList: FC<ArticleContainerProps> = ({ render }) => {
  const [articles, setArticles] = useState<{
    data: ArticleProps[];
    loading: boolean;
    error: any;
  }>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetch(API_URL);
        const { articles } = await response.json();

        setArticles({
          data: parseDatesInArticles(articles),
          loading: false,
          error: null,
        });
      } catch (error) {
        setArticles({
          data: [],
          loading: false,
          error: error,
        });
      }
    };

    getArticles();
  }, []);

  return <>{render(articles)}</>;
};

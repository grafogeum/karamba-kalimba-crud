import React, { createContext, useContext } from "react";
import { ArticlePostProps, ArticleProps } from "../../constants/types";
import { useAPIActions } from "../hooks/useAPIActions";

export const ArticleContext = createContext<
  | {
      articlesList: ArticleProps[];
      setArticle?: React.Dispatch<React.SetStateAction<ArticlePostProps[]>>;
      handleAddToFavorite: (slug: string) => Promise<void>;
      favoriteArticleRemove: (slug: string) => Promise<void>;
      // authorProfile: (username: string) => Promise<void>;
      followProfile: (username: string) => Promise<void>;
      unFollowProfile: (username: string) => Promise<void>;
    }
  | undefined
>(undefined);

export const ArticleProvider: React.FC = ({ children }) => {
  const {
    articlesList = [],
    handleAddToFavorite,
    favoriteArticleRemove,
    // authorProfile,
    followProfile,
    unFollowProfile,
  } = useAPIActions();
  return (
    <ArticleContext.Provider
      value={{
        articlesList,
        handleAddToFavorite,
        favoriteArticleRemove,
        // authorProfile,
        followProfile,
        unFollowProfile,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticleContext = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticleContext must be used within an ArticleProvider");
  }
  return context;
};

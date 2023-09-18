import { useState, useEffect, useCallback } from "react";
import { parseDatesInArticles } from "../helpers/helpers";
import {
  fetchDataArticles,
  handleFetchError,
  handleAddToFavoriteAPI,
  favoriteArticleRemoveAPI,
  fetchDataProfileAPI,
  followProfileAPI,
  unFollowProfileAPI,
} from "../api/apiActions";
import { ArticleProps } from "../constants/types";

export function useArticleList() {
  const [articlesList, setArticlesList] = useState<ArticleProps[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const articles = await fetchDataArticles();
      setArticlesList(parseDatesInArticles(articles));
    } catch (error) {
      handleFetchError(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddToFavorite = useCallback(
    async slug => {
      try {
        await handleAddToFavoriteAPI(slug);
        fetchData();
      } catch (error) {
        handleFetchError(error);
      }
    },
    [fetchData]
  );

  const favoriteArticleRemove = useCallback(
    async slug => {
      try {
        await favoriteArticleRemoveAPI(slug);
        fetchData();
      } catch (error) {
        handleFetchError(error);
      }
    },
    [fetchData]
  );

  const fetchUserProfile = useCallback(async username => {
    try {
      const profileData = await fetchDataProfileAPI(username);
      console.log(profileData);
      // setProfile(profileData);
    } catch (error) {
      handleFetchError(error);
    }
  }, []);

  const followProfile = useCallback(async username => {
    try {
      await followProfileAPI(username);
    } catch (error) {
      handleFetchError(error);
    }
  }, []);

  const unFollowProfile = useCallback(async username => {
    try {
      await unFollowProfileAPI(username);
    } catch (error) {
      handleFetchError(error);
    }
  }, []);

  return {
    articlesList,
    fetchData,
    handleAddToFavorite,
    favoriteArticleRemove,
    fetchUserProfile,
    followProfile,
    unFollowProfile,
  };
}

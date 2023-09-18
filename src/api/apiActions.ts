import { API_URL, API_URL_PROFILES } from "../constants/constants";
import { ArticleProps } from "../constants/types";

export const fetchDataArticles = async (): Promise<ArticleProps[]> =>
  (await fetch(API_URL)).json().then(({ articles }) => articles);

export const handleFetchError = (error: unknown): void => {
  console.error(error instanceof Error ? `Error occurred: ${error.message}` : `An unknown error occurred`);
};

export const notLoggedError = (): void => {
  alert("You must be logged in to do that");
};

export const favoriteArticleRemoveAPI = async (slug: string): Promise<void> => {
  try {
    const token = await localStorage.getItem("jwtToken");

    if (!token) {
      notLoggedError();
    }

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`http://localhost:3000/api/articles/${slug}/favorite`, requestOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      fetchDataArticles();
    }
  } catch (error) {
    handleFetchError(error);
  }
};

export const handleAddToFavoriteAPI = async (slug: string): Promise<void> => {
  try {
    const token = await localStorage.getItem("jwtToken");
    if (!token) {
      notLoggedError();
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`http://localhost:3000/api/articles/${slug}/favorite`, requestOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      fetchDataArticles();
    }
  } catch (error) {
    handleFetchError(error);
  }
};

// PROFILE ACTIONS

export const fetchDataProfileAPI = async (username: string): Promise<void> => {
  const url = `${API_URL_PROFILES}/${username}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.profile;
  } catch (error: unknown) {
    handleFetchError(error);
  }
};
export const followProfileAPI = async (username: string): Promise<void> => {
  const url = `${API_URL_PROFILES}/${username}/follow`;
  try {
    const token = await localStorage.getItem("jwtToken");
    if (!token) {
      notLoggedError();
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      fetchDataArticles();
    }
  } catch (error) {
    handleFetchError(error);
  }
};

export const unFollowProfileAPI = async (username: string): Promise<void> => {
  const url = `${API_URL_PROFILES}/${username}/follow`;
  try {
    const token = await localStorage.getItem("jwtToken");
    if (!token) {
      notLoggedError();
    }

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      fetchDataArticles();
    }
  } catch (error) {
    handleFetchError(error);
  }
};

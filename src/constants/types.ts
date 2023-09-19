export interface ArticleProps {
  author: Author;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export type Author = {
  bio: string;
  following: boolean;
  image: string;
  username: string;
};

export type ArticlePostProps = Pick<
  ArticleProps,
  "title" | "description" | "author" | "createdAt" | "favorited" | "favoritesCount" | "slug"
>;

export type FormDataProps = {
  isLogin: boolean;
  email: string;
  username: string;
  password: string;
};

export type AuthorProfile = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

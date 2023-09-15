import { FC, useState } from "react";
import { Button, Avatar, Container, ContainerStretched, Label } from "./ui";
import { ArticlePostProps } from "../constants/types";
import styled from "@emotion/styled";

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #333;
`;

export const Article: FC<Partial<ArticlePostProps>> = ({
  title,
  description,
  author,
  createdAt,
  favorited,
  favoritesCount,
  slug = "",
}) => {
  const [isFavorite, setIsFavorite] = useState(!!favorited);

  const favoriteArticleAdd = async (slug: string) => {
    try {
      const token = await localStorage.getItem("jwtToken");

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
        console.log("🖤 Favorites");
      }
    } catch (error) {
      console.error("Connection Error:", error);
    }
  };

  const favoriteArticleRemove = async (slug: string) => {
    try {
      const token = await localStorage.getItem("jwtToken");

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
        console.log("🖤 Removed from Favorites");
      }
    } catch (error) {
      console.error("Connection Error:", error);
    }
  };

  if (!author) {
    return null;
    // TODO - change return null on default values
  }
  const { username } = author;

  const toggleFavorite = (slug: string) => {
    console.log("isFavorite", isFavorite);
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
    isFavorite ? favoriteArticleAdd(slug) : favoriteArticleRemove(slug);
  };

  return (
    <>
      <Card>
        <ContainerStretched>
          <Container>
            <Avatar />
            <Label>
              <div>{username}</div>
              <span>{createdAt}</span>
            </Label>
          </Container>
          <Button onClick={() => toggleFavorite(slug)}>{favoritesCount}</Button>
        </ContainerStretched>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Card>
    </>
  );
};

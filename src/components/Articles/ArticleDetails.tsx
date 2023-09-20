import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, ContainerStretched, Label } from "../ui";
import { useAPIActions } from "../hooks/useAPIActions";
import styled from "@emotion/styled";
import { useArticleContext } from "./ArticlesContext";

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

export const ArticleDetails = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const { articlesList, handleAddToFavorite, favoriteArticleRemove } = useArticleContext();

  const selectedArticle = articlesList?.find(article => article.slug === slug);
  const { title, description, author, createdAt, favorited, favoritesCount } = selectedArticle || {};
  const { username } = author || {};
  const [isFavorite, setIsFavorite] = useState(!!favorited);

  const toggleFavorite = (favorited: boolean, slug: string) => {
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
    favorited ? favoriteArticleRemove(slug) : handleAddToFavorite(slug);
  };

  return (
    <Card>
      <ContainerStretched>
        <Container>
          <Label>
            <div>{username}</div>
            <span>{createdAt}</span>
          </Label>
        </Container>
        <Button onClick={() => toggleFavorite(isFavorite, slug)}>
          {isFavorite ? <>🖤 👍🏼Likes: {favoritesCount}</> : <> 🤍👍🏼Likes: {favoritesCount}</>}
        </Button>
      </ContainerStretched>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};

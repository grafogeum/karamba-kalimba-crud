import { FC, useState, MouseEvent } from "react";
import { Button, Avatar, Container, ContainerStretched, Label } from "../ui";
import { ArticlePostProps } from "../../constants/types";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

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

export const Article: FC<
  Partial<ArticlePostProps> & {
    onAddToFavorite: (slug: string) => Promise<void>;
    onRemoveFromFavorite: (slug: string) => Promise<void>;
  }
> = ({
  title,
  description,
  author,
  createdAt,
  favorited,
  favoritesCount,
  slug = "",
  onAddToFavorite,
  onRemoveFromFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(!!favorited);

  if (!author) {
    return null;
    // TODO - change return null on default values
  }
  const { username } = author;
  const toggleFavorite = (e: MouseEvent, slug: string) => {
    e.preventDefault();
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
    isFavorite ? onRemoveFromFavorite(slug) : onAddToFavorite(slug);
  };
  return (
    <>
      <Link to={`/${slug}`}>
        <Card>
          <ContainerStretched>
            <Link to={`/profile/${username}`}>
              <Container>
                <Avatar />
                <Label>
                  <div>{username}</div>
                  <span>{createdAt}</span>
                </Label>
              </Container>
            </Link>
            <Button onClick={e => toggleFavorite(e, slug)}>
              {isFavorite ? <>🖤 👍🏼Likes: {favoritesCount}</> : <> 🤍👍🏼Likes: {favoritesCount}</>}
            </Button>
          </ContainerStretched>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Card>
      </Link>
    </>
  );
};

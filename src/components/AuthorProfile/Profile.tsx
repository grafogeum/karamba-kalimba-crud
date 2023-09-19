import { Link, useParams } from "react-router-dom";
import { Avatar, Container, Label, Button } from "../ui";
import { useEffect, useState } from "react";
import { ArticleProps, Author } from "../../constants/types";
import styled from "@emotion/styled";
import { useArticleContext } from "../Articles/ArticlesContext";
import { sortBy, binarySearch } from "../../helpers/helpers";

const ProfileStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export function Profile(): JSX.Element {
  const { username } = useParams<{ username: string }>();

  const { articlesList, followProfile, unFollowProfile } = useArticleContext();

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const toggleFollow = () => {
    isFollowing ? unFollowProfile(username) : followProfile(username);
    setIsFollowing(!isFollowing);
  };

  if (articlesList.length < 1) {
    return <p>Loading...</p>;
  }
  const findArticle = articlesList.find(({ author }: { author: Author }) => author.username === username);

  const author = findArticle?.author;

  if (!author) {
    return <p>Loading...</p>;
  }
  const { bio, image } = author;

  const sortByAuthor = (articles: ArticleProps[]) => sortBy(articles, "author.username");

  const sortedArticles = sortByAuthor(articlesList);
  const articlesByAuthor = binarySearch(sortedArticles, username);

  return (
    <ProfileStyled>
      <Avatar imageUrl={image} />
      <Label>{username}</Label>
      <Label>{bio}</Label>
      <h2>Articles by {username}</h2>
      <ul>
        {articlesByAuthor.map(article => (
          <Container key={article.slug}>
            <li>
              <Link to={`/${article.slug}`}>{article.title}</Link>
            </li>
          </Container>
        ))}
      </ul>

      <Button onClick={toggleFollow}>{isFollowing ? "Unfollow" : "Follow"}</Button>
    </ProfileStyled>
  );
}

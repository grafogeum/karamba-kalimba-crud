import styled from "@emotion/styled";

interface AvatarProps {
  imageUrl?: string;
  defaultImage?: string;
}

const AvatarWrapper = styled.div<AvatarProps>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
  background-image: url(${({ imageUrl }) => imageUrl || ""});
  background-size: cover;
  background-position: center;
`;

export const Avatar: React.FC<AvatarProps> = ({ imageUrl = "https://picsum.photos/50/50" }) => {
  return <AvatarWrapper imageUrl={imageUrl}></AvatarWrapper>;
};

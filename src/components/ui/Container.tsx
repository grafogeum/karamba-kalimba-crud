import { FC } from "react";
import styled from "@emotion/styled";

const ContainerStyled = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Container: FC = ({ children }) => {
  return <ContainerStyled>{children}</ContainerStyled>;
};

const ContainerStretchedStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 1rem;
`;

export const ContainerStretched: FC = ({ children }) => {
  return <ContainerStretchedStyled>{children}</ContainerStretchedStyled>;
};

const LabelStyled = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: stretch;
  flex-wrap: wrap;
  padding: 5px;
`;

export const Label: FC = ({ children }) => {
  return <LabelStyled>{children}</LabelStyled>;
};

import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

export const WordDetailsStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(0, 0, 0);
  width: 550px;
  max-height: 320px;
  padding: 20px;
  margin: 5px;
  border-radius: 15px;
  filter: drop-shadow(5px 5px 5px rgba(180, 180, 180, 0.4));
`;

export const Title = styled.h2`
  color: white;
`;

export const Definition = styled.p`
  color: white;
`;

export const Heading = styled.p`
  width: 20%;
  font-weight: bold;
  align-content: start;
  color: grey;
`;

export const Block = styled.div<{ direction?: string }>`
  width: 70%;
  display: flex;

  ${({ direction }) => {
    switch (direction) {
      case "row":
        return css`
          flex-direction: row;
        `;
      case "column":
        return css`
          flex-direction: column;
        `;
    }
    return css`
      flex-direction: row;
    `;
  }}
`;

export const Example = styled.p`
  font-style: italic;
  color: white;
`;

export const SynonymLink = styled(Link)`
  padding-right: 20px;
  text-decoration: none;
  color: blue;
`;

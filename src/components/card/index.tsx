import "./index.css";
import React from "react";
import {
  Link,
  CardStyled,
  CardImage,
  CardText,
  CardTitle,
  CardDescription,
} from "./index.style";

const Card = ({ title, description, imgUrl, link }): React.ReactElement => {
  return (
    <CardStyled width="120px">
      <Link to={link}>
        <CardImage src={imgUrl} />
        <CardText>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardText>
      </Link>
    </CardStyled>
  );
};

export default Card;

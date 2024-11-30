import styled from "@emotion/styled";
import { Link as LinkBase } from "react-router-dom";

export const CardStyled = styled.div`
  display: inline-block;
  float: left;
  width: 220px;
  height: 350px;
  background-color: rgb(255, 255, 255);
  margin-right: 25px;
  margin-bottom: 30px;
  margin-top: 20px;
  border-radius: 15px;
  filter: drop-shadow(5px 5px 5px rgba(180, 180, 180, 0.4));
`;

export const Link = styled(LinkBase)`
  text-decoration: none;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 220px;
  border-radius: 15px 15px 0 0;
`;

export const CardText = styled.div`
  margin-left: 20px;
`;

export const CardTitle = styled.h3`
  margin-top: 10px;
  margin-bottom: 10px;
  color: black;
`;

export const CardDescription = styled.p`
  color: grey;
`;

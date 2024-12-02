import "./index.css";
import React from "react";
import Card from "../../components/card";
import { getNavigationsValue } from "@brojs/cli";

const dictionaries = [
  {
    id: 1,
    description: "1000 часто используемых",
    imageFilename: "kart1.jpg",
    link: "eng-it-lean.vocabulary",
  },
  {
    id: 2,
    description: "10 слов в Data Science",
    imageFilename: "kart1.jpg",
    link: "eng-it-lean.vocabulary",
  },
  {
    id: 3,
    description: "10 слов в Data Science",
    imageFilename: "kart1.jpg",
    link: "eng-it-lean.vocabulary",
  },
  {
    id: 4,
    description: "10 слов в Data Science",
    imageFilename: "kart1.jpg",
    link: "eng-it-lean.vocabulary",
  },
  {
    id: 5,
    description: "10 слов в Data Science",
    imageFilename: "kart1.jpg",
    link: "eng-it-lean.vocabulary",
  },
  {
    id: 6,
    description: "10 слов в Data Science",
    imageFilename: "kart1.jpg",
    link: "eng-it-lean.vocabulary",
  },
];

const HomePage = (): React.ReactElement => {
  const dictionary_cards = dictionaries
    .map((dictionary) => (
      <Card
        key={dictionary.id}
        title="Словари"
        description={dictionary.description}
        imgUrl={require("./images/" + dictionary.imageFilename)}
        link={getNavigationsValue(dictionary.link)}
      />
    ))
    .slice(0, 5);

  return (
    <div>
      <div className="main-banner">
        <img
          src={require("./images/osn_banner2.jpg")}
          alt=""
          className="img_main_banner"
        />
      </div>
      <div className="main">
        <div className="card_center_blocks">{dictionary_cards}</div>
      </div>
    </div>
  );
};

export default HomePage;

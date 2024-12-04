import "./index.css";
import React from "react";
import Card from "../../components/card";
import { getNavigationsValue } from "@brojs/cli";
import dictionaries from "./dictionaries";

const HomePage = (): React.ReactElement => {
  const dictionary_cards = dictionaries
    .map((dictionary) => (
      <Card
        key={dictionary.id}
        title="Словари"
        description={dictionary.description}
        imgUrl={require("./images/" + dictionary.imageFilename)}
        link={getNavigationsValue("eng-it-lean.dictionary")}
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

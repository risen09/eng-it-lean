import "./index.css";
import React, { useState } from "react";
import Card from "./components/card";
import { DictionaryItem } from "./types";
import { getNavigationsValue } from "@brojs/cli";

const HomePage = (): React.ReactElement => {
  const [error, setError] = useState<string>(null);
  const [dictionaries, setDictionaries] = useState<DictionaryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    fetch("/api/dictionaries")
      .then((res) => res.json())
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      })
      .then((json) => {
        setDictionaries(json);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const dictionaryCards = dictionaries
    .map((dictionary) => (
      <Card
        key={dictionary.id}
        title="Словари"
        description={dictionary.description}
        imgUrl={require("./images/" + dictionary.imageFilename)}
				link={getNavigationsValue("eng-it-lean.dictionary").replace(":id", dictionary.id.toString())}
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
        <div className="card_center_blocks">{dictionaryCards}</div>
      </div>
    </div>
  );
};

export default HomePage;

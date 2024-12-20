import "./index.css";
import React, { useState } from "react";
import Card from '../../components/card';
import { DictionaryItem } from "./types";
import { getNavigationsValue } from "@brojs/cli";
import { getConfigValue } from '@brojs/cli';

import mainBanner from "./images/osn_banner2.jpg";

const HomePage = (): React.ReactElement => {
  const [error, setError] = useState<string>(null);
  const [dictionaries, setDictionaries] = useState<DictionaryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    fetch(`${getConfigValue('eng-it-lean.api')}/dictionaries`)
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
          src={mainBanner}
          alt=""
          className="img_main_banner"
        />
      </div>
      <div className="main">
				{
					isLoading ? <div>Loading...</div> : (
						<div className="card_center_blocks">{dictionaryCards}</div>
					)
				}
      </div>
    </div>
  );
};

export default HomePage;

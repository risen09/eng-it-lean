import "./index.css";
import React, { useState, useEffect } from "react";
import { Word } from "./types";
import WordCard from "./components/word-card";
import WordDetails from "./components/word-details";
import { useParams } from "react-router-dom";

const DictionaryPage = (): React.ReactElement => {
	const { id } = useParams();
	
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [dictionary, setDictionary] = React.useState<Array<Word>>([]);
  const [wordId, setWordId] = React.useState(-1);

  useEffect(() => {
    fetch("/api/dictionaries/" + id)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setDictionary(result["words"]);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        },
      );
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const wordCards = dictionary.map((word) => (
    <WordCard
      onClick={() => setWordId(word.id)}
      key={word.id}
      word={word.word}
      definition={word.definition}
    />
  ));

  return (
    <div className="main">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "20px",
        }}
      >
        <div
          style={{
            flexDirection: "column",
          }}
        >
          {wordCards}
        </div>
        {wordId > -1 ? <WordDetails word={dictionary[wordId]} /> : <></>}
      </div>
    </div>
  );
};

export default DictionaryPage;

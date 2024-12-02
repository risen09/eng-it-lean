import "./index.css";
import React from "react";
import { Word } from "./types";
import WordCard from "./components/word-card";
import WordDetails from "./components/word-details";
import { vocabulary } from "./vocabulary";

const VocabularyPage = (): React.ReactElement => {
  const [wordId, setWordId] = React.useState(-1);

  const handleWordClick = (newWordId: number) => {
    console.log(newWordId);
    setWordId(newWordId);
    console.log(wordId);
  };

  const wordCards = vocabulary.map((word) => (
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
        {wordId > 0 ? <WordDetails wordId={wordId} /> : <></>}
      </div>
    </div>
  );
};

export default VocabularyPage;

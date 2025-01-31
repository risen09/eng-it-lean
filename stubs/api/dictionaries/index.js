const fs = require('fs');
const path = require('path');
const router = require('express').Router();

module.exports = router;

const dictionaries = require('./dictionaries.json');
const words = require('../words/words.json');

router.get('/', (req, res) => {
  res.send(dictionaries);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
    return res.status(400).send('Invalid ID'); // Bad request
  }

  if (!dictionaries) {
    return res.status(500).send('No data to update'); // Internal server error
  }

  const dictionary = dictionaries.find((dictionary) => dictionary.id === id);

  if (!dictionary) {
    return res.status(404).send('Not found');
  }
  const dictionaryWords = dictionary.words.map((wordId) => {
    const word = words.find((word) => word.id === wordId);
    return { ...word, ...word };
  });
  res.send({ ...dictionary, words: dictionaryWords });
});

router.post('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
    return res.status(400).send('Invalid ID'); // Bad request
  }

  if (!dictionaries) {
    return res.status(500).send('No data to update'); // Internal server error
  }

  const dictionary = dictionaries.find((dictionary) => dictionary.id === id);

  if (!dictionary) {
    return res.status(404).send('Not found');
  }

  const newWord = req.body;
  if (!newWord) {
    return res.status(400).send('No data to add'); // Bad request
  }
  console.log(newWord);
  if (isNaN(newWord.id)) {
    return res.status(400).send('Invalid word ID'); // Bad request
  }
  dictionary.words.push(newWord.id);

  fs.writeFile(path.join(__dirname, 'dictionaries.json'), JSON.stringify(dictionaries), (err) => {
    if (err) {
      console.error(err); // Log the error
      return res.status(500).send('Error saving data');
    }
    res.status(200).json(dictionary); // Send back the updated data
  });
});

// Put new dictionary to the array of dictionaries
router.put('/', (req, res) => {
  if (!dictionaries || !Array.isArray(dictionaries)) {
    return res.status(400).send('No array of dictionaries found`');
  }

  const newData = req.body;

  if (!newData) {
    return res.status(400).send('No data to add'); // Bad request
  }

  if (!dictionaries) {
    return res.status(500).send('No data to update'); // Internal server error
  }

  const indexedUpdatedData = { ...newData, id: dictionaries.length + 1 }; // Add the new dictionary to the array

  dictionaries.push(indexedUpdatedData); // Add the new dictionary to the array

  fs.writeFile(path.join(__dirname, 'dictionaries.json'), JSON.stringify(dictionaries), (err) => {
    if (err) {
      console.error(err); // Log the error
      return res.status(500).send('Error saving data');
    }
    res.status(200).json(dictionaries); // Send back the updated data
  });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id); // Get the dictionary id from the URL

  if (!id || isNaN(id)) {
    return res.status(400).send('Invalid ID'); // Bad request
  }

  const index = dictionaries.findIndex((dictionary) => dictionary.id === id);

  if (index < 0) {
    return res.status(404).send('Not found'); // Not found
  }

  dictionaries.splice(index, 1); // Remove the dictionary from the array

  fs.writeFile(path.join(__dirname, 'dictionaries.json'), JSON.stringify(dictionaries), (err) => {
    if (err) {
      console.error(err); // Log the error
      return res.status(500).send('Error saving data');
    }
    res.send({ message: `Dictionary with id ${id} deleted` });
  });
});

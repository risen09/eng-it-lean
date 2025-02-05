const fs = require('fs');
const path = require('path');
const router = require('express').Router();

module.exports = router;

const words = require('../words/words.json');

router.get('/', (req, res) => {
  res.send(words);
});

router.put('/', (req, res) => {
  const newData = req.body;
  if (!newData) {
    return res.status(400).send('No data to add'); // Bad request
  }
  if (!words) {
    return res.status(500).send('No data to update'); // Internal server error
  }
  console.log(words.length);
  const indexedUpdatedData = { ...newData, id: words.length + 1 }; // Add the new word to the array
  console.log(indexedUpdatedData);
  words.push(indexedUpdatedData); // Add the new word to the array
  fs.writeFile(path.join(__dirname, 'words.json'), JSON.stringify(words), (err) => {
    if (err) {
      console.error(err); // Log the error
      return res.status(500).send('Error saving data');
    }
    res.status(200).json(indexedUpdatedData);
  });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send('Invalid ID'); // Bad request
  }

  if (!words) {
    return res.status(500).send('No data to update'); // Internal server error
  }
  const word = words.find((word) => word.id === id);

  if (!word) {
    return res.status(404).send('Not found');
  }
  res.send(word);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
    return res.status(400).send('Invalid ID'); // Bad request
  }

  const index = words.findIndex((word) => word.id === id);
  if (index < 0) {
    return res.status(404).send('Not found');
  }

  if (!words) {
    return res.status(500).send('No data to update'); // Internal server error
  }

  words.splice(index, 1);
  fs.writeFile(path.join(__dirname, 'words.json'), JSON.stringify(words), (err) => {
    if (err) {
      console.error(err); // Log the error
      return res.status(500).send('Error saving data');
    }
    res.send({ message: `Word with id ${id} deleted` });
  });
});

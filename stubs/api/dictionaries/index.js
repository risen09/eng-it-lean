const fs = require('fs');
const path = require('path');
const router = require("express").Router();

module.exports = router;

const data = require("./data/dictionaries.json");
const wordsData = require("./data/dictionaryWords.json");

router.get("/", (req, res) => {
  res.send(data);
});

// Put new dictionary to the array of dictionaries
router.put('/new', (req, res) => {
  if (!data || !Array.isArray(data)) {
    return res.status(400).send('No array of dictionaries found`');
  }

  const updatedData = req.body;

  if (!updatedData) {
    return res.status(400).send('No data to update'); // Bad request
  }

  if (!data) {
    return res.status(500).send('No data to update'); // Internal server error
  }

  const indexedUpdatedData = { id: data.length, ...updatedData }; // Add the new dictionary to the array

  data.push(indexedUpdatedData); // Add the new dictionary to the array

  fs.writeFile(path.join(__dirname, 'data/dictionaries.json'), JSON.stringify(data), (err) => {
    if (err) {
      console.error(err); // Log the error
      return res.status(500).send('Error saving data');
    }
    res.status(200).json(data); // Send back the updated data
  });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id); // Get the dictionary id from the URL

  if (!id || isNaN(id)) {
    return res.status(400).send('Invalid ID'); // Bad request
  }

  const index = data.findIndex((dictionary) => dictionary.id === id);

  if (index < 0) {
    return res.status(404).send('Not found'); // Not found
  }

  data.splice(index, 1); // Remove the dictionary from the array

  fs.writeFile(path.join(__dirname, 'data/dictionaries.json'), JSON.stringify(data), (err) => {
    if (err) {
      console.error(err); // Log the error
      return res.status(500).send('Error saving data');
    }
    res.send({ message: `Dictionary with id ${id} deleted` });
  });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const words = wordsData.find((word) => word.id === id);

  if (!words) {
    return res.status(404).send('Not found');
  }

  res.send(words);
});

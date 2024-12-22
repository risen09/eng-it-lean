const router = require('express').Router();

module.exports = router;

const data = require('./data/dictionaries.json');
router.get('/', (req, res) => {
	res.send(data);
});


const wordsData = require("./data/dictionaryWords.json");
router.get('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	  const words = wordsData.find((word) => word.id === id);

  if (!words) {
    return res.status(404).send("Not found");
  }

  res.send(words);

});

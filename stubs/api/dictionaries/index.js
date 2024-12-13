const router = require('express').Router();

module.exports = router;

const data = require('./data/dictionaries.json');
router.get('/', (req, res) => {
	res.send(data);
});

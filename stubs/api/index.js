const router = require('express').Router();

const wordsRouter = require('./words');
const dictionariesRouter = require('./dictionaries');
const unitsRouter = require('./units');
module.exports = router;

const delay =
  (ms = 250) =>
  (req, res, next) => {
    setTimeout(next, ms);
  };

router.use(delay());
router.use('/words', wordsRouter);
router.use('/dictionaries', dictionariesRouter);
router.use('/units', unitsRouter);

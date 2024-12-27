<<<<<<< HEAD
<<<<<<< HEAD
const router = require('express').Router();

module.exports = router;
=======
const router = require('express').Router();
=======
const router = require("express").Router();
>>>>>>> dev

const dictionariesRouter = require("./dictionaries");
module.exports = router;
<<<<<<< HEAD
>>>>>>> main
=======

const delay =
  (ms = 1000) =>
  (req, res, next) => {
    setTimeout(next, ms);
  };

router.use(delay());
router.use("/dictionaries", dictionariesRouter);
>>>>>>> dev

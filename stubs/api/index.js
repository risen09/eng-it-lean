const router = require("express").Router();

const dictionariesRouter = require("./dictionaries");
module.exports = router;

const delay =
	(ms = 1000) =>
	(req, res, next) => {
		setTimeout(next, ms)
	};

router.use(delay());
router.use("/dictionaries", dictionariesRouter);

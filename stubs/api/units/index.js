const fs = require('fs');
const path = require('path');
const router = require('express').Router();

module.exports = router;

const data = require('./data/units.json');
router.get('/', (req, res) => {
  res.send(data);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const unit = data.find((unit) => unit.id === id);

  if (!unit) {
    return res.status(404).send('Not found');
  }

  const unitFilepath = path.join(__dirname, 'data', `${unit.filename}.md`);
  const unitContent = fs.readFileSync(unitFilepath, 'utf-8');

  if (!unitContent) {
    return res.status(404).send('Not found');
  }

  res.send({ ...unit, content: unitContent });
});

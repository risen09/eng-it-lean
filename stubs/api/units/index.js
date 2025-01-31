const fs = require('fs');
const path = require('path');
const router = require('express').Router();

module.exports = router;

const data = require('./data/units.json');
router.get('/', (req, res) => {
  res.send(data);
});

router.put('/', (req, res) => {
  const newUnit = req.body;

  if (!newUnit) {
    return res.status(400).send('No new unit to be added');
  }

  if (!data) {
    return res.status(500).send('No data to be updated');
  }

  data.push({ id: data.length, ...newUnit });

  fs.writeFileSync(path.join(__dirname, 'data', 'units.json'), JSON.stringify(data));
  res.status(200).send(data);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex((unit) => unit.id === id);

  if (index < 0) {
    return res.status(404).send('Not found');
  }

  data.splice(index, 1);
  fs.writeFileSync(path.join(__dirname, 'data', 'units.json'), JSON.stringify(data));
  res.send({ message: `Unit with ID ${id} deleted` });
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

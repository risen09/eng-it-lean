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

  console.log(newUnit);
  if (!newUnit) {
    return res.status(400).send('No new unit to be added');
  }

  if (!data) {
    return res.status(500).send('No data to be updated');
  }

  const newId = data.length + 1;
  const filename = newUnit.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  fs.writeFileSync(path.join(__dirname, 'data', `${filename}.md`), newUnit.content);

  data.push({ id: newId, filename: filename, name: newUnit.name });

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

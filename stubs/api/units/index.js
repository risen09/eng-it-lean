const fs = require('fs');
const path = require('path');
const router = require('express').Router();

module.exports = router;

const data = require('./units.json');
const users = require('../users/users.json');
router.get('/', (req, res) => {
  // for every data set author from users and save it to authoredData variable
  const authoredData = data.map((unit) => {
    const user = users.find((user) => user.public_id == unit.author);
    if (user) {
      unit.author = user;
    }
    return unit;
  });

  res.send(authoredData);
});

router.post('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUnit = req.body;

  if (!updatedUnit) {
    return res.status(400).send('No unit to be added');
  }

  if (!data) {
    return res.status(500).send('No data to be updated');
  }

  const index = data.findIndex((unit) => unit.id === id);

  if (index < 0) {
    return res.status(404).send('Not found');
  }

  data.splice(index, 1);

  data.push(updatedUnit);

  fs.writeFileSync(path.join(__dirname, 'units.json'), JSON.stringify(data));
  res.status(200).send(data); 
});

router.put('/', (req, res) => {
  const newUnit = req.body;

  if (!newUnit) {
    return res.status(400).send('No new unit to be added');
  }

  if (!newUnit.author) {
    return res.status(400).send('User is not logged in!');
  }

  if (!data) {
    return res.status(500).send('No data to be updated');
  }

  const newId = data.length + 1;
  // const filename = newUnit.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  // fs.writeFileSync(path.join(__dirname, 'data', `${filename}.md`), newUnit.content);

  data.push({ ...unit, id: newId });

  fs.writeFileSync(path.join(__dirname, 'units.json'), JSON.stringify(data));
  res.status(200).send(data);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex((unit) => unit.id === id);

  if (index < 0) {
    return res.status(404).send('Not found');
  }

  data.splice(index, 1);
  fs.writeFileSync(path.join(__dirname, 'units.json'), JSON.stringify(data));
  res.send({ message: `Unit with ID ${id} deleted` });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const unit = data.find((unit) => unit.id === id);

  if (!unit) {
    return res.status(404).send('Unit not found');
  }

  const user = users.find((user) => user.public_id == unit.author);
  if (!user) {
    return res.status(404).send('User not found');
  }

  res.send({...unit, author: user});
});

const router = require('express').Router();
const fs = require('fs');

module.exports = router;

let data = require('./users.json');
const path = require('path');
router.get('/', (req, res) => {
  res.send(data);
});

router.post('/', (req, res) => {
  const newUser = req.body;
  const updatedData = [...data, newUser];

  console.log(updatedData);

  fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(updatedData), (err) => {
    if (err) {
      console.error('Ошибка при записи данных в файл users.json', err);
      res.status(500).send('Ошибка при записи данных в файл users.json');
    } else {
      console.log('Данные успешно записаны в файл users.json');
      res.status(200).send('Данные успешно записаны в файл users.json');
    }
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(req.body);
  const user = data.find((user) => user.email === email && user.password === password);
  console.log(user);

  if (!user) {
    res.status(404).send('Пользователь не найден');
  }
  res.json({ public_id: user.public_id });
});

router.get('/account', (req, res) => {
  const { public_id } = req.query;
  console.log(public_id);
  const user = data.find((user) => user.public_id == public_id);

  if (!user) {
    res.status(404).send('Пользователь не найден');
  }
  console.log(user);
  res.send({...user, id: -1});
});

router.post('/account/save', (req, res) => {
  const updatedUser = req.body;
  const { public_id } = updatedUser;
  console.log(public_id);
  const index = data.findIndex((user) => user.public_id == public_id);

  if (!index) {
    res.status(404).send('Пользователь не найден');
  }
  console.log(index);
  
  data[index].email = updatedUser.email;
  data[index].password = updatedUser.password;
  data[index].nickname = updatedUser.nickname;
  data[index].age = updatedUser.age;
  data[index].about = updatedUser.about;
  
  fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(data), (err) => {
    if (err) {
      console.error('Ошибка при записи данных в файл users.json', err);
      res.status(500).send('Ошибка при записи данных в файл users.json');
    } else {
      console.log('Данные успешно записаны в файл users.json');
      res.status(200).send('Данные успешно записаны в файл users.json');
    }
  });
});
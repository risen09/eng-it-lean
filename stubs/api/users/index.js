const router = require('express').Router();
const fs = require('fs');

module.exports = router;

const data = require('./users.json');
const path = require('path');
router.get('/', (req, res) => {
	res.send(data);
});

router.post('/', (req, res) => {
    const newUser = req.body;
    const updatedData = [...data, newUser];

    console.log(updatedData);
  
    fs.writeFile(path.join(__dirname, "users.json"), JSON.stringify(updatedData), (err) => {
      if (err) {
        console.error('Ошибка при записи данных в файл users.json', err);
        res.status(500).send('Ошибка при записи данных в файл users.json');
      } else {
        console.log('Данные успешно записаны в файл users.json');
        res.status(200).send('Данные успешно записаны в файл users.json');
      }
    });
});


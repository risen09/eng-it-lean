import './personal_account.css'; 
import React, { useState, useEffect } from 'react';

const PersonalAccountPage: React.FC = () => {
  const [username, setUsername] = useState('Имя пользователя'); 
  const [password, setPassword] = useState(''); 
  const [newUsername, setNewUsername] = useState(''); 
  const [newPassword, setNewPassword] = useState(''); 

  const handleChangeUsername = () => {
    if (newUsername) {
      setUsername(newUsername);
      setNewUsername('');
    }
  };

  const handleChangePassword = () => {
    if (newPassword) {
      setPassword(newPassword);
      setNewPassword('');
    }
  };

  return (
    <div lang="ru">
      <header>
        <div className="header">
          <h1>
            <img src="photo.jpg" alt="Фото" className="photo" />
          </h1>
          <h2>{username}</h2>
          <input
            type="text"
            placeholder="Введите новое имя пользователя"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
          <button id="changenamebtn" type="button" className="changenamebtn" onClick={handleChangeUsername}>
            Сменить
          </button>

          <h3>Пароль</h3>
          <input
            type="password"
            placeholder="Введите новый пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button id="changepswbtn" type="button" className="changepswbtn" onClick={handleChangePassword}>
            Сменить
          </button>
        </div>
      </header>

      <div className="achievments">
        <h1>
          <img src="achievments.jpg" className="achievments-image" alt="Достижения" />
          Достижения
        </h1>
      </div>

      <div className="progress">
        <h1>
          <img src="progress.png" className="progress-image" alt="Прогресс" />
          Прогресс
        </h1>
      </div>

      <div className="delete_account">
        <button id="deletebtn" type="button" className="deletebtn">Удалить аккаунт</button>
      </div>
    </div>
  );
};

export default PersonalAccountPage;
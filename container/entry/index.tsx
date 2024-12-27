import './entry.css';
import React, { useState, useEffect } from 'react';

const LoginPage: React.FC = () => {
  const handleCancel = (): void => {
    //window.location.href = "file:///C:/Users/olego/Desktop/СберХаб/Сайт_eng2/Сайт_eng/app/templates/base.html";
  };

  const handleEntry = (): void => {
    //window.location.href = "file:///C:/Users/olego/Desktop/СберХаб/Account/personal_account.html";
  };

  return (
    <form>
      <div className="container">
        <h1>Вход</h1>
        <p>Заполните поля, расположенные ниже, чтобы войти в свой аккаунт.</p>
        <hr />

        <label htmlFor="email"><b>Электронная почта</b></label>
        <input type="text" placeholder="Введите электронную почту" name="email" required />

        <label htmlFor="password"><b>Пароль</b></label>
        <input type="password" placeholder="Введите пароль" name="password" required />

        <div className="clearfix">
          <button type="button" className="cancelbtn" onClick={handleCancel}>Отменить</button>
          <button type="button" className="entrybtn" onClick={handleEntry}>Войти</button>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
import './registration.css'; 
import React, { useState, useEffect } from 'react';

const RegistrationPage = (): React.ReactElement => {
  const handleCancel = () => {
    //window.location.href = "file:///C:/Users/olego/Desktop/СберХаб/Сайт_eng2/Сайт_eng/app/templates/base.html";
  };

  const handleRegister = (): void => {
    alert("Регистрация прошла успешно!");
    //window.location.href = "file:///C:/Users/olego/Desktop/СберХаб/Entry/entry.html";
  };

  return (
		<div>
    <form>
      <div className="reg-container">
        <h1>Регистрация</h1>
        <p>Заполните поля, расположенные ниже, чтобы создать аккаунт.</p>
        <hr />

        <label htmlFor="email"><b>Электронная почта</b></label>
        <input type="text" placeholder="Enter Email" name="email" required />

        <label htmlFor="psw"><b>Пароль</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required />

        <label htmlFor="psw-repeat"><b>Повторите пароль</b></label>
        <input type="password" placeholder="Repeat Password" name="psw-repeat" required />

        <div className="clearfix">
          <button type="button" className="cancelbtn" onClick={handleCancel}>Отменить</button>
          <button type="button" className="registerbtn" onClick={handleRegister}>Зарегистрироваться</button>
        </div>
      </div>
    </form>
</div>
  );
};

export default RegistrationPage;

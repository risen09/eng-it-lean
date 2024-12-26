import React from 'react';
import './message.css';

const MessageForm: React.FC = () => {
  const handleCancel = () => {
    window.location.href = "file:///C:/Users/olego/Desktop/СберХаб/Сайт_eng2/Сайт_eng/app/templates/base.html";
  };

  const handleSend = (): void => {
    alert("Ваше сообщение отправлено!");
    window.location.href = "file:///C:/Users/olego/Desktop/СберХаб/Сайт_eng2/Сайт_eng/app/templates/base.html";
  };

  return (
    <form>
      <div className="container">
        <label htmlFor="username"><b>Имя пользователя</b></label>
        <input type="text" placeholder="Введите имя пользователя" name="username" required />

        <label htmlFor="email"><b>Электронная почта</b></label>
        <input type="email" placeholder="Введите электронную почту" name="email" required />

        <label htmlFor="theme"><b>Тема сообщения</b></label>
        <input type="text" placeholder="Введите тему сообщения" name="theme" required />

        <label htmlFor="message"><b>Текст сообщения</b></label>
        <input type="text" placeholder="Введите текст сообщения" name="message" required />

        <div className="clearfix">
          <button type="button" className="cancelbtn" onClick={handleCancel}>Отменить</button>
          <button type="button" className="sendbtn" onClick={handleSend}>Отправить</button>
        </div>
      </div>
    </form>
  );
};

export default MessageForm;
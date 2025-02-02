import React, { useState, useEffect } from 'react';
import './account.css';

const avatars = [
  'https://via.placeholder.com/100/ff7f7f/333333?text=Avatar+1',
  'https://via.placeholder.com/100/7f7fff/333333?text=Avatar+2',
  'https://via.placeholder.com/100/7fff7f/333333?text=Avatar+3',
];

function AccountPage() {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [reminders, setReminders] = useState(() => {
    // Загружаем напоминания из localStorage при первой загрузке
    const savedReminders = localStorage.getItem('reminders');
    return savedReminders ? JSON.parse(savedReminders) : [];
  });
  const [reminderText, setReminderText] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    // Сохраняем напоминания в localStorage каждый раз, когда они обновляются
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleAddReminder = () => {
    if (reminderText) {
      setReminders([...reminders, { text: reminderText, time: new Date() }]);
      setReminderText('');
    }
  };

  const handleDeleteReminder = (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
  };

  return (
    <div className="container">
      <h1>Личный кабинет пользователя</h1>
      <div className="avatar-container">
        <h2>Выберите аватар:</h2>
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            onClick={() => setSelectedAvatar(avatar)}
            className={`avatar ${selectedAvatar === avatar ? 'selected' : ''}`}
          />
        ))}
      </div>

      <div className="reminder-container">
        <h2>Добавьте заметку:</h2>
        <input
          type="text"
          value={reminderText}
          onChange={e => setReminderText(e.target.value)}
          placeholder="Введите заметку"
        />
        <button onClick={handleAddReminder}>Добавить</button>
        <ul>
          {reminders.map((reminder, index) => (
            <li key={index}>
              {reminder.text} — {reminder.time.toLocaleString()}
              <button onClick={() => handleDeleteReminder(index)}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="clock-container">
        <h2>Текущее время:</h2>
        <p>{currentTime.toLocaleString()}</p>
      </div>

      <div className="selected-avatar">
        <h3>Ваш выбранный аватар:</h3>
        <img src={selectedAvatar} alt="Selected Avatar" />
      </div>
    </div>
  );
}

export default AccountPage;
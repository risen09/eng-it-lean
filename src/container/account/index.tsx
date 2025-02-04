import { getNavigationsValue } from '@brojs/cli';
import { MDBBtn, MDBCol, MDBInput, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useGetUserQuery, usePostUsersMutation } from '../../store/api';
import { useCookies } from 'react-cookie';

function AccountPage() {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem('reminders');
    return savedReminders ? JSON.parse(savedReminders) : [];
  });
  const [reminderText, setReminderText] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const [cookies] = useCookies(["auth_token"]);
  const {data: user} = useGetUserQuery(cookies.auth_token);
  const { register, handleSubmit, setValue} = useForm();

  useEffect(() => {
    if (user) {
      setValue("email", user?.email);
      setValue("password", "");
      setValue("nickname", user?.nickname);
      setValue("age", user?.age);
      setValue("about", user?.about);
    }
  }, [user]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
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

  const handleCancel = (): void => {
    navigate(getNavigationsValue('eng-it-lean.main'));
  };

  const [postUsers, isLoading] = usePostUsersMutation();

  const handleSave = async (data) => {
    postUsers({
          id: Date.now(),
          public_id: Date.now(),
          email: data.email,
          password: data.password,
          age: data.age,
          nickname: data.nickname,
          about: data.about,
    })
  };

  return (
    <div className="container my-2 py-3">
      <MDBRow className="align-items-center">
        <MDBCol md="5" className="text-center">
          <img src={'avatar.jpg'} alt="Learning Illustration" className="img-fluid rounded" width="75%" height="75%" />
        </MDBCol>
        <MDBCol md="6" className="pe-md-5 border-end ms-5">
          <MDBTypography tag="p" className="text-muted mb-5 fs-6">
            <form>
              <div className="container-fluid justify-content-center my-0 py-3">
                <label className="form-label">Электронная почта</label>
                <MDBInput
                  id="form1"
                  type="email"
                  required
                  {...register('email')}
                  className="my-0 py-2"
                />
                <label className="form-label">Никнейм</label>
                <MDBInput
                  id="form4"
                  type="string"
                  required
                  {...register('nickname')}
                  className="my-0 py-2"
                />
                <label className="form-label">Возраст</label>
                <MDBInput
                  id="form5"
                  type="number"
                  required
                  {...register('age')}
                  className="my-0 py-2"
                />
                <label className="form-label">Пароль</label>
                <MDBInput
                  id="form2"
                  type="password"
                  required
                  {...register('password')}
                  className="my-0 py-2"
                />
                <label className="form-label">О себе</label>
                <MDBInput
                  id="form6"
                  type="about"
                  required
                  {...register('about')}
                  className="my-0 py-2"
                />
              </div>
              <div className="container-fluid d-flex justify-content-center my-0 py-2"></div>
            </form>
          </MDBTypography>
          <MDBBtn color="success" onClick={handleSubmit(handleSave)} className="">
            Сохранить изменения
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </div>
    /*
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Личный кабинет</h1>
      <div className="reminder-container">
        <h2 style={{ fontSize: '16px' }}>Добавить заметку:</h2>
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
        <h2 style={{ fontSize: '16px' }}>Текущее время:</h2>
        <p>{currentTime.toLocaleString()}</p>
      </div>

      <div className="btn-nav d-flex justify-content-center py-2">
        <MDBBtn color="success" onClick={handleCancel} to="main">
          Выйти
        </MDBBtn>
      </div>
    </div>
    */
  );
}

export default AccountPage;

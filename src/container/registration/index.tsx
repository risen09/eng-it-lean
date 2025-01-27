import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const RegistrationPage = (): React.ReactElement => {
  const handleCancel = () => {
    
  };

  const handleRegister = (): void => {
    alert("Регистрация прошла успешно!");
    
  };

  return (
      <MDBRow>
        <MDBCol>
          <h1>Регистрация</h1>
          <p>Заполните поля, расположенные ниже, чтобы создать аккаунт.</p>
          <hr />

          <MDBInput label='Электронная почта' id='form1' type='email' required />
          <MDBInput label='Пароль' id='form2' type='password' required />
          <MDBInput label='Повторите пароль' id='form3' type='password' required />

          <MDBBtn color='secondary' onClick={handleCancel}>Отменить</MDBBtn>
          <MDBBtn color='primary' onClick={handleRegister}>Зарегистрироваться</MDBBtn>
        </MDBCol>
      </MDBRow>
  );
};

export default RegistrationPage;

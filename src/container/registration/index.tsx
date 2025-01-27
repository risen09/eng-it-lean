import './registration.css'; 
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const RegistrationPage = (): React.ReactElement => {
  const { register, handleSubmit } = useForm();

  const handleCancel = () => {
    
  };

  const handleRegister = (data): void => {
    alert("Регистрация прошла успешно!");
    console.log(data);
  };

  return (
      <MDBRow>
        <MDBCol>
          <h1>Регистрация</h1>
          <p>Заполните поля, расположенные ниже, чтобы создать аккаунт.</p>
          <hr />

          <form onSubmit={handleSubmit(handleRegister)}>
            <MDBInput label='Электронная почта' id='form1' type='email' required {...register('email')} />
            <MDBInput label='Пароль' id='form2' type='password' required {...register('password')} />
            <MDBInput label='Повторите пароль' id='form3' type='password' required {...register('passwordRepeat')} />

            <MDBBtn color='secondary' onClick={handleCancel}>Отменить</MDBBtn>
            <MDBBtn color='primary' type='submit'>Зарегистрироваться</MDBBtn>
          </form>
        </MDBCol>
      </MDBRow>
  );
};

export default RegistrationPage;

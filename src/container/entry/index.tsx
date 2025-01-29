import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const handleCancel = (): void => {};

  const handleEntry = (data): void => {
    console.log(data);
  };

  return (
    <MDBRow>
      <MDBCol>
        <h1>Вход</h1>
        <p>Заполните поля, расположенные ниже, чтобы войти в свой аккаунт.</p>
        <hr />

        <form onSubmit={handleSubmit(handleEntry)}>
          <MDBInput label="Электронная почта" id="form1" type="email" required {...register('email')} />
          <MDBInput label="Пароль" id="form2" type="password" required {...register('password')} />

          <MDBBtn color="secondary" onClick={handleCancel}>
            Отменить
          </MDBBtn>
          <MDBBtn color="primary" type="submit">
            Войти
          </MDBBtn>
        </form>
      </MDBCol>
    </MDBRow>
  );
};

export default LoginPage;

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
    <div className="container my-2 py-5">
      <div className="container my-2 py-2 w-50">
        <MDBRow>
          <MDBCol>
            <h1>Вход</h1>
            <p>Заполните поля, расположенные ниже, чтобы войти в свой аккаунт.</p>
            <hr />
            <form onSubmit={handleSubmit(handleEntry)}>
              <div className="container-fluid justify-content-center my-0 py-3">
                <MDBInput label="Электронная почта" id="form1" type="email" required {...register('email')} className="mb-2 py-2"/>
                <MDBInput label="Пароль" id="form2" type="password" required {...register('password')} className="my-0 py-2"/>
              </div>
                  <div className="container-fluid d-flex justify-content-center my-0 py-2">
                    <MDBBtn outline color="success" onClick={handleCancel} className="me-2">
                      Отменить
                    </MDBBtn>
                    <MDBBtn color="success" type="submit" className="">
                      Войти
                    </MDBBtn>
                  </div>
              </form>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
);
      };

      export default LoginPage;

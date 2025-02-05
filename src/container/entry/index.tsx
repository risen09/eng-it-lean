import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { getNavigationsValue } from '@brojs/cli';
import { useCookies } from 'react-cookie';
import { usePostLoginMutation } from '../../store/api';

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['auth_token']);

  const handleCancel = (): void => {
    navigate(getNavigationsValue('eng-it-lean.main'));
  };

  const [postLogin, isLoading] = usePostLoginMutation();

  const handleEntry = async (data) => {
    const response = await postLogin({ email: data.email, password: data.password });
    event.preventDefault();

    const authToken = response.data?.public_id;

    if (authToken) {
      setCookie('auth_token', authToken, { path: '/', maxAge: 1500 });
      alert('Вход выполнен!');
      console.log(data);

      navigate(getNavigationsValue('eng-it-lean.account'));
    } else {
      alert('Неверный логин или пароль!');
    }
  };

  return (
    <div className="container my-2 py-5">
      <div className="container my-2 py-2 w-50">
        <MDBRow>
          <MDBCol>
            <h1>Вход</h1>
            <p>Заполните поля, расположенные ниже, чтобы войти в свой аккаунт.</p>
            <hr />
            <form>
              <div className="container-fluid justify-content-center my-0 py-3">
                <MDBInput
                  label="Электронная почта"
                  id="form1"
                  type="email"
                  required
                  {...register('email')}
                  className="mb-2 py-2"
                />
                <MDBInput
                  label="Пароль"
                  id="form2"
                  type="password"
                  required
                  {...register('password')}
                  className="my-0 py-2"
                />
              </div>
              <div className="container-fluid d-flex justify-content-center my-0 py-2">
                <MDBBtn outline color="success" onClick={handleCancel} className="me-2">
                  Отменить
                </MDBBtn>
                <MDBBtn color="success" onClick={handleSubmit(handleEntry)} className="">
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

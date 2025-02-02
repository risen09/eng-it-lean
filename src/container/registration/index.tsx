import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { usePostUsersMutation } from '../../store/api';
import { useNavigate } from 'react-router-dom'; 
import { getNavigationsValue } from '@brojs/cli';

const RegistrationPage = (): React.ReactElement => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(getNavigationsValue("eng-it-lean.main"));
  };

  const [postUsers, isLoading] = usePostUsersMutation();

  const handleRegister = (data): void => {
    postUsers({
      id: Date.now(),
      public_id: Date.now(),
      email: data.email,
      password: data.password
    });

    alert("Регистрация прошла успешно!");
    console.log(data);

    navigate(getNavigationsValue("eng-it-lean.entry")); 
  };

  return (
    <div className="container my-2 py-5">
          <div className="container my-2 py-2 w-50">
            <MDBRow>
              <MDBCol>
                <h1>Регистрация</h1>
                <p>Заполните поля, расположенные ниже, чтобы создать аккаунт.</p>
                <hr />
                <form>
                  <div className="container-fluid justify-content-center my-0 py-3">
                    <MDBInput label="Электронная почта" id="form1" type="email" required {...register('email')} className="mb-2 py-2"/>
                    <MDBInput label="Пароль" id="form2" type="password" required {...register('password')} className="my-0 py-2"/>
                    <MDBInput label="Повторите пароль" id="form3" type="password" required {...register('passwordRepeat')} className="my-0 py-2"/>
                  </div>
                      <div className="container-fluid d-flex justify-content-center my-0 py-2">
                        <MDBBtn outline color="success" onClick={handleCancel} className="me-2">
                          Отменить
                        </MDBBtn>
                        <MDBBtn color="success" onClick={handleSubmit(handleRegister)} className="">
                          Зарегистрироваться
                        </MDBBtn>
                      </div>
                  </form>
              </MDBCol>
            </MDBRow>
          </div>
    </div>
  );
};

export default RegistrationPage;

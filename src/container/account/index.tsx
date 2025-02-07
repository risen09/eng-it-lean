import { getNavigationsValue, getNavigationValue } from '@brojs/cli';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBInput,
  MDBRow,
  MDBSpinner,
  MDBTypography
} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useGetUnitsQuery, useGetUserQuery, useSaveUserMutation } from '../../store/api';
import { useCookies } from 'react-cookie';
import { LinkContainer } from 'react-router-bootstrap';
import avatar from './images/avatar.jpg';

function AccountPage() {
  const navigate = useNavigate();
  const [reminders] = useState(() => {
    const savedReminders = localStorage.getItem('reminders');
    return savedReminders ? JSON.parse(savedReminders) : [];
  });
  const [, setCurrentTime] = useState(new Date());

  const [cookies, setCookies] = useCookies(['auth_token']);
  const { data: user } = useGetUserQuery(cookies.auth_token);
  const { register, handleSubmit, setValue } = useForm();

  const { data: units, isLoading: isLoadingUnits } = useGetUnitsQuery();

  useEffect(() => {
    if (user) {
      setValue('email', user?.email);
      setValue('password', '');
      setValue('nickname', user?.nickname);
      setValue('age', user?.age);
      setValue('about', user?.about);
    }
  }, [user, setValue]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleExit = (): void => {
    setCookies('auth_token', null);
    navigate(getNavigationsValue('eng-it-lean.main'));
  };

  const [saveUser] = useSaveUserMutation();

  const handleSave = async (data) => {
    saveUser({
      id: -1,
      public_id: user.public_id,
      email: data.email,
      password: data.password,
      age: data.age,
      nickname: data.nickname,
      about: data.about
    });
  };

  return (
    <div className="container my-2 py-3">
      <MDBRow className="align-items-center">
        <MDBCol md="5" className="text-center">
          <img src={avatar} alt="Learning Illustration" className="img-fluid rounded" width="75%" height="75%" />
        </MDBCol>
        <MDBCol md="6" className="pe-md-5 border-end ms-5">
          <MDBTypography tag="p" className="text-muted mb-5 fs-6">
            <form>
              <div className="container-fluid justify-content-center my-0 py-3">
                <label htmlFor="formEmail" className="form-label">
                  Электронная почта
                </label>
                <MDBInput id="formEmail" type="email" required {...register('email')} className="my-0 py-2" />
                <label htmlFor="formNickname" className="form-label">
                  Никнейм
                </label>
                <MDBInput id="formNickname" type="string" required {...register('nickname')} className="my-0 py-2" />
                <label htmlFor="formAge" className="form-label">
                  Возраст
                </label>
                <MDBInput id="formAge" type="number" required {...register('age')} className="my-0 py-2" />
                <label htmlFor="formPassword" className="form-label">
                  Пароль
                </label>
                <MDBInput id="formPassword" type="password" required {...register('password')} className="my-0 py-2" />
                <label htmlFor="formAbout" className="form-label">
                  О себе
                </label>
                <MDBInput id="formAbout" type="about" required {...register('about')} className="my-0 py-2" />
              </div>
              <div className="container-fluid d-flex justify-content-center my-0 py-2"></div>
            </form>
          </MDBTypography>
          <MDBBtn color="success" onClick={handleSubmit(handleSave)} className="">
            Сохранить изменения
          </MDBBtn>
          <MDBBtn color="danger" className="mx-2" onClick={handleExit} to="main">
            Выйти
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      <MDBRow className="align-items-center my-5">
        <MDBTypography tag="h2" className="text-muted">
          Ваши материалы
        </MDBTypography>
        {isLoadingUnits && <MDBSpinner />}
        {units &&
          units
            .filter((unit) => unit.author.id === user?.public_id)
            .map((unit) => (
              <MDBCol key={unit.id} xl={4} lg={6} className="mb-4">
                <MDBCard key={unit.id}>
                  <MDBCardBody>
                    <MDBCardTitle className="text-muted ">{unit.name}</MDBCardTitle>
                    <LinkContainer to={`${getNavigationValue('eng-it-lean.unit').replace(':id', unit.id.toString())}`}>
                      <MDBBtn color="success">Изучить</MDBBtn>
                    </LinkContainer>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
      </MDBRow>
    </div>
  );
}

export default AccountPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getNavigationsValue } from '@brojs/cli';
import { getConfigValue } from '@brojs/cli';
import { useGetDictionariesQuery } from '../../store/api';
import imgproject from './images/project.jpg';
import {
  MDBCol,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit';

const AboutPage = (): React.ReactElement => {
  const { data: dictionaries, isLoading, error } = useGetDictionariesQuery(undefined);

  return (
    <div>
      <div className="container my-2 py-3">
        <MDBRow className="align-items-center">
          <MDBCol md="5" className="pe-md-5 ms-5">
            <MDBTypography tag="h2" className="fw-bold mb-5">
              О проекте
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted mb-3 fs-6">
              Для всех, кто хочет знать английский язык мы создали этот сайт, полностью посвященный его изучению. Здесь вы найдете все необходимое для того, чтобы улучшить ваши знания и навыки владения английским языком.
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted mb-3 fs-6">
              Изучайте английский язык вместе с нами, общайтесь и задавайте вопросы на форуме, проверяйте и развивайте ваши знания с помощью онлайн тестов и игр. Пополняйте словарный запас, слушая аудиокниги на английском. Проходите тренировки по темам английской грамматики. Сохраняйте и тренируйте новые слова, используя интерактивный словарь.
            </MDBTypography>
            <MDBTypography tag="h5" className="text-muted mb-3">
              Освойте английский легко и эффективно с нашим интеллектуальным помощником!
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted mb-3 fs-6">
              Наш ИИ-учитель – это персональный наставник, который адаптируется к вашему уровню знаний, обучает в удобном темпе и делает процесс изучения языка увлекательным.
            </MDBTypography>
          </MDBCol>
          <MDBCol md="6" className="text-center">
            <img src={imgproject} alt="Learning Illustration" className="img-fluid rounded" width="75%" height="75%" />
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
};

export default AboutPage;

import './index.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/card';
import { DictionaryItem } from './types';
import { getNavigationsValue } from '@brojs/cli';
import { getConfigValue } from '@brojs/cli';
import { useGetDictionariesQuery } from '../../store/api';
import mainKurs from './images/main.jpg';
import mainBanner from './images/osn_banner2.jpg';
import imgBlock1 from './images/block1.jpg';
import imgBlock2 from './images/block2.jpg';
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBTypography,
  MDBBtn,
  MDBIcon, MDBCard, MDBRipple, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText
} from 'mdb-react-ui-kit';

// import required modules

function App() {
  return (
    <div className="container text-center py-1">
      <MDBCarousel showControls showIndicators={false} className="carousel-multi-item" interval={4000}>
        <MDBCarouselItem itemId={1} className="active">
          <img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.freepik.com%2Fvectors%2Fit&psig=AOvVaw3rq2SQ7NgkwlGE_bBaCgXX&ust=1738230315362000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNjqur_TmosDFQAAAAAdAAAAABAE"
            alt="Slide 1"
            className="d-block w-100"
          />
          <MDBCarouselCaption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
          <img src="https://mdbootstrap.com/img/new/slides/041.jpg" alt="Slide 2" className="d-block w-100" />
          <MDBCarouselCaption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>
    </div>
  );
}

const HomePage = (): React.ReactElement => {
  const { data: dictionaries, isLoading, error } = useGetDictionariesQuery(undefined);

  return (
    <div>
      <App />
      <MDBContainer className="my-2 py-3">
        <MDBRow className="align-items-center">
          <MDBCol md="5" className="pe-md-5 border-end ms-5">
            <MDBTypography tag="h2" className="fw-bold mb-5">
              Начать обучение
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted mb-5 fs-6">
              Изучайте английский с нами. С нуля! <br />
              Практики, словари, видеоуроки и многое другое <br />
              Встроенный помощник
            </MDBTypography>
            <MDBBtn
              color="success"
              className="btn-sm w-50 px-4 py-2 fw-bold shadow rounded-2 text-center d-inline-block fs-8"
            >
              Начать обучение
            </MDBBtn>
          </MDBCol>
          <MDBCol md="6" className="text-center">
            <img src={mainKurs} alt="Learning Illustration" className="img-fluid rounded" width="75%" height="75%" />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBContainer className="my-2 py-4">
        <MDBRow className="align-items-center">
          <MDBCol md="5" className="text-center">
            <img
              src={imgBlock1}
              alt="Telephone Booth"
              className="img-fluid rounded"
            />
          </MDBCol>
          <MDBCol md="7">
            <MDBTypography tag="h5" className="fw-bold mb-2 text-muted me-3">
              <MDBIcon fas icon="circle" className="me-2 text-success" size="xs" />
              Построение словарного запаса
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted mb-4 me-4">
              Eng-it-learn позволяет изучать и повторять слова на реальных примерах. Наш искусственный интеллект подберёт
              оптимальные моменты для повторения слов, чтобы помочь прочно закрепить пройденный материал в памяти.
            </MDBTypography>
            <MDBTypography tag="h5" className="fw-bold mb-2 text-muted me-3">
              <MDBIcon fas icon="circle" className="me-2 text-success" size="xs" />
              Справочные материалы всегда под рукой
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted mb-4 me-4">
              Eng-it-learn снабжает каждое изучаемое слово грамматической справкой, которая позволит разобраться в сложных
              вопросах и не сомневаться в правильности речи и письма.
            </MDBTypography>
            <MDBTypography tag="h5" className="fw-bold mb-2 text-muted me-4">
              <MDBIcon fas icon="circle" className="me-2 text-success" size="xs" />
              Индивидуальная программа для каждого учащегося
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted me-4">
              Eng-it-learn создан на основе нейронных сетей, способных не только оценить уже имеющиеся знания, но и
              динамически подстраивать процесс обучения.
            </MDBTypography>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBContainer className="my-2 py-4">
        <MDBRow className="align-items-center">
          <MDBCol md="7">
            <MDBTypography tag="h5" className="fw-bold mb-2 text-muted ms-3">
              <MDBIcon fas icon="circle" className="me-2 text-success" size="xs" />
              Проверочные задания
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted mb-4 ms-3">
              Проверочные задания позволяют практиковать английский язык на реальных примерах и обеспечивают глубокое
              погружение в языковую среду. В нашем приложении можно практиковать речь, чтение, грамматику и другие
              дисциплины.
            </MDBTypography>
            <MDBTypography tag="h5" className="fw-bold mb-2 text-muted ms-3">
              <MDBIcon fas icon="circle" className="me-2 text-success" size="xs" />
              Специализированные курсы
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted mb-4 ms-3">
              В Eng-it-learn доступны специальные курсы, с помощью которых можно пополнить словарный запас лексикой на такие
              темы, как бизнес, путешествия и т.д.
            </MDBTypography>
            <MDBTypography tag="h5" className="fw-bold mb-2 text-muted ms-3">
              <MDBIcon fas icon="circle" className="me-2 text-success" size="xs" />
              Статистика обучения
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted ms-3">
              Наше приложение автоматически отслеживает темп обучения и позволяет увидеть результаты работы.
            </MDBTypography>
          </MDBCol>
          <MDBCol md="5" className="text-center">
            <img
              src={imgBlock2}
              alt="UK Streets"
              className="img-fluid rounded"
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      )
      <MDBContainer className="my-2 py-5">
        <MDBRow className="g-2 justify-content-center">
          {dictionaries
            ?.map((dictionary) => (
              <MDBCol md="4">
                <MDBCard style={{ width: '18rem' }} className="rounded-4 shadow-sm">
                  <MDBRipple rippleColor="light" rippleTag="div" className="bg-image hover-overlay">
                    <MDBCardImage src={require('./images/' + dictionary.imageFilename)} fluid alt="..." className="rounded-top" />
                    <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                  </MDBRipple>
                  <MDBCardBody>
                    <MDBCardTitle className="fw-bold fs-5">Словари</MDBCardTitle>
                    <MDBCardText className="text-muted">{dictionary.description}</MDBCardText>
                    <MDBBtn
                      tag={Link}
                      to={getNavigationsValue('eng-it-lean.dictionary').replace(':id', dictionary.id.toString())}
                      color="success"
                      className="btn-sm mt-2"
                    >
                      Подробнее
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))
            .slice(0, 5)}
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default HomePage;

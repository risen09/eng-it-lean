import React from 'react';
import { Link } from 'react-router-dom';
import { getNavigationsValue } from '@brojs/cli';
import { useGetDictionariesQuery } from '../../store/api';
import mainKurs from './images/main.jpg';
import imgBlock1 from './images/block1.jpg';
import imgBlock2 from './images/block2.jpg';
import bannerblock1 from './images/bannerblock1.jpg';
import bannerblock2 from './images/bannerblock2.jpg';
import kart1 from './images/kart1.jpg';
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
  MDBCol,
  MDBRow,
  MDBTypography,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBRipple,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText
} from 'mdb-react-ui-kit';
import styled from '@emotion/styled';

// import required modules

const StyledCarousel = styled(MDBCarousel)`
  position: relative;
  .carousel-indicators [data-mdb-target] {
    background-color: #9fa6b2; /* Серый цвет по умолчанию */
    opacity: 0.5;
  }
  .carousel-control-next-icon,
  .carousel-control-prev-icon {
    color: #14a44d; /* Зелёный цвет */
  }

  .custom-carousel .carousel-control-prev,
  .custom-carousel .carousel-control-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: auto;
  }
  .carousel-indicators .active {
    background-color: #14a44d;
    opacity: 1;
  }
  .carousel-control-prev {
    left: -5%;
  }
  .carousel-control-next {
    right: -5%;
  }
  .carousel-caption {
    position: absolute;
    left: 7%;
    width: 50%;
    top: 50%;
    transform: translateY(-60%);
    text-align: left;
  }
  .carousel-item {
    position: relative;
    height: 500px; /* Высота для десктопа */
    max-height: 80vh;

    /* Для телефонов (до 768px) уменьшаем высоту */
    @media (max-width: 768px) {
      height: 300px; /* Меньшая высота на телефонах */
    }

    /* Для очень маленьких экранов (до 480px) */
    @media (max-width: 480px) {
      height: 250px;
    }
  }
`;

const CustomCarousel = () => {
  return (
    <div className="container py-0">
      <StyledCarousel showIndicators showControls>
        <MDBCarouselItem itemId={1} className="mb-5 mt-5">
          <MDBCarouselCaption className="md-auto mt-auto mb-auto">
            <MDBTypography tag="h2" className="text-muted fw-bold mb-5">
              ИИ-учитель
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted mb-5 fs-6">
              Наш ИИ-учитель – это персональный наставник, <br />
              который адаптируется к вашему уровню знаний, <br />
              обучает в удобном темпе и делает процесс <br />
              изучения языка увлекательным
            </MDBTypography>
            <MDBBtn
              tag={Link}
              to={getNavigationsValue('eng-it-lean.units')}
              color="success"
              className="btn-sm w-50 px-4 py-2 fw-bold shadow rounded-2 text-center d-inline-block fs-8"
            >
              Начать обучение
            </MDBBtn>
          </MDBCarouselCaption>
          <img src={bannerblock1} className="d-block w-50 ms-auto me-5 h-100 ps-5 pe-5" alt="..." />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={2} className="mb-5 mt-5">
          <MDBCarouselCaption className="md-auto mt-auto mb-auto">
            <MDBTypography tag="h2" className="text-muted fw-bold mb-5">
              Интерактивный словарь
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted mb-5 fs-6">
              Запоминайте и тренируйте новые слова <br />
              легко и эффективно. Добавляйте слова <br />
              в свой личный список, изучайте <br />
              их в удобном формате <br />
            </MDBTypography>
            <MDBBtn
              tag={Link}
              to={getNavigationsValue('eng-it-lean.units')}
              color="success"
              className="btn-sm w-50 px-4 py-2 fw-bold shadow rounded-2 text-center d-inline-block fs-8"
            >
              Начать обучение
            </MDBBtn>
          </MDBCarouselCaption>
          <img src={bannerblock2} className="d-block w-50 ms-auto me-5 h-100 ps-5 pe-5" alt="..." />
        </MDBCarouselItem>
      </StyledCarousel>
    </div>
  );
};

const HomePage = (): React.ReactElement => {
  const { data: dictionaries } = useGetDictionariesQuery(undefined);

  return (
    <div>
      <CustomCarousel />
      <div className="container my-2 py-3">
        <MDBRow className="align-items-center">
          <MDBCol md="5" className="pe-md-5 border-end ms-5">
            <MDBTypography tag="h2" className="fw-bold mb-5">
              Начни обучение
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted mb-5 fs-6">
              Изучайте английский с нами. С нуля! <br />
              Практики, словари, видеоуроки и многое другое <br />
              Встроенный помощник
            </MDBTypography>
            <MDBBtn
              tag={Link}
              to={getNavigationsValue('eng-it-lean.units')}
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
      </div>
      <div className="container my-2 py-4">
        <MDBRow className="align-items-center">
          <MDBCol md="5" className="text-center">
            <img src={imgBlock1} alt="Telephone Booth" className="img-fluid rounded" />
          </MDBCol>
          <MDBCol md="7">
            <MDBTypography tag="h5" className="fw-bold mb-2 text-muted me-3">
              <MDBIcon fas icon="circle" className="me-2 text-success" size="xs" />
              Построение словарного запаса
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted mb-4 me-4">
              Eng-it-learn позволяет изучать и повторять слова на реальных примерах. Наш искусственный интеллект
              подберёт оптимальные моменты для повторения слов, чтобы помочь прочно закрепить пройденный материал в
              памяти.
            </MDBTypography>
            <MDBTypography tag="h5" className="fw-bold mb-2 text-muted me-3">
              <MDBIcon fas icon="circle" className="me-2 text-success" size="xs" />
              Справочные материалы всегда под рукой
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted mb-4 me-4">
              Eng-it-learn снабжает каждое изучаемое слово грамматической справкой, которая позволит разобраться в
              сложных вопросах и не сомневаться в правильности речи и письма.
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
      </div>
      <div className=" container my-2 py-4">
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
              В Eng-it-learn доступны специальные курсы, с помощью которых можно пополнить словарный запас лексикой на
              такие темы, как бизнес, путешествия и т.д.
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
            <img src={imgBlock2} alt="UK Streets" className="img-fluid rounded" />
          </MDBCol>
        </MDBRow>
      </div>
      <div className="container my-2 py-5">
        <MDBRow className="g-2 justify-content-center">
          {dictionaries
            ?.map((dictionary) => (
              <MDBCol key={dictionary.id} md="4">
                <MDBCard style={{ width: '18rem' }} className="rounded-4 shadow-sm">
                  <MDBRipple rippleColor="light" rippleTag="div" className="bg-image hover-overlay">
                    <MDBCardImage src={kart1} fluid alt="..." className="rounded-top" />
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
      </div>
    </div>
  );
};

export default HomePage;

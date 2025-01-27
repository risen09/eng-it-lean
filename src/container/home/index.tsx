import './index.css';
import React, { useState } from 'react';
import Card from '../../components/card';
import { DictionaryItem } from './types';
import { getNavigationsValue } from '@brojs/cli';
import { getConfigValue } from '@brojs/cli';
import { useGetDictionariesQuery } from '../../store/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules

function App() {
  return (
    <>
      <div className="main-banner">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide>
            <div className="block-slider">
              <img src={mainBanner} alt="" className="img_main_banner}" />
              <div className="block-slider-content">
                <div className="block-slider-content-inner">
                  <h2>Начни сегодня</h2>
                  <p>Лучшие практики, словари, граматика, материалы, фильмы и многое другое </p>
                  <button className="recordButton">Начать обучение</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

import mainBanner from './images/osn_banner2.jpg';

const HomePage = (): React.ReactElement => {
  const { data: dictionaries, isLoading, error } = useGetDictionariesQuery(undefined);

  return (
    <div>
      <App />

      <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></script>
      <div className="main-banner">
        <img src={mainBanner} alt="" className="img_main_banner" />
      </div>
      <div className="main">
        {error && <div>Ошибка!</div>}
        {isLoading && <div>Loading...</div>}
        <div className="card_center_blocks">
          {dictionaries
            ?.map((dictionary) => (
              <Card
                key={dictionary.id}
                title="Словари"
                description={dictionary.description}
                imgUrl={require('./images/' + dictionary.imageFilename)}
                link={getNavigationsValue('eng-it-lean.dictionary').replace(':id', dictionary.id.toString())}
              />
            ))
            .slice(0, 5)}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

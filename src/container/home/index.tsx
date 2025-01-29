import './index.css';
import React, { useState } from 'react';
import Card from '../../components/card';
import { DictionaryItem } from './types';
import { getNavigationsValue } from '@brojs/cli';
import { getConfigValue } from '@brojs/cli';
import { useGetDictionaryListQuery } from '../../store/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption, MDBContainer } from 'mdb-react-ui-kit';



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules

function App() {
  return (
    <div className="container text-center py-1">
      <MDBCarousel
        showControls
        showIndicators={false}
        className="carousel-multi-item"
        interval={4000}
      >
        <MDBCarouselItem itemId={1} className="active">
              <img
                src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.freepik.com%2Fvectors%2Fit&psig=AOvVaw3rq2SQ7NgkwlGE_bBaCgXX&ust=1738230315362000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNjqur_TmosDFQAAAAAdAAAAABAE'
                alt="Slide 1"
                className="d-block w-100"
              />
          <MDBCarouselCaption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
              <img
                src='https://mdbootstrap.com/img/new/slides/041.jpg'
                alt="Slide 2"
                className="d-block w-100"
              />
          <MDBCarouselCaption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>
    </div>

  );
};

import mainBanner from './images/osn_banner2.jpg';

const HomePage = (): React.ReactElement => {
  const { data: dictionaries, isLoading, error } = useGetDictionaryListQuery(undefined);

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
                link={getNavigationsValue('eng-it-lean.dictionary').replace(':id', dictionary.id.toString())} />)).slice(0, 5)}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

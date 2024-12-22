import './index.css';
import React, { useState } from 'react';
import Card from '../../components/card';
import { DictionaryItem } from './types';
import { getNavigationsValue } from '@brojs/cli';
import { getConfigValue } from '@brojs/cli';
import { useGetDictionaryListQuery } from '../../store/api';

import mainBanner from './images/osn_banner2.jpg';

const HomePage = (): React.ReactElement => {
  const { data: dictionaries, isLoading, error } = useGetDictionaryListQuery(undefined);

  return (
    <div>
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

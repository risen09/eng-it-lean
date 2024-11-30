import './index.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, description, imgUrl, link }): React.ReactElement => {
  return (
    <Link to={link}>
      <div className="card">
        <div className="main_card">
          <div className="card_div_img">
            <img src={imgUrl} alt="" className="img_kart" />
          </div>
          <div className="card_text">
            <h3 className="card_h3">{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;

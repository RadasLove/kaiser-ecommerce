import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage'

const Card = ({ product }) => {
  return (
    <div className="col-lg-4 col-sm-12 mb-3">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
         <ShowImage item={product} url='product' />
          <p>{product.description}</p>
          <p>{product.price} Kč</p>
          <Link to="/">
            {' '}
            <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
              Zobrazit produkt
            </button>
          </Link>
          <button className="btn btn-outline-warning mt-2 mb-2">
            Přidat do košíku
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

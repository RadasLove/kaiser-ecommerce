import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import 'moment/locale/cs';
import { addItem } from './cartHelpers';

moment.locale('cs');

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
}) => {
  const [redirect, setRedirect] = useState(false);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
            Zobrazit produkt
          </button>{' '}
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Přidat do košíku
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">
        Skladem {quantity} ks
      </span>
    ) : (
      <span className="badge badge-primary badge-pill">Není skladem</span>
    );
  };

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p className="lead mt-2">{product.description.substring(0, 50)}</p>
        <p className="black-10">Cena: {product.price} Kč</p>
        <p className="black-9">
          Kategorie: {product.category && product.category.name}
        </p>
        <p className="black-8">Přídán {moment(product.createdAt).fromNow()}</p>

        {showStock(product.quantity)}
        <br />
        {showViewButton(showViewProductButton)}
        {showAddToCartBtn(showAddToCartButton)}
      </div>
    </div>
  );
};

export default Card;

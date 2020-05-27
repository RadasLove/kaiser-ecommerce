import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = (items) => {
    return (
      <div className="div">
        <div className="h2">
          Váš košík obsahuje {`${items.length}`} položek
        </div>
        <hr />
        {items.map((product, i) => (
          <Card key={i} product={product} showAddToCartButton={false} />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Vaše karta je prádzná. <br /> <Link to="/shop"> Pokračujte v nákupu</Link>
    </h2>
  );

  return (
    <Layout
      title="Košík"
      description="Upravte svůj seznam nebo pokračujte"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <p>ukazat checkout, doprava, cena atp</p>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;

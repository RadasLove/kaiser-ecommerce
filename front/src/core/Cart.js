import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import { Link } from 'react-router-dom';
import Checkout from './Checkout'

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div className="div">
        <div className="h2">
          Váš košík obsahuje {`${items.length}`} položek
        </div>
        <hr />
        {items.map((product, i) => (
          <Card key={i} product={product} showAddToCartButton={false} cartUpdate={true} showRemoveProductButton={true} setRun={setRun} run={run}/>
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
          <h2 className="mb-4">Přehled nákupu</h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;

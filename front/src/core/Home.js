import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
        console.log(data)
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout title="Homepage" description="Node React Kaiser eshop" className='container-fluid'>
  <h2 className="mb-4">Nejprodavanější krabičky</h2>
  <div className="row">
  {productsBySell.map((product, i) => (<Card key={i} product={product} />))}
  </div>

  <h2 className="mb-4">Nejnovější krabičky</h2>
  <div className="row">
  {productsByArrival.map((product, i) => (<Card key={i} product={product} />))}
  </div>
    </Layout>

  );
};

export default Home;

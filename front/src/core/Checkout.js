import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success"> Dokončit </button>
    ) : (
      <Link to="signin">
        <button className="btn btn-primary">Přihlašeni </button>
      </Link>
    );
  };

  return (
    <div>
      <h2> Celková cena: {getTotal()} Kč</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;

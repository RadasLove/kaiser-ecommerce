import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // vzit user a token z localstorage

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError('');
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError('');
        setSuccess(true);
      }
    });

    // udělat requesto na api a vytvořit kategorii
  };

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Název Kategorie</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Vytvořit kategorii</button>
    </form>
  );

  const showSucces = () => {
    if (success) {
      return <h3 className="text-success"> Kategorie {name} vytvořena </h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Kategorie {name} již existuje</h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        {' '}
        Zpět
      </Link>
    </div>
  );

  return (
    <Layout
      title="Přídat novou kategorii "
      description={` ${user.name} přídat novou kategorii?`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSucces()}
          {showError()}
          {newCategoryFom()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;

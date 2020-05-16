import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  });

  const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  // nahrat kategorie a nastavit data

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          loading: false,
          error:'',
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form onSubmit={clickSubmit} className="mb-3">
      <h4>Vložit fotku</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange('photo')}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>
      <div className="form-group">
      <label className="text-muted">Název produktu</label>
        <input
          onChange={handleChange('name')}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
      <label className="text-muted">Popis</label>
        <textarea
          onChange={handleChange('description')}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
      <label className="text-muted">Cena</label>
        <input
          onChange={handleChange('price')}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
      <label className="text-muted">Kategorie</label>
        <select onChange={handleChange('category')} className="form-control">
          <option>Vyberte kategori</option>
          {categories && categories.map((c, i) => (<option value={c._id}>{c.name}</option> ))}
        </select>
      </div>

      <div className="form-group">
      <label className="text-muted">Doprava?</label>
        <select onChange={handleChange('shipping')} className="form-control">
         <option>Zvolte</option>
          <option value="0">Ne</option>
          <option value="1">Ano</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Počet skladem</label>
        <input
          onChange={handleChange('quantity')}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>

      <button className="btn btn-outline-primary">Vytvořit produkt</button> 
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSucces = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <h2>{createdProduct} je vytvořen ! </h2>
    </div>
  );


  const showLoading = () => 
    loading && (<div
      className="alert alert-success" >
      <h2>Moment... </h2>
    </div>
  );

  return (
    <Layout
      title="Přídat nový produkt "
      description={` ${user.name} přídat nový produkt?`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSucces()}
          {showError()}
          {newPostForm()}</div>
      </div>
    </Layout>
  );
};

export default AddProduct;

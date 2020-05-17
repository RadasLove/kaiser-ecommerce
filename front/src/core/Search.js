import React, { useState, useEffect } from 'react';
import { getCategories } from './apiCore';
import Card from './Card';

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

const searchSubmit = () => {




};


const handleChange = () => {



};



  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="div input-group-prepend">
            <select className="btn mr-2" onChange={handleChange(category)}>
              <option value="Všechny">Vyberte kategorii</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}{' '}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handleChange('search')}
            placeholder="Hledat dle názvu"
          />
        </div>
        <div className="btn input-group-append" style={{border: 'none'}}>
            <button className="input-group-text">Vyhledat</button>
        </div>
      </span>
    </form>
  );

  return (
    <div>
      <div className="container">{searchForm()}</div>
    </div>
  );
};

export default Search;

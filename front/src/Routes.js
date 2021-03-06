import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';





const Routes = () => {
  return (  
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/product/:productId" exact component={Product} />
          <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
          <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} /> 
          <AdminRoute path='/category/create' exact component={AddCategory} />
          <AdminRoute path='/create/product' exact component={AddProduct} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;

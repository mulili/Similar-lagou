import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore, applyMiddleware, compose, combineReducers
} from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import thunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';

import './config';

import name from './Name.redux';
import auth from './Auth.redux';

import Login from './container/login';
import Register from './container/register';
import AuthRoute from './component/authroute';
import Auth from './Auth';

import Dashboard from './Dashboard';


import './index.css';

const store = createStore(combineReducers({ name, auth }), compose(
  applyMiddleware(thunk),
  /* eslint-disable no-underscore-dangle */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  /* eslint-enable */
));

ReactDOM.render(
  <Provider
    store={store}
  >
    <Router>
      <AuthRoute />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" component={Register} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

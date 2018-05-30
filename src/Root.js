import React, { Component } from 'react';
import redux, { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware(); 
const store = createStore(reducers, applyMiddleware(sagaMiddleware));


export default class Root extends React.Component {

  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" component={App}></Route>
        </BrowserRouter>
      </Provider>
    )
  }

}
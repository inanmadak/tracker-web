import React, { Component } from 'react';
import redux, { applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware());


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

export default Root;
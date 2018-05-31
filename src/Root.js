import React, { Component } from 'react';
import redux, { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './containers/Home';
import reducers from './reducers';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware(); 
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

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
import React, { Component } from 'react';
import redux, { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Signup from './components/Signup';
import reducers from './reducers';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default class Root extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/signup" component={Signup}></Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }

}
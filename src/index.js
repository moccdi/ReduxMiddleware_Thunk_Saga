import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import saga from './saga';


import reducer from './reducer'

import './index.css';
import App from './App';
import { withReducer } from "recompose";
import promiseMiddleware from "./middlewares/promiseMiddleware";



//middleware
//const store = createStore(reducer,applyMiddleware(promiseMiddleware,logger));

//thunk
//const store = createStore(reducer,applyMiddleware(thunk,logger));

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer,applyMiddleware(sagaMiddleware,logger));
sagaMiddleware.run(saga) //

window.store = store;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


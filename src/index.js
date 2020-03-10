import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';

import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'

/* for async code */
import thunk from 'redux-thunk';

/* for redux dev-tools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilderReducer: burgerBuilderReducer,
  orderReducer: orderReducer
})


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))



const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

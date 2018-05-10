import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './redux/reducers'
// import Client, {Config} from 'shopify-buy';
// //
// const config = {
//   storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
//   domain: 'graphql.myshopify.com',
// }
//
// const client = Client.buildClient(config)

const loggerMiddleware = createLogger()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store

if (process.env.NODE_ENV == 'development') {
  store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ))
  )
}
else {
  store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(
      thunkMiddleware
    ))
  )
}


const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
registerServiceWorker();

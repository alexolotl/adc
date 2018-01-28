import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import Client, {Config} from 'shopify-buy';

const config = {
  storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
  domain: 'graphql.myshopify.com',
}

const client = Client.buildClient(config)

ReactDOM.render((
  <BrowserRouter>
    <App client={client} />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();

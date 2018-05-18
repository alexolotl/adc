import Client, {Config, ShopResource} from 'shopify-buy';

const config = {
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_TOKEN,
  domain: 'antes-de-cristo.myshopify.com'
}

export const client = Client.buildClient(config)

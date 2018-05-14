import Client, {Config, ShopResource} from 'shopify-buy';

const config = {
  storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',//process.env.REACT_APP_SHOPIFY_TOKEN,
  domain: 'graphql.myshopify.com'//'antes-de-cristo.myshopify.com',
}

export const client = Client.buildClient(config)

import Client from 'shopify-buy';
import * as shopActions from 'redux/actions/shop'
import * as cartActions from 'redux/actions/cart'

export const REQUEST_CLIENT = 'REQUEST_CLIENT'
function requestClient(config) {
  return {
    type: REQUEST_CLIENT
  }
}

export const RECEIVE_CLIENT = 'RECEIVE_CLIENT'
function receiveClient(payload) {
  return {
    type: RECEIVE_CLIENT,
    payload
  }
}

export function initializeClient(config) {
  return function(dispatch) {
    // sets isFetching to true
    dispatch(requestClient(config))

    const client = Client.buildClient(config)

    // CHECKOUT
    const checkoutId = localStorage.getItem('checkoutId')
    if (checkoutId) {
      client.checkout.fetch(checkoutId).then((checkout) => {
        dispatch(cartActions.updateCheckout(checkout))
      });
    }
    else {
      client.checkout.create().then((checkout) => {
        localStorage.setItem('checkoutId', checkout.id)
        dispatch(cartActions.updateCheckout(checkout))
      });
    }

    // PRODUCTS
    client.product.fetchAll().then((products) => {
      dispatch(shopActions.getAllProducts(products))
    });

    // COLLECTION
    client.collection.fetchAllWithProducts().then((collections) => {
      const filteredCollections = collections.filter(coll => coll.products.length > 0)
      dispatch(shopActions.getCollections(filteredCollections))
    });

    // client.fetchShopInfo().then((res) => {
    //   dispatch(shopActions.setShop(res))
    // });

    return dispatch(receiveClient(client))
  }
}

import Client from 'shopify-buy';
import {initializeCheckout} from 'redux/actions/cart'
import * as uiActions from 'redux/actions/ui'

export const SET_CHECKOUT = 'SET_CHECKOUT'
export function setCheckout(payload) {
  return {
    type: SET_CHECKOUT,
    payload
  }
}

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
export function getAllProducts(payload) {
  return {
    type: GET_ALL_PRODUCTS,
    payload
  }
}
export const PRODUCTS_LOADING = 'PRODUCTS_LOADING'
export function productsLoading() {
  return {
    type: PRODUCTS_LOADING
  }
}

export const SET_ACTIVE_PRODUCT = 'SET_ACTIVE_PRODUCT'
export function setActiveProduct(payload) {
  return {
    type: SET_ACTIVE_PRODUCT,
    payload
  }
}

export const SET_SHOP = 'SET_SHOP'
export function setShop(payload) {
  return {
    type: SET_SHOP,
    payload
  }
}

export const GET_COLLECTIONS = 'GET_COLLECTIONS'
export function getCollections(payload) {
  return {
    type: GET_COLLECTIONS,
    payload
  }
}

export const SET_COLLECTION = 'SET_COLLECTION'
export function setCollection(payload) {
  return {
    type: SET_COLLECTION,
    products: payload.products,
    activeCollection: payload.title
  }
}

export function fetchNextPage(productList, client) {
  return dispatch => {
    dispatch(productsLoading())
    productList && productList.slice(-1)[0].hasNextPage && client.fetchNextPage(productList).then((nextPageOfProducts) => {
      dispatch(getAllProducts(nextPageOfProducts.model))
      dispatch(uiActions.setBkgText('ANTES DE CRISTO ✝ '))
    }).catch(err => {return console.log(err)})
  }
}

export function filterByType(type, client) {
  return function(dispatch) {
    return client.product.fetchAll().then((products) => {
      let filtered = products.filter(product => product.productType == type)
      return dispatch(getAllProducts(filtered))
    });
  }
}

export function getProductById(id, client) {
  return dispatch => {
    return client.product.fetch(id).then((product) => {
      // console.log(product);
      return dispatch(setActiveProduct(product))
    })
  }
}

// FETCH BY QUERY
// const query = {
//   query: 'updated_at:>="2016-09-25T21:31:33"',
//   sortBy: 'title'
// };
//
// client.product.fetchQuery(query).then((products) => {
//   console.log(products); // An array of products updated after 2016-09-25T21:31:33
//                          // and sorted in ascending order by title.
// });

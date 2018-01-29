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
    products: payload.products
  }
}

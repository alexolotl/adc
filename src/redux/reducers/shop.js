import {REQUEST_CLIENT, RECEIVE_CLIENT, SET_ACTIVE_PRODUCT, SET_CHECKOUT, GET_ALL_PRODUCTS, SET_SHOP, GET_COLLECTIONS, SET_COLLECTION} from 'redux/actions/shop'

let initialState = {
  isFetching: false,
  isCartOpen: false,
  checkout: { lineItems: [] },
  products: [],
  collections: null,
  activeCollection: null,
  shop: {},
  activeProduct: null
}

const shop = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHECKOUT:
      return Object.assign({}, state, {
        checkout: action.payload
      })
    case GET_ALL_PRODUCTS:
      return Object.assign({}, state, {
        products: action.payload
      })
    case SET_ACTIVE_PRODUCT:
      return Object.assign({}, state, {
        activeProduct: action.payload
      })
    case SET_SHOP:
      return Object.assign({}, state, {
        products: action.payload
      })
    case GET_COLLECTIONS:
      return Object.assign({}, state, {
        collections: action.payload
      })
    case SET_COLLECTION:
      return Object.assign({}, state, {
        products: action.products,
        activeCollection: action.activeCollection
      })
    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      }
    default:
      return state
  }
}

export default shop

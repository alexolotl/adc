import {TOGGLE_CART, UPDATE_CHECKOUT} from 'redux/actions/cart'

let initialState = {
  isCartOpen: false,
  checkout: {lineItems: []}
}

const client = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CART:
      return Object.assign({}, state, {
        isCartOpen: action.payload
      })
    case UPDATE_CHECKOUT:
      return Object.assign({}, state, {
        checkout: action.payload
      })
    default:
      return state
  }
}

export default client

export const TOGGLE_CART = 'TOGGLE_CART'
export function toggleCart(bool) {
  return {
    type: TOGGLE_CART,
    payload: bool
  }
}

export const UPDATE_CHECKOUT = 'UPDATE_CHECKOUT'
export function updateCheckout(payload) {
  return {
    type: UPDATE_CHECKOUT,
    payload
  }
}

export function addVariantToCart(variantId, quantity, client, checkoutId) {
  return (dispatch) => {
    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]

    return client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
        dispatch(updateCheckout(res))
    });
  }
}

// the following 2 are not used yet

export function updateQuantityInCart(lineItemId, quantity, client, checkoutId) {
  return function(dispatch) {
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      return dispatch(updateCheckout(res))
    });
  }
}

export function removeLineItemFromCart(lineItemId, client, checkoutId) {
  return function(dispatch) {
    return client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      dispatch(updateCheckout(res))
    });
  }
}

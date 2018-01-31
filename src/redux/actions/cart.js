export const TOGGLE_CART = 'TOGGLE_CART'
export function toggleCart() {
  return {
    type: TOGGLE_CART
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

export function updateQuantityInCart(lineItemId, client, checkoutId) {
  const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

  return client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
    dispatch(updateCheckout(res))
  });
}

export function removeLineItemInCart(lineItemId, client, checkoutId) {
  return client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
    dispatch(updateCheckout(res))
  });
}

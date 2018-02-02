import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as cartActions from 'redux/actions/cart'
import LineItem from 'components/LineItem'
import styled from 'styled-components'

const CheckoutWrapper = styled.div`
  position: fixed;
  width: 300px;
  height: 500px;
  border: 2px solid black;
  background-color: white;

`

class Checkout extends Component {
  render() {
    let line_items = this.props.checkout.lineItems.map((line_item) => {
      return (
        <div key={line_item.id.toString()}>
          <div>Name: {line_item.title}</div>
          <div>Variant: {line_item.variant.title}</div>
          <div>Quantity: {line_item.quantity}</div>
          <div onClick={() => this.props.removeLineItemFromCart(line_item.id, this.props.client, this.props.checkout.id)}>Remove</div>
          <div onClick={() => this.props.updateQuantityInCart(line_item.id, line_item.quantity + 1, this.props.client, this.props.checkout.id)}>+</div>
          <div onClick={() => this.props.updateQuantityInCart(line_item.id, Math.max(0, line_item.quantity - 1), this.props.client, this.props.checkout.id)}>-</div>
        </div>
      );
    });

    return (
      <CheckoutWrapper>
          <header>
            <h2>Your cart</h2>
            <button
              onClick={this.props.handleCartClose}
              >
              ×
            </button>
          </header>
          <ul>
            {line_items}
          </ul>
          <footer>
            <div>
              <div>Subtotal</div>
              <div>
                <span>${this.props.checkout.subtotalPrice}</span>
              </div>
            </div>
            <div>
              <div>Taxes</div>
              <div>
                <span>$ {this.props.checkout.totalTax}</span>
              </div>
            </div>
            <div>
              <div>Total</div>
              <div>
                <span>$ {this.props.checkout.totalPrice}</span>
              </div>
            </div>
            <button onClick={this.openCheckout}>Checkout</button>
          </footer>
      </CheckoutWrapper>
    );
  }
}

export default withRouter(connect(
  state => ({
    checkout: state.cart.checkout,
    client: state.client.client
  }),
  dispatch => ({
    updateQuantityInCart: (li_id, qty, client, checkout_id) => dispatch(cartActions.updateQuantityInCart(li_id, qty, client, checkout_id)),
    removeLineItemFromCart: (li_id, client, checkout_id) => dispatch(cartActions.removeLineItemFromCart(li_id, client, checkout_id)),
  })
)(Checkout))

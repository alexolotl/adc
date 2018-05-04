import React, {Component} from 'react';
import LineItem from 'components/LineItem';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as cartActions from 'redux/actions/cart'

class Cart extends Component {
  constructor(props) {
    super(props);

    this.openCheckout = this.openCheckout.bind(this);
  }

  openCheckout() {
    window.open(this.props.checkout.webUrl);
  }

  render() {
    let line_items = this.props.checkout.lineItems.map((line_item) => {
      return (
        <LineItem
          updateQuantityInCart={() => this.props.updateQuantityInCart(line_item.id, 1, this.props.client, this.props.checkout.id)}
          removeLineItemInCart={() => this.props.removeLineItemFromCart(line_item.id, this.props.client, this.props.checkout.id)}
          key={line_item.id.toString()}
          line_item={line_item}
        />
      );
    });

    return (
      <div className={`Cart ${true ? 'Cart--open' : ''}`}>
        <header className="Cart__header">
          <h2>Your cart</h2>
          <button
            onClick={this.props.closeCart}
            className="Cart__close">
            ×
          </button>
        </header>
        <ul className="Cart__line-items">
          {line_items}
        </ul>
        <footer className="Cart__footer">
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Subtotal</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {this.props.checkout.subtotalPrice}</span>
            </div>
          </div>
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Taxes</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {this.props.checkout.totalTax}</span>
            </div>
          </div>
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Total</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {this.props.checkout.totalPrice}</span>
            </div>
          </div>
          <button className="Cart__checkout button" onClick={this.openCheckout}>Checkout</button>
        </footer>
      </div>
    )
  }
}

export default withRouter(connect(
  state => ({
    checkout: state.cart.checkout,
    client: state.client.client
  }),
  dispatch => ({
    closeCart: () => dispatch(cartActions.toggleCart(false)),
    updateQuantityInCart: (li_id, qty, client, checkout) => dispatch(cartActions.updateQuantityInCart(li_id, qty, client, checkout)),
    removeLineItemFromCart: (lineItemId, client, checkoutId) => dispatch(cartActions.removeLineItemFromCart(lineItemId, client, checkoutId))
  })
)(Cart))

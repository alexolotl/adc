import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as cartActions from 'redux/actions/cart'
import LineItem from 'components/LineItem'
import styled from 'styled-components'
import {P, H4} from 'components/styledComponents/Typography'
import {FlexRow} from 'globalStyles'

const CheckoutWrapper = styled.div`
  position: fixed;
  min-height: calc(100vh - 80px);
  width: 900px;
  left: 40px;
  top: 40px;
  border: 2px solid black;
  box-sizing: border-box;
  background-color: white;
  padding: 30px;
`

const FlexRowCenter = FlexRow.extend`
  justify-content: center;
`

const FlexRowRight = FlexRow.extend`
  justify-content: flex-end;
`

const Box = P.extend`
    border: 1px solid black;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    display: flex;
    flex-flow: row nowrap;

    justify-content: center;
    align-items: center;

    cursor: pointer;
`

class Checkout extends Component {

  renderLineItems = () => {
    return (
      this.props.checkout.lineItems.map((line_item) => {
        return (
          <div key={line_item.id.toString()}>
            <FlexRow style={{justifyContent: 'space-around', borderBottom: '1px solid black'}}>
              <H4>{line_item.title}</H4>
              <P>/</P>
              <P>{line_item.variant.title}</P>
              <P>/</P>
              <P>${line_item.variant.price}</P>
              <P>/</P>
              <P>Qty: {line_item.quantity}</P>
              <div style={{display: 'inherit'}}>
                <P style={{marginRight: 20}} onClick={() => this.props.updateQuantityInCart(line_item.id, Math.max(0, line_item.quantity - 1), this.props.client, this.props.checkout.id)}>–</P>
                <P onClick={() => this.props.updateQuantityInCart(line_item.id, line_item.quantity + 1, this.props.client, this.props.checkout.id)}>+</P>
              </div>
              <Box style={{color: 'red' }} onClick={() => this.props.removeLineItemFromCart(line_item.id, this.props.client, this.props.checkout.id)}>×</Box>
            </FlexRow>
          </div>
        );
      })
    )
  }
  renderContent = () => {
    return (
      <div>
        <ul>
          {this.renderLineItems()}
        </ul>
        <FlexRowRight>
          <P>Subtotal: ${this.props.checkout.subtotalPrice}</P>
        </FlexRowRight>
        <FlexRowRight>
          <P>Taxes: ${this.props.checkout.totalTax}</P>
        </FlexRowRight>
        <FlexRowRight>
          <P style={{fontWeight: 800}}>Total: ${this.props.checkout.totalPrice}</P>
        </FlexRowRight>
      </div>
    )
  }

  render() {
    return (
      <CheckoutWrapper>
          <FlexRow>
            <h2>Your cart</h2>
            <H4 onClick={this.props.closeCart}>×</H4>
          </FlexRow>
          {this.props.checkout.lineItems.length == 0 ? <div>Your cart is empty!</div> : this.renderContent()}
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
    closeCart: () => dispatch(cartActions.toggleCart(false))
  })
)(Checkout))

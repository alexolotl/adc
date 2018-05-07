import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as cartActions from 'redux/actions/cart'
import * as uiActions from 'redux/actions/ui'
import styled from 'styled-components'
import {P, H4} from 'components/styledComponents/Typography'
import {FlexRow} from 'globalStyles'

const CheckoutWrapper = styled.div`
  // max-width: calc(100vw - 160px);
  // min-width: 400px;
  width: 600px;
  margin: 0 auto;
  margin-top: 80px;
  background-color: white;
  border: 2px solid black;
  height: calc(100vh - 280px);
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  padding: 20px;

  > div {
    width: 100%;
    > div {
      width: 100%;
    }
  }
`

const FlexRowCenter = FlexRow.extend`
  justify-content: center;
`

const FlexRowRight = FlexRow.extend`
  justify-content: flex-end;
`

const Box = P.extend`
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;

    font-size: 2em;

    justify-content: center;
    align-items: center;

    cursor: pointer;
`

const LineItem = FlexRow.extend`
  width: 100% !important;
  max-width: 600px;
  justify-content: space-around;

`

class Checkout extends Component {

  componentDidMount() {
    this.props.setBkgText('CART ')
  }
  renderLineItems = () => {
    return (
      this.props.checkout.lineItems.map((line_item) => {
        return (
          <div key={line_item.id.toString()}>
            <FlexRow style={{justifyContent: 'space-between', borderBottom: '1px solid black'}}>
              <LineItem style={{width: 'auto'}}>
                <H4>{line_item.title }</H4>
                <P>| </P>
                <P>${line_item.variant.price}</P>
                <P>| </P>
                <Box onClick={() => this.props.removeLineItemFromCart(line_item.id, this.props.client, this.props.checkout.id)}>×</Box>
              </LineItem>
              {
                // <P>/</P>
                // <P>Qty: {line_item.quantity}</P>
                // <div style={{display: 'inherit'}}>
                //   <P style={{marginRight: 20}} onClick={() => this.props.updateQuantityInCart(line_item.id, Math.max(0, line_item.quantity - 1), this.props.client, this.props.checkout.id)}>–</P>
                //   <P onClick={() => this.props.updateQuantityInCart(line_item.id, line_item.quantity + 1, this.props.client, this.props.checkout.id)}>+</P>
                // </div>
              }

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
            {this.props.checkout.lineItems.length == 0 ? <div>Your cart is empty!</div> : this.renderContent()}
          </FlexRow>
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
    closeCart: () => dispatch(cartActions.toggleCart(false)),
    setBkgText: txt => dispatch(uiActions.setBkgText(txt))
  })
)(Checkout))

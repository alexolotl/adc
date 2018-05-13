import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as cartActions from 'redux/actions/cart'
import * as uiActions from 'redux/actions/ui'
import styled from 'styled-components'
import {P, H4} from 'components/styledComponents/Typography'
import {FlexRow, FlexCol} from 'globalStyles'

const Wrapper = FlexCol.extend`
  height: calc(100vh - 80px);
  width: 100%;
  position: fixed;
  top: 80px;
  left: 0;
  // justify-content: flex-start;
  background-color: white;
  z-index: 5;

  @media (max-width: 700px) {

  }
`

const LineItems = styled.div`
  width: 600px;

  margin: 0 20px 40px 20px;

  @media (max-width: 700px) {
    width: calc(100% - 40px);
  }
`

const LineItem = FlexRow.extend`
  width: calc(100%-40px);
  box-sizing: border-box;
  border-bottom: 2px solid black;
  min-height: 80px;
  padding-top: 10px;
  padding-bottom: 10px;

  &:first-child {
    border-top: 2px solid black;
  }

  > img {
    max-width: 50px;
  }

  h4 {
    text-align: left;
    max-width: 250px;
    overflow: ellipsis;
    text-transform: uppercase;

    p {
      font-size: .5em;
    }
  }

  > div {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    flex: 1 1 50%;

    > * {
      width: 75px;
      // border: 1px solid black;
      margin-left: 20px;
      font-size: 1.25em;
      text-align: right;

      &:last-child {
        width: 25px;
      }
    }

  }
  @media (max-width: 700px) {
    flex-flow: row wrap;
  }
`

const Totals=FlexCol.extend`
  height: auto;
  align-items: flex-end;
  width: 600px;
  margin: 0 20px 40px 20px;

  p {
    margin-bottom: 5px;
  }

  @media (max-width: 700px) {
    width: calc(100% - 40px);
  }
`

const Button = styled.div`
  padding: 10px;
  border: 2px solid black;
  box-sizing: border-box;
  cursor: pointer;
  margin: 0px 20px 20px 20px;

  width: calc(100% - 40px);
  max-width: 400px;

  background-color: white;

  text-align:center;
  font-size: 1.75em;
  font-weight: bold;
  letter-spacing: .2em;

  :hover {
    background-color: black;//#aa72ff;
    color: white;
  }

  @media (max-width: 700px) {
    margin: 0px 20px 20px 20px;
  }
`

class Checkout extends Component {
  constructor(props){
    super(props)
    console.log(props);
  }
  componentDidMount() {
    this.props.setBkgText('CART ')
  }
  renderLineItems = () => {
    return (
      this.props.checkout.lineItems.map((line_item) => {
        return (
          <LineItem key={line_item.id.toString()}>
              <img src={line_item.variant.image.src} style={{width: 40, marginRight: 20}} />
              <H4>
                {line_item.title }
                {
                  line_item.variant.selectedOptions && line_item.variant.selectedOptions.map(opt => (
                    opt.value != 'Default Title' && <p>{opt.value} </p>
                  ))
                }
              </H4>

              <div>
              {
                <p>Qty: {line_item.quantity}</p>
                // <p>+</p>
                // <p>-</p>
              }


                <p>${line_item.variant.price}</p>
                <p onClick={() => this.props.removeLineItemFromCart(line_item.id, this.props.client, this.props.checkout.id)}
                  style={{cursor: 'pointer'}}
                >×</p>
              </div>
              {
                // <P>/</P>
                // <P>Qty: {line_item.quantity}</P>
                // <div style={{display: 'inherit'}}>
                //   <P style={{marginRight: 20}} onClick={() => this.props.updateQuantityInCart(line_item.id, Math.max(0, line_item.quantity - 1), this.props.client, this.props.checkout.id)}>–</P>
                //   <P onClick={() => this.props.updateQuantityInCart(line_item.id, line_item.quantity + 1, this.props.client, this.props.checkout.id)}>+</P>
                // </div>
              }
          </LineItem>
        );
      })
    )
  }
  render() {
    if (this.props.checkout.lineItems.length == 0) {
      return (
        <Wrapper>
          <h2>YOUR CART IS EMPTY</h2>
          <br />
          <Link to="/shop"><Button>SHOP</Button></Link>
        </Wrapper>
      )
    }
    else return (
        <Wrapper>
          <LineItems>
            {this.renderLineItems()}
          </LineItems>
          <Totals>
            <P>Subtotal: {this.props.checkout.subtotalPrice + ' ' + this.props.checkout.currencyCode}</P>
            <P>Taxes: {this.props.checkout.totalTax + ' ' + this.props.checkout.currencyCode}</P>
            <P style={{fontWeight: 800}}>Total: {this.props.checkout.totalPrice + ' ' + this.props.checkout.currencyCode}</P>
          </Totals>
          <Button>CHECKOUT</Button>
        </Wrapper>
      )
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

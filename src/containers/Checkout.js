import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as cartActions from 'redux/actions/cart'
import * as uiActions from 'redux/actions/ui'
import * as utils from 'utils/factory'
import styled from 'styled-components'
import {P, H4} from 'components/styledComponents/Typography'
import {FlexRow, FlexCol} from 'globalStyles'

const Wrapper = FlexCol.extend`
  // height: calc(100vh - 60px);
  height: auto;
  min-height: calc(100vh - 60px);
  box-sizing: border-box;
  width: 100%;
  // position: fixed;
  top: 60px;
  // left: 0;
  // justify-content: flex-start;
  background-color: white;
  z-index: 5;
  overflow-y: scroll;
  padding-top: 20px;

  @media (max-width: 700px) {
    min-height: calc(100vh - 50px);
    height: auto;
    top: 50px;
  }
`

const LineItems = styled.div`
  width: 600px;

  margin: 0 20px 40px 20px;
  box-sizing: border-box;
  height: auto;

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
    width: 250px;
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
      width: 150px;
      // border: 1px solid black;
      margin-left: 20px;
      font-size: 1.25em;
      text-align: right;

      &:last-child {
        width: 25px;
        font-size: 2em;
      }
    }

  }
  @media (max-width: 700px) {
    flex-flow: row wrap;
    // justify-content: space-between;
    h4 {
      text-align: right;
    }
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
  max-width: 600px;

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
    font-size: 1em;
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

  openCheckout = () => {
    window.open(this.props.checkout.webUrl);
  }

  renderLineItems = () => {
    return (
      this.props.checkout.lineItems.map((line_item) => {
        return (
          <LineItem key={line_item.id.toString()}>
              <img src={utils.resizeImgForShopify(line_item.variant.image.src, 'medium')} style={{width: 40, marginRight: 20}} />
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
                // <p>Qty: {line_item.quantity}</p>
                // <p>+</p>
                // <p>-</p>
              }


                <p>{line_item.variant.price} {this.props.checkout.currencyCode}</p>
                <p onClick={() => this.props.removeLineItemFromCart(line_item.id, this.props.checkout.id)}
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
            <P>Taxes: {this.props.checkout.totalTax + ' ' + this.props.checkout.currencyCode}</P>
            <P>Shipping: TBD</P>
            <P style={{fontWeight: 800}}>Subtotal: {this.props.checkout.subtotalPrice + ' ' + this.props.checkout.currencyCode}</P>
          </Totals>
          <Button onClick={this.openCheckout}>PROCEED TO CHECKOUT</Button>
        </Wrapper>
      )
    }
}

export default withRouter(connect(
  state => ({
    checkout: state.cart.checkout
    // client: state.client.client
  }),
  dispatch => ({
    updateQuantityInCart: (li_id, qty, checkout_id) => dispatch(cartActions.updateQuantityInCart(li_id, qty, checkout_id)),
    removeLineItemFromCart: (li_id, checkout_id) => dispatch(cartActions.removeLineItemFromCart(li_id, checkout_id)),
    closeCart: () => dispatch(cartActions.toggleCart(false)),
    setBkgText: txt => dispatch(uiActions.setBkgText(txt))
  })
)(Checkout))

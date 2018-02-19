import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import {FlexRow, FlexCol} from 'globalStyles'

import * as cartActions from 'redux/actions/cart'

const ProductPage = FlexRow.extend`
`

const ImgContainer = styled.div`
  height: 100%;
  flex: 1 0 50%;
  height: calc(100vh - 180px);
`
const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`
const Details = styled.div`
  height: 100%;
  padding: 40px;

  flex: 1 0 50%;
  box-sizing: border-box;

    height: calc(100vh - 180px);
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
`
const Variant = styled.li`
  border: 1px solid black;
  background-color: ${props => props.active ? 'lavender' : 'white'};
  cursor: pointer;
  margin: 5px;

`

const Button = styled.div`
  padding: 20px;
  border: 2px solid black;
  box-sizing: border-box;
  pointer-events: ${props => props.active ? 'auto' : 'none'};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.active ? 'yellow' : 'transparent'};

      transition: all .25s;
  }
`

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      variant: null,
      quantity: 1,
      loaded: false,
      product: {
        images: [{src: null}],
        title: '',
        variants: [],
      }
    }
  }
  componentWillReceiveProps(newProps, prevProps) {
    if (!this.state.loaded && newProps.client != prevProps.client) {
      newProps.client.product.fetch(newProps.match.params.product).then((product) => {
          this.setState({product: product, loaded: true, variant: product.variants[0]})
      })
    }
  }
  selectVariant = variant => {
    this.setState({variant: variant})
  }
  renderVariants = variants => {
    return (
      <ul style={{display: 'flex', flexFlow: 'row nowrap', width: '100%'}}>
      {
        variants.map((variant, i) => (
          <Variant active={this.state.variant.id === variant.id} key={i} onClick={() => this.selectVariant(variant)}>{variant.title}</Variant>
        ))
      }
      </ul>
    )
  }
  render() {
    return (
      <ProductPage>
        <ImgContainer>
          <Img src={this.state.product.images[0].src} />
        </ImgContainer>
        <Details>
          <div>
            <h1>{this.state.product.title}</h1>
            <h2>{this.state.variant && this.state.variant.price}</h2>
            {
              this.renderVariants(this.state.product.variants)
            }
            <p>Quantity:</p>
            <div onClick={() => this.setState({quantity: Math.max(0, this.state.quantity - 1)})}>-</div>
            <p>{this.state.quantity}</p>
            <div onClick={() => this.setState({quantity: this.state.quantity + 1})}>+</div>
            <p>{this.state.product.description}</p>
            <Button active={this.state.variant} onClick={() => {this.props.addVariantToCart(this.state.variant.id, this.state.quantity, this.props.client, this.props.checkout.id); this.setState({added: true})}}>
            {this.state.added ? 'Added !' : 'ADD TO CART'}
            </Button>
          </div>
        </Details>
      </ProductPage>
    );
  }
}

export default withRouter(connect(
  state => ({
    client: state.client.client,
    checkout: state.cart.checkout
  }),
  dispatch => ({
    addVariantToCart: (variantId, quantity, client, checkoutId) => dispatch(cartActions.addVariantToCart(variantId, quantity, client, checkoutId)),
  })
)(Product))

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import * as cartActions from 'redux/actions/cart'

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
      <ul>
      {
        variants.map((variant, i) => (
          <li key={i} onClick={() => this.selectVariant(variant)}>{variant.title + " " + variant.price}</li>
        ))
      }
      </ul>
    )
  }
  render() {
    return (
      <div>
        <img style={{maxHeight: 600}} src={this.state.product.images[0].src} />
        <h1>{this.state.product.title}</h1>
        {
          this.renderVariants(this.state.product.variants)
        }
        <p>{this.state.product.description}</p>
        <button onClick={() => {this.props.addVariantToCart(this.state.variant.id, this.state.quantity, this.props.client, this.props.checkout.id)}}>ADD TO CART</button>
      </div>
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

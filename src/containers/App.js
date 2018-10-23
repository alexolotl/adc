import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'

import logo from '../assets/logo.svg';
import Header from 'components/Header'
import Main from 'containers/Main'
import Checkout from 'containers/Checkout'
import './App.css';
import Client, {Config, ShopResource} from 'shopify-buy';
import * as cartActions from 'redux/actions/cart'
import * as shopActions from 'redux/actions/shop'

import {client} from 'components/initializeClient'
//

class App extends Component {
  componentWillMount() {
    // CHECKOUT

    const checkoutId = localStorage.getItem('checkoutId')

    if (checkoutId) {
      client.checkout.fetch(checkoutId).then((checkout) => {
        if (checkout.completedAt != null) {
          this.createCheckout()
        }
        else {
          this.props.updateCheckout(checkout)
        }
      }).catch(error => {
        console.log(error);
        this.createCheckout()
      });
    }
    else {
      this.createCheckout()
    }

    // PRODUCTS
    client.product.fetchAll().then((products) => {
      this.props.getAllProducts(products)
    });

    // COLLECTION
    // client.collection.fetchAllWithProducts().then((collections) => {
    //   const filteredCollections = collections.filter(coll => coll.products.length > 0)
    //   dispatch(shopActions.getCollections(filteredCollections))
    // });

    // client.fetchShopInfo().then((res) => {
    //   dispatch(shopActions.setShop(res))
    // });
  }
  createCheckout = () => {
    client.checkout.create().then((checkout) => {
      localStorage.setItem('checkoutId', checkout.id)
      this.props.updateCheckout(checkout)
    });
  }
  render() {
    return (
      <div className="App">
        {this.props.location.pathname != '/' && <Header />}
        {this.props.isCartOpen && <Checkout />}
        <Main />
      </div>
    );
  }
}

export default withRouter(connect(
    state => ({
      isCartOpen: state.cart.isCartOpen
    }),
    dispatch => ({
      updateCheckout: checkout => dispatch(cartActions.updateCheckout(checkout)),
      getAllProducts: prods => dispatch(shopActions.getAllProducts(prods))
      // initializeClient: config => dispatch(initializeClient(config)),
    })
)(App))

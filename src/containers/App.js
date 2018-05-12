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
import {initializeClient} from 'redux/actions/client'
import * as cartActions from 'redux/actions/cart'
//

class App extends Component {
  componentWillMount() {
    const config = {
      storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',//process.env.REACT_APP_SHOPIFY_TOKEN,
      domain: 'graphql.myshopify.com'//'antes-de-cristo.myshopify.com',
    }

    this.props.initializeClient(config)
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
      initializeClient: config => dispatch(initializeClient(config)),
    })
)(App))

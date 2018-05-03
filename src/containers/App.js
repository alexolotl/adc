import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'

import logo from '../assets/logo.svg';
import Header from 'components/Header'
import Main from 'containers/Main'
import Checkout from 'containers/Checkout'
import './App.css';
import Client, {Config} from 'shopify-buy';
import {initializeClient} from 'redux/actions/client'
import * as cartActions from 'redux/actions/cart'
//

class App extends Component {
  componentWillMount() {
    const config = {
      storefrontAccessToken: 'e5a76ac70a831a4593947382c48babc5',
      domain: 'antes-de-cristo.myshopify.com',
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

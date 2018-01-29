import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import logo from '../assets/logo.svg';
import Header from 'components/Header'
import Main from 'containers/Main'
import './App.css';
import Client, {Config} from 'shopify-buy';
import {fetchClient} from 'redux/actions/client'
//

class App extends Component {
  componentDidMount() {
    const config = {
      storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
      domain: 'graphql.myshopify.com',
    }

    this.props.fetchClient(config)
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchClient: config => dispatch(fetchClient(config))
  }
}

export default connect(
    null,
    mapDispatchToProps
)(App)

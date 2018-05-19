import React, { Component } from 'react';
import ThreeWindow from 'components/ThreeWindow/ThreeWindow'
import styled, {keyframes} from 'styled-components'
import { Switch, Route, withRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import Product from 'components/Product'
import ProductsList from 'containers/ProductsList'

const Container = styled.div`
  max-width: 100vw;
  overflow-x: hidden;
`

class Shop extends Component {
  render() {
    return (
      <Container>
      
        <Route exact path={'/shop'} component={ProductsList}/>
        <Route exact path={'/shop/:product'} component={Product}/>
      </Container>
    );
  }
}

export default withRouter(connect(
  state => ({
    backgroundModeShader: state.ui.backgroundModeShader
  })
)(Shop))

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

export default class Shop extends Component {
  render() {
    return (
      <Container>
      {
          // <ThreeWindow />
      }
        <Route exact path={'/shop'} component={ProductsList}/>
        <Route exact path={'/shop/:product'} component={Product}/>
      </Container>
    );
  }
}

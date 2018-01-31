import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import ProductCard from 'components/ProductCard'
import Filters from 'components/Filters'
import {Button} from 'components/styledComponents/Button'
import {H1} from 'components/styledComponents/Typography'
import data from 'data/sampledata.json'
import styled from 'styled-components'

const ProductsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

class Shop extends Component {
  renderProducts(products) {
    return (
      products.map((product, i) => (
        <ProductCard key={product.handle} product={product} />
      ))
    )
  }
  render() {

    const {params} = this.props.match
// BAD ! I'm passing large store variables to an action creator manually
    return (
      <div>
        <Filters collections={this.props.collections} />
        <ProductsWrapper>
            {this.renderProducts(this.props.products)}
        </ProductsWrapper>
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    products: state.shop.products,
    collections: state.shop.collections,
  })
)(Shop))

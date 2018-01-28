import React, { Component } from 'react';
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

export default class Shop extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {products: []}
  }
  componentDidMount() {
    // this.setState({products: this.props.products})
  }
  renderProducts(products) {
    return (
      products.map(product => (
        <ProductCard product={product} />
      ))
    )
  }
  render() {

    const {params} = this.props.match

    return (
      <div>
        <Filters />
        <ProductsWrapper>
            {this.renderProducts(this.props.products)}
        </ProductsWrapper>
      </div>
    );
  }
}

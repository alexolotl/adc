import React, { Component } from 'react';
import data from 'data/sampledata.json'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {variants: [], images: []},
      size: null
    }
  }
  componentDidMount() {
    const product = data.products.find(elem => {
      return elem.slug == this.props.match.params.product
    })
    this.setState({product: product})
  }
  selectSize = size => {
    this.setState({size: size})
  }
  renderVariants = variants => {
    return (
      <ul>
      {
        variants.map(variant => (
          <li onClick={() => this.selectSize(variant)}>{variant}</li>
        ))
      }
      </ul>
    )
  }
  render() {
    return (
      <div>
        <img src={this.state.product.images[0]} />
        <h1>{this.state.product.name}</h1>
        <p>{this.state.product.price}</p>
        {this.renderVariants(this.state.product.variants)}
        <p>{this.state.product.description}</p>
      </div>
    );
  }
}

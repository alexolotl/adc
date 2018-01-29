import React, { Component } from 'react';
import {connect} from 'react-redux';

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      product: {
        images: [{src: null}],
        title: null,
        price: null,
        description: null,
        variants: []
      }
    }
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps)
     if (!this.state.loaded) {
       newProps.client.product.fetch(this.props.match.params.product).then((product) => {
          this.setState({product: product, loaded: true})
      });
    }
  }
  selectSize = size => {
    this.setState({size: size})
  }
  renderVariants = variants => {
    return (
      <ul>
      {
        variants.map((variant, i) => (
          <li key={i} onClick={() => this.selectSize(variant)}>{variant.title}</li>
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
        <p>{this.state.product.price}</p>
        {
          this.renderVariants(this.state.product.variants)
        }
        <p>{this.state.product.description}</p>
      </div>
    );
  }
}

export default connect(
  state => ({
    client: state.client.client
  })
)(Product)

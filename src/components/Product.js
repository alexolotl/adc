import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {
        images: [{src: null}],
        variants: [{title: null}]
      }
    }
  }
  componentDidMount() {
    this.props.client.product.fetch(this.props.match.params.product).then((product) => {
        this.setState({product: product})

        console.log(this.state)
    });
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
        <img src={this.state.product.images[0].src} />
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

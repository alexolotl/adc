import React, { Component } from 'react';

export default class Product extends Component {
  render() {

    const {params} = this.props.match

    return (
      <div className="Product">
          <p>Product: {params.product}</p>
      </div>
    );
  }
}

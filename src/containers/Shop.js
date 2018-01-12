import React, { Component } from 'react';

export default class Shop extends Component {
  render() {

    const {params} = this.props.match

    return (
      <div className="Shop">
          <p>Shop</p>
      </div>
    );
  }
}

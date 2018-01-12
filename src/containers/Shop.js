import React, { Component } from 'react';
import {Button} from 'components/styledComponents/Button'

export default class Shop extends Component {
  render() {

    const {params} = this.props.match

    return (
      <div className="Shop">
          <p>Shop</p>
          <Button>One Button</Button>
          <Button primary>Primary Button</Button>
      </div>
    );
  }
}

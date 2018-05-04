import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import styled from 'styled-components'

const Text = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  h1 {
    font-size: 10em;
    line-height: 1;
    margin: 0;
    z-index: 5;

    cursor: pointer;

    :hover {
      unicode-bidi:bidi-override;
      direction:rtl;
    }
  }
`

const Img = styled.img`
  z-index: -5;
  position: absolute;
  // top: -1800px;
  // left: -1800px;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
`



class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeImage: null,
      int: 0
    }
  }
  componentDidMount() {
    // this.interval = setInterval(() => {
    //   const idx = 0
    //   this.setState({
    //     int: this.state.int++,
    //     activeImage: this.props.products ? this.props.products[idx].images[0].src : null
    //   })
    // }, 2000)
  }
  componentDidUpdate(oldProps) {
    // if (oldProps.products != this.props.products) {
    //   this.setState({
    //     activeImage: this.props.products[0].images[0].src
    //   })
    // }
  }
  componentWillUnnount() {
    clearInterval(this.interval)
  }
  render() {
    return (
      <div>
        <Text>
          <Link to={'/shop'}>
            <h1>Antes</h1><h1>de</h1><h1>Cristo</h1>
          </Link>
        </Text>
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    products: state.shop.products
  })
)(Home))

import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import ThreeWindow from 'components/ThreeWindow/ThreeWindow'

import styled from 'styled-components'

const Container = styled.div`
  border: 20px solid white;
  box-sizing: border-box;
  video {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -1 !important;
    top: 0;
    left: 0;
    object-fit: cover;

  }
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`

const Text = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  // width: 30vw;
  // height: 30vw;
  padding: 30px 80px;
  background-color: white;
  z-index: 1;

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

    @media (max-width: 700px) {
      font-size: 6em;
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
      <Container>
        <Text>
          <Link to={'/shop'}>
            <h1>antes</h1><h1>de</h1><h1>Cristo</h1>
          </Link>
        </Text>
        {
          // <video autoPlay muted>
          //   <source src={require('assets/videos/7pm.webm')} />
          // </video>
        }

      </Container>
    );
  }
}

export default withRouter(connect(
  state => ({
    products: state.shop.products
  })
)(Home))

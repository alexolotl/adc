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
    font-size: 18em;
    color: white;
    line-height: 1;
    margin: 0;
  }
`


export default class Home extends Component {
  render() {
    const vid = require('assets/videos/7pm.webm')
    return (
      <div>
        <video
          src={vid}
          autoPlay
          loop
          style={{height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -4}}
        >
        </video>
        <Text>
          <Link to={'/shop'}>
            <h1>Antes</h1><h1>De</h1><h1>Cristo</h1>
          </Link>
        </Text>
      </div>
    );
  }
}

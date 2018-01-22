import React, { Component } from 'react';
import ThreeWindow from 'components/ThreeWindow/index'
import styled from 'styled-components'
const painting = require('assets/images/painting1.jpg')

const Img = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
`;

const H1 = styled.h1`
  color: white;
  font-size: 20em;
  font-weight: 100;
`

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default class Home extends Component {
  render() {
    return (
      <div>
        <Overlay>
          <ThreeWindow />
        </Overlay>
        <Img src={painting} alt="image" />
      </div>
    );
  }
}

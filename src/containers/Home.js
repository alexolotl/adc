import React, { Component } from 'react';
import ThreeWindow from 'components/ThreeWindow/index'
import styled from 'styled-components'
import {H2} from 'components/styledComponents/Typography'
import {FlexCol} from 'globalStyles'
const painting = require('assets/images/painting1.jpg')

const Img = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
`;

const H1 = styled.h1`
  color: darkblue;//black;
  font-family: 'Noe Display';
  font-size: 10em;
  font-weight: 100;
`

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Splash = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #ff1206;
`

export default class Home extends Component {
  render() {
    return (
      <div>
        <Splash>
          <FlexCol style={{width: '90vw', backgroundColor: 'white', border: '1px solid black'}}>
            <div style={{maxWidth: '70vw', zIndex: 3}}>
              <H1>Antes De Cristo</H1>
              <H2 style={{color: 'darkblue'}}>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.</H2>
            </div>
          </FlexCol>
        </Splash>
        <Overlay>
          <ThreeWindow />
        </Overlay>
        {/*
          <Img src={painting} alt="image" />
        */}
      </div>
    );
  }
}

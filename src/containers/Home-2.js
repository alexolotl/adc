import React, { Component } from 'react';
import ThreeWindow from 'components/ThreeWindow/ThreeWindow'
import styled, {keyframes} from 'styled-components'
import {H2} from 'components/styledComponents/Typography'
import {FlexCol, FlexRow} from 'globalStyles'
const painting = require('assets/images/painting1.jpg')
const img1 = require('assets/images/rtd1.jpg')
const img2 = require('assets/images/rtd2.jpg')
const img3 = require('assets/images/rtd3.jpg')

const Img = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
`;



const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  top: 0;
`

const Splash = FlexCol.extend`
  width: 50vw;
  position: fixed;
  overflow: scroll;
  right: 0;
  top: 0;
  justify-content: center;
  z-index: 5;
  img {
    z-index: 5;
  }
`

const H1 = styled.h1`
  color: white;// white;//black;
  font-style: italic;
  // font-family: 'Noe Display';
  font-size: 4em;
  font-weight: 100;
  // -webkit-text-stroke-width: 1px;
  //  -webkit-text-stroke-color: white;
   z-index: 10;
   text-align: left;
   justify-self: space-between;
   height: 100%;
   text-wrap: none;
   line-height: 1;
   color: white;
`

const bannerMotion = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-25%);
  }
`;

const Banner = styled.div`
  width: 200vw;
  max-height: 70px;
  overflow: hidden;
  z-index: 10;
  position: fixed;
  bottom: 0;
  text-align: left;
  animation: ${bannerMotion} 15s linear infinite;
  // background-color: #ef0232;
  background-color: blue;
`
const CenteredText= styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 15;
  position: fixed;
  top:0;
  left:0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10em;
  color: transparent;
  // -webkit-text-stroke-width: 3px;
  // -webkit-text-stroke-color: yellow;
  color: yellow;
  pointer-events: none;
  font-family: 'Noe Display';
  // background-color: yellow;


  img {
    width: 700px;
    filter: contrast(0) saturate(10000) brightness(1000);
  }
`

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      img: 'https://s3.amazonaws.com/codepen-az/rtd1.jpg'
    }
  }
  render() {

    const images = [
      'https://s3.amazonaws.com/codepen-az/rtd1.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd2.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd3.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd1.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd2.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd3.jpg'
    ]
    return (
      <div>

      <ThreeWindow img={this.state.img} />
      <Banner><H1>Antes De Cristo ✞ Antes De Cristo ✞ Antes De Cristo ✞ Antes De Cristo ✞ Antes De Cristo ✞ Antes De Cristo ✞ </H1></Banner>
      <Overlay>
      {
        images.map(i => (
          <img onClick={() => this.setState({img: i})} src={i} />
        ))
      }
      </Overlay>
      <CenteredText><img src={require('assets/images/tribal.png')} /></CenteredText>
      <Splash>
      {
        images.map(i => (
          <img onClick={() => this.setState({img: i})}
            src={i}
            style={{maxHeight: 400, objectFit: 'cover', objectPosition: '75% center', width: '100%', padding: 0}}
          />
        ))
      }
      </Splash>
        {/*

          <Img src={painting} alt="image" />
        */}
      </div>
    );
  }
}

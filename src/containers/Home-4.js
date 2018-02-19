import React, { Component } from 'react';
import styled, {keyframes} from 'styled-components'
import {H2} from 'components/styledComponents/Typography'
import {FlexCol, FlexRow} from 'globalStyles'
const painting = require('assets/images/painting1.jpg')
const img1 = require('assets/images/rtd1.jpg')
const img2 = require('assets/images/rtd2.jpg')
const img3 = require('assets/images/rtd3.jpg')


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

const Splash = FlexRow.extend`
  position: fixed;
  overflow: scroll;
  height: 100vh;
  right: 0;
  top: 0;
  justify-content: center;
  z-index: 15;
  // pointer-events: none;
  img {
    z-index: 15;
    // pointer-events: initial;
    box-sizing: border-box;
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
  // background-color: #ef0232;
  background-color: blue;
`
const CenteredText= styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 25;
  position: fixed;
  bottom: -50vh;
  left:0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8em;
  color: transparent;
  // -webkit-text-stroke-width: 3px;
  // -webkit-text-stroke-color: yellow;
  color: yellow;
  pointer-events: none;
  font-family: 'Noe Display';
  // background-color: yellow;


  img {
    width: 1200px;
    filter: contrast(0) saturate(10000) brightness(1000);
    opacity: .5;
    z-index: 25;
    pointer-events: none;
  }
`

const Brand = styled.span`
  &:hover {
    color: yellow;
    text-decoration: underline;
  }
`

const Img = styled.img`
  max-height: 50vh;
  object-fit: cover;
  object-position: 75% center;
  width: 100%;
  margin: 40px;
  box-sizing: border-box;

  border: solid 8px ${props => props.active ? 'yellow' : 'transparent'};

`

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      img: 'https://s3.amazonaws.com/codepen-az/rtd1.jpg',
      active: null
    }
  }
  render() {

    const images = [
      'https://s3.amazonaws.com/codepen-az/rtd1.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd2.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd3.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd1.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd2.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd3.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd1.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd2.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd3.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd1.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd2.jpg',
      'https://s3.amazonaws.com/codepen-az/rtd3.jpg'
    ]
    const labels = [
      'antes de cristo',
      'baby angel',
      'ready to die',
      'antes de cristo',
      'baby angel',
      'ready to die',
      'antes de cristo',
      'baby angel',
      'ready to die',
      'antes de cristo',
      'baby angel',
      'ready to die',
      'antes de cristo',
      'baby angel',
      'ready to die',
    ]
    return (
      <div>
      <Overlay>
      {
        images.map(i => (
          <img onClick={() => this.setState({img: i})} src={i} />
        ))
      }
      </Overlay>
      <CenteredText><img src={require('assets/images/tribal.png')} /></CenteredText>
      <CenteredText style={{top: '-50vh'}}><img src={require('assets/images/tribal.png')} /></CenteredText>
      <div style={{zIndex: 15, position: 'absolute'}}>
        <h1 style={{lineHeight: 1.5, fontFamily: 'sans-serif', fontSize: '8em', color: 'white', fontWeight: 800, fontStyle: 'italic'}}>
          {
            labels.map(brand => (
              <Brand>{`${brand} | `}</Brand>
            ))
          }
        </h1>
      </div>
      <Splash>
      {
        images.map((i, idx) => (
            <Img active={this.state.active == idx} onClick={() => this.setState({img: i, active: idx})}
              src={i}
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

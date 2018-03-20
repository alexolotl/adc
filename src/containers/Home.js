import React, { Component } from 'react';
import ThreeWindow from 'components/ThreeWindow/ThreeWindow'
import styled, {keyframes} from 'styled-components'
import {H2} from 'components/styledComponents/Typography'
import {FlexCol, FlexRow} from 'globalStyles'

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
  img {
    z-index: 15;
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
  font-size: 10em;
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
      img: 'https://s3.amazonaws.com/codepen-az/4E75ABD1-7990-4D36-9D04-BF3BB9D48701.jpg',
      active: null
    }
  }
  render() {

    const images = [
      'https://s3.amazonaws.com/codepen-az/4E75ABD1-7990-4D36-9D04-BF3BB9D48701.jpg',
      'https://s3.amazonaws.com/codepen-az/5A3D47D4-DE5F-4615-B0C6-EF5BDBD48C7B.jpg',
      'https://s3.amazonaws.com/codepen-az/887D160C-45A2-43EE-86EB-E33615A0A0FB.jpg',
      'https://s3.amazonaws.com/codepen-az/980F1BFE-7501-4DFF-9380-56F6631452C2.jpg',
      'https://s3.amazonaws.com/codepen-az/3956F141-BEC3-4EAB-9937-EE8C6C06D37C.jpg',
      'https://s3.amazonaws.com/codepen-az/B6CAC62C-4F4F-4FA0-A193-55FD82553BEC.jpg',
      'https://s3.amazonaws.com/codepen-az/C449C45D-0BE2-4CEE-8DDB-5532CFE8B6CA.jpg',
      'https://s3.amazonaws.com/codepen-az/D8D84297-A927-49FA-9923-1A5DF99260B2.jpg',
      'https://s3.amazonaws.com/codepen-az/E0CDBE9B-0ACD-4F55-8316-757DCB9F09A0.jpg',
      'https://s3.amazonaws.com/codepen-az/EC50288F-2E64-4EAA-89CB-C4367632D2ED.jpg',
      'https://s3.amazonaws.com/codepen-az/F303BB32-EC15-44E0-9904-41F29C279929.jpg',
      'https://s3.amazonaws.com/codepen-az/FA40DC87-CFAE-4C15-AA69-BC526081C41E.jpg',
    ]
    return (
      <div>

      <ThreeWindow img={this.state.img} />
      <Overlay>
      {
        images.map(i => (
          <img onClick={() => this.setState({img: i})} src={i} />
        ))
      }
      </Overlay>
      <div style={{zIndex: 15, position: 'absolute'}}>
        <h1 style={{lineHeight: 1.5, fontFamily: 'sans-serif', fontSize: '8em', color: 'white', fontWeight: 800, fontStyle: 'italic'}}>antes de cristo antes de cristo antes de cristo antes de cristo antes de cristo antes de cristo antes de cristo antes de cristo antes de cristo antes de cristo antes de cristo antes de cristo antes de cristo antes de cristo antes de cristo</h1>
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

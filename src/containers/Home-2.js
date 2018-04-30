import React, { Component } from 'react';
import ThreeWindow from 'components/ThreeWindow/ThreeWindow'
import styled, {keyframes} from 'styled-components'
import {H2} from 'components/styledComponents/Typography'
import {FlexCol, FlexRow} from 'globalStyles'
import Draggable, {DraggableCore} from 'react-draggable'
import { Switch, Route, withRouter, Link } from 'react-router-dom'
import * as threeActions from 'redux/actions/three'
import {connect} from 'react-redux'

const img1 = require('assets/images/lookbook/FA40DC87-CFAE-4C15-AA69-BC526081C41E.jpg')
const img2 = require('assets/images/lookbook/F303BB32-EC15-44E0-9904-41F29C279929.jpg')
const img3 = require('assets/images/lookbook/C449C45D-0BE2-4CEE-8DDB-5532CFE8B6CA.jpg')
const img4 = require('assets/images/lookbook/980F1BFE-7501-4DFF-9380-56F6631452C2.jpg')
const img5 = require('assets/images/lookbook/3956F141-BEC3-4EAB-9937-EE8C6C06D37C.jpg')
const img6 = require('assets/images/lookbook/B6CAC62C-4F4F-4FA0-A193-55FD82553BEC.jpg')
const img7 = require('assets/images/lookbook/887D160C-45A2-43EE-86EB-E33615A0A0FB.jpg')
const img8 = require('assets/images/lookbook/D8D84297-A927-49FA-9923-1A5DF99260B2.jpg')

const imgMap = [img1, img2, img3, img4, img5, img6, img7, img8]

const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 4vw;
  height: calc(100vh - 4vw - 4vw);
  overflow: hidden;
`
const Img = styled.img`
  object-fit: contain;
  box-sizing: border-box;
  z-index: 12;
  max-height: 400px;
  margin: 75px;
  margin-right: ${props => props.active ? 0 : '200px'};
  cursor: pointer;
  transition: transform .25s;

  :hover {
    transform: scale(1.04);
    transition: transform .25s;
  }

  // border: solid 8px ${props => props.active ? 'yellow' : 'transparent'};
`

const ScrollDiv = styled.div`
  // max-height: 600px;
  width: auto;
  overflow: scroll;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: calc(100vh - 4vw - 4vw);
  overflow-y: hidden;

  width: 100vw;

`

const Flex = styled.div`
  max-width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`

const X = styled.h1`
  position: absolute;
  right: 10;
  top: 10;
`

class ProductSlider extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.scrollRef.addEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    this.scrollRef && this.scrollRef.childNodes.forEach(outerNode => {
      const node = outerNode.childNodes[0]
      if (node.getBoundingClientRect().left > 0 && node.getBoundingClientRect().left < 450 && this.props.image != node.src) {
        // this.setState({img: node.src})
        this.props.setImage(node.src)
      }
    })
  }

  render() {
    return (
      <ScrollDiv innerRef={ref => this.scrollRef = ref}>
        {
          imgMap.map((img, i) => (
            <Link key={i} to={'productexample'}><Img onClick={() => this.props.setImage(img)} src={img} /></Link>
          ))
        }
      </ScrollDiv>
    )
  }
}

ProductSlider = withRouter(connect(
  state => ({
    image: state.three.image
  }),
  dispatch => ({
    setImage: (img) => dispatch(threeActions.setImage(img))
  })
)(ProductSlider))

const DetailsPanel = styled.div`
  background-color: white;
  border: 2px solid black;
  min-width: 400px;
  text-align: left;
  padding: 20px;
  margin: 40px;
  min-height: 400px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;

`

class ProductDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <FlexRow style={{justifyContent: 'space-around', maxWidth: 800, margin: '0 auto'}}>
        <Img src={this.props.image} />
        <DetailsPanel>
          <h1>Example Product</h1>
          <p>Example text example text example text example text</p>
          <h2>$28</h2>
          <h2>ADD TO CART</h2>
        </DetailsPanel>
      </FlexRow>
    )
  }
}

ProductDetail = withRouter(connect(
  state => ({
    image: state.three.image
  })
)(ProductDetail))


export default class Home extends Component {

  constructor(props) {
    super(props)
    console.log(this.props.match.url)
  }
  onImgClick = (e) => {
  }

  render() {
    return (
      <Container>
        <ThreeWindow />

        <Route exact path={'/'} component={ProductSlider}/>
        <Route exact path={'/:product'} component={ProductDetail}/>

        <Flex style={{display: 'none'}}>
        {
          //  this.state.images.map((img,i) => (
          //   <Draggable
          //     key={i}
          //     axis="both"
          //     defaultPosition={{x: 100 - 200*Math.random(2*i), y: 100 - 200*Math.random(2*i+1)}}
          //     position={null}
          //     onStart={this.handleStart}
          //     onDrag={this.handleDrag}
          //     onStop={this.handleStop}
          //   >
          //     <div onClick={() => this.setState({img: img.src})} style={{opacity: img.active ? 1 : 0, maxWidth: 300, maxHeight: 400, padding: 0, margin: 20}}>
          //       <X onClick={() => {let imgs = this.state.images; imgs[i].active = false; this.setState({images: imgs})}}>X</X>
          //       <Img src={img.src} />
          //     </div>
          //   </Draggable>
          // ))
        }
        </Flex>



      </Container>
    );
  }
}

import React, { Component } from 'react';
import ThreeWindow from 'components/ThreeWindow/ThreeWindow'
import styled, {keyframes} from 'styled-components'
import {H2} from 'components/styledComponents/Typography'
import {FlexCol, FlexRow} from 'globalStyles'
import Draggable, {DraggableCore} from 'react-draggable'
import { Switch, Route, withRouter, Link } from 'react-router-dom'
import * as threeActions from 'redux/actions/three'
import * as shopActions from 'redux/actions/shop'
import {connect} from 'react-redux'
import Product from 'components/Product'
import seedrandom from 'seedrandom'

const xIcon = require('assets/icons/close-button.svg')

const Container = styled.div`
  // width: calc(100vw - 120px);
  width: 100vw;
  margin: 0 auto;
  max-width: 100vw;
  overflow-x: hidden;

  @media (max-width: 700px) {
    width: calc(100vw - 50px);
    margin: 0 auto;
    overflow: visible;
  }
`

const Products = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
  max-width: 100vw;
  overflow: hidden;

  .react-draggable {
    flex: 0 1 auto;
    // width: 450px;
    max-width: 100vw;
    // width: 300px;

    @media (max-width: 700px) {
      transform: none !important;
    }
  }

  @media (max-width: 700px) {

  }
`

const Card = styled.div`
  position: relative;
  // width: 100%;
  height: 100%;
  margin: 40px;

  z-index: ${props => props.activeProduct ? 5 : 2};
  // width: ${props => props.random}px;
  // height: ${props => props.random}px;


  &:nth-of-type(4n+1) a {
    position: relative;
    left: -50px;
  }
  &:nth-of-type(4n+2) a {
    position: relative;
    right: -25px;
    text-align: right;
    width: 100%;
  }
  &:nth-of-type(4n) a {
    position: relative;
    text-align: center;
    width: 100%;
  }

  @media (max-width: 700px) {

    &:nth-of-type(3n) {
      position: relative;
      left: -25px;
      a {
        position: relative;
        right: -25px;
        text-align: right;
        width: 100%;
      }
    }
    &:nth-of-type(3n+1) {
      position: relative;
      width: 90%;
      a {
        position: relative;
        left: -10px;
      }
    }
    &:nth-of-type(3n+2) {
      position: relative;
      right: -25px;
      a {
        position: relative;
        left: -50px;
      }
    }

    &:nth-of-type(5n+2) {
      width: 75%;
      right: -75px;
      a {
        position: relative;
        right: -50px;
      }
    }
    &:nth-of-type(5n+4) {
      width: 85%;
      a {
        position: relative;
        right: -30px;
        text-align: right;
        width: 100%;
      }
    }

    margin: 0;
    margin-bottom: 25px;
  }
`

const Img = styled.img`
  object-fit: contain;
  // width: 100%;
  // height: 100%;

  max-width: 300px;

  pointer-events: none;



  :hover {
    // transform: scale(1.04);
    // transition: transform .25s;
  }

  @media (max-width: 700px) {
    // width: 100vw;
    width: 100%;
    object-fit: cover;
    margin: 0;
  }
`

const HoverText = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;

  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;

  &:active {
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
  }

  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-end;
  padding-bottom: 20px;
  padding-left: 20px;
  box-sizing: border-box;

  opacity: 0;

  a {
    opacity: 1;
    z-index: 5;
    cursor: pointer;

    text-transform: uppercase;
    color: white;
    font-size: 1em;
    text-align: left;

    h4 {
    }


  }

  :hover a {
    transition: all .25s;
  }

  :hover {
    background-color: rgba(0,0,0,.4);
    opacity: 1;
    transition: opacity .25s;
  }

  @media (max-width: 700px) {
    // position: relative;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 1;
    margin: 0;

    a {
      opacity: 1;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-around;
    }
  }

`

const X = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: .6;
  cursor: pointer;
  width: 20px;
  -webkit-filter: invert(100%);

  :hover {
    opacity: 1;
  }

  @media (max-width: 700px) {
    display: none;
  }
`




class ProductSlider extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeProductIdx: 0
    }
  }
  componentDidMount() {
    // this.productsRef.addEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    // this.productsRef && this.productsRef.childNodes.forEach(outerNode => {
    //   const node = outerNode.childNodes[0]
    //   if (node.getBoundingClientRect().left > 0 && node.getBoundingClientRect().left < 450 && this.props.image != node.src) {
    //     // this.setState({img: node.src})
    //     this.props.setImage(node.src)
    //   }
    // })
  }

  onHover = (src, i) => {
    console.log(src);
    this.props.setImage(src)
    this.setState({activeProductIdx: i, activeImage: src})
  }

  closeProduct = i => {
    this.productsRef && this.productsRef.childNodes[i].setAttribute('style', 'opacity: 0; pointer-events: none;')
  }
  render() {
    return (
      <div>
      <Products innerRef={ref => this.productsRef = ref}>
        {
          this.props.shop.products.map((prod, i) => (
              <Draggable
                key={i}
                axis="both"
                defaultPosition={{x: 150 - 300*Math.random(2*i), y: 150 - 300*Math.random(2*i+1)}}
                position={null}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}
              >
              <Card
                onMouseEnter={() => this.onHover(prod.images[0].src, i)}
                activeProduct={this.state.activeProductIdx == i}
                random={Math.floor(Math.seedrandom(i)*200)+200}
              >
              <Img onClick={() => {this.props.setImage(prod.images[0].src)}} src={prod.images[0].src} />

                <HoverText>
                  <X onClick={() => this.closeProduct(i)} src={xIcon}></X>
                  <Link
                    key={i}
                    to={'/shop/' + prod.handle}
                  >
                    <h4>{prod.title}</h4>
                    <h4>{prod.vendor}</h4>
                    <h4>{prod.variants[0].price}</h4>
                  </Link>
                </HoverText>
              </Card>
            </Draggable>
          ))
        }
      </Products>
      </div>
    )
  }
}

ProductSlider = withRouter(connect(
  state => ({
    image: state.three.image,
    shop: state.shop
  }),
  dispatch => ({
    setImage: (img) => dispatch(threeActions.setImage(img)),
    // setActiveProduct: prod => dispatch(shopActions.setActiveProduct(prod))
  })
)(ProductSlider))

export default class Shop extends Component {
  render() {
    return (
      <Container>
      {
          <ThreeWindow />
      }
        <Route exact path={'/shop'} component={ProductSlider}/>
        <Route exact path={'/shop/:product'} component={Product}/>
      </Container>
    );
  }
}

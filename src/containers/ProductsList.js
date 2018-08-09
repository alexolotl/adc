import React, { Component } from 'react';
import ThreeWindow from 'components/ThreeWindow/ThreeWindow'
import styled, {keyframes} from 'styled-components'
import {H2} from 'components/styledComponents/Typography'
import {FlexCol, FlexRow} from 'globalStyles'
import Draggable, {DraggableCore} from 'react-draggable'
import { Switch, Route, withRouter, Link } from 'react-router-dom'
import * as threeActions from 'redux/actions/three'
import * as shopActions from 'redux/actions/shop'
import * as uiActions from 'redux/actions/ui'
import * as utils from 'utils/factory'
import {connect} from 'react-redux'
import Product from 'components/Product'
import seedrandom from 'seedrandom'

const xIcon = require('assets/icons/close-button.svg')

const Container = FlexRow.extend`
  top: 100px;
  margin: 0 auto;
  min-height: 100vh;
  flex-flow: row wrap;
  max-width: 100vw !important;
  overflow-x: hidden;
  width: 100vw;
  box-sizing: border-box;
  overflow-y: hidden;

  .react-draggable {
  }

  @media (max-width: 700px) {
    max-width: calc(100vw - 50px);
    // width: calc(100vw - 50px);
    margin: 0 auto;

    .react-draggable {
      transform: none !important;
      position: relative;

      &:nth-of-type(3n) {
        left: 25px;
      }
      &:nth-of-type(3n + 1) {
        left: -25px;
      }
      &:nth-of-type(4n+2) {
        width: 80%;
      }
      &:nth-of-type(4n+4) {
        width: 90%;
      }

    }
  }
`
const Products = FlexRow.extend`
  // width: calc(100vw - 50px);
  width: 100vw;
  margin: 0 auto;
  height: auto;
  overflow-y: visible;
  overflow-x: visible;
  flex-flow: row wrap;
  box-sizing: border-box;
`
const Preview = styled.img`
  max-width: 350px;
  pointer-events: none;

  @media (max-width: 700px) {
    margin: 0;
    padding: 0;
    border: none;
    max-width: 100%;
    pointer-events: initial;
  }
`

const Footer = styled.div`
  font-size: 7em;
  background-color: white;
  width: 100vw;
  height: 100px;
  margin-top: 60px;
  transform: scaleY(4);
  margin-bottom: 0;

  @media (max-width: 700px) {
    margin: 0;
    padding: 0;
    border: none;
    max-width: 100%;
    pointer-events: initial;
  }
`

const PreviewContainer = styled.div`
  max-width: 350px;
  margin: 40px;
  z-index: ${props => props.active ? 10 : 1};
  // padding: 25px;
  // border: 3px solid black;
  // background-color: white;

  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;

  :active {
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
  }

  > div {
    display: none;
    img {
      width: 30px;
      position: absolute;
      right: 15px;
      top: 15px;
      cursor: pointer;
      // opacity: .5;
    }
  }

  :hover > div {
    display: block;
    img {
      :hover {
        opacity: 1;
      }
    }
  }

  @media (max-width: 700px) {
    background-color: transparent;
    margin: 0;
    padding: 0;
    border: none;
    max-width: 100%;
    margin-top: 20px;

    > div img {
      display: none;
    }
  }
`

const Button = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-end;
  max-width: calc(100% - 90px);
  left: 45px;

  display: ${props => props.active ? 'flex' : 'none'};

  p {
    background-color: white;
    padding: 10px;
    font-size: 1.5em;
    font-style: italic;
    // text-transform: uppercase;
    margin-bottom: 55px;
    border: 2px solid black;
    box-sizing: border-box;

    :hover {
      background-color: black;//#aa72ff;
      color: white;
      // border: 2px solid white;
    }
  }

  @media (max-width: 700px) {
    max-width: calc(100% - 40px);
    left: 20px;
    p {
      margin-bottom: 20px;
    }
  }
`

const MoreButton = styled.div`
  display: ${props => props.visible ? 'flex' : 'none'};
  background-color: white;
  font-size: 2em;
  width: 500px;
  height: 60px;
  margin: 0 auto;
  cursor: pointer;
  flex-flow: row nowrap;
  align-items: center;
  border: 2px solid black;
  margin: 40px auto;
  // text-transform: uppercase;
  justify-content: center;
  z-index: 10;

  margin: 25px auto;
  max-width: calc(100vw - 50px);
  box-sizing: border-box;

  :hover {
    background-color: black;//#aa72ff;
    color: white;
    // border: 2px solid white;
  }
`

class ProductsList extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      activeProductIdx: null
    }
  }

  componentDidMount() {
    this.props.setBkgText('ANTES DE CRISTO ✝\uFE0E ')
    // window.addEventListener('scroll', this.onScroll)
  }

  onHover = (src, i, title, vendor) => {
    this.props.setImage(src)
    window.innerWidth > 700 && this.setState({activeProductIdx: i, activeImage: src})
    this.props.setBkgText(title + '  ✝\uFE0E  ')
    this.props.setBkgTextStyle({color: 'black'})
  }

  onMouseOut = () => {
    this.props.setBkgTextStyle({color: null})
  }

  closeProduct = i => {
    this.productsRef && this.productsRef.childNodes[i].setAttribute('style', 'opacity: 0; pointer-events: none;')
  }

  onClick = (i, handle) => {
    if (this.state.activeProductIdx == i && window.innerWidth < 700) {
      this.props.history.push('/shop/'+handle);
    }
    else {
      this.setState({
        activeProductIdx: i
      })
    }
  }

  // onScroll = e => {
  //   console.log(window.scrollY);
  //   if (window.scrollY > 1000) {
  //     console.log('hi');
  //     this.props.fetchNextPage(this.props.shop.products, this.props.client)
  //   }
  // }

  loadMore = () => {
    this.props.fetchNextPage(this.props.shop.products)
    this.props.setBkgText('Loading... ')
  }

  render() {
    // console.log(this.props.hasNextPage);
    return (
      <Container>

        <Products innerRef={ref => this.productsRef = ref}>
        {
          this.props.shop.products.length && this.props.shop.products.map((prod, i) => {
            let image = prod.images[0].src
            image = utils.resizeImgForShopify(image, '1024x1024')
            return (
            <Draggable
              key={i}
              axis="both"
              defaultPosition={{x: 150 - 300*Math.random(2*i), y: 150 - 300*Math.random(2*i+1)}}
              position={null}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}
              disabled={window.innerWidth <= 700}
            >
              <PreviewContainer
                active={this.state.activeProductIdx == i}
                onMouseOver={() => this.onHover(prod.images[0].src, i, prod.title, prod.vendor)}
                onMouseOut={this.onMouseOut}
              >
                  <div>
                    <img src={xIcon} onClick={() => this.closeProduct(i)} />
                    <Button onClick={() => this.onClick(i, prod.handle)} active={this.state.activeProductIdx == i}>
                      <Link to={'shop/' + prod.handle}>
                          <p>{prod.title}</p>
                      </Link>
                    </Button>
                  </div>
                <Preview
                  onClick={() => this.onClick(i, prod.handle)}
                  src={image}
                  alt={prod.title}
                />
              </PreviewContainer>
            </Draggable>
          )})
        }
        </Products>
        <MoreButton visible={this.props.hasNextPage} onClick={this.loadMore}>
          {this.props.productsLoading ? 'Loading...' : 'More'}
        </MoreButton>
      </Container>
    )
  }
}

export default withRouter(connect(
  state => ({
    image: state.three.image,
    shop: state.shop,
    // client: state.client.client,
    productsLoading: state.shop.productsLoading,
    hasNextPage: state.shop.hasNextPage
  }),
  dispatch => ({
    setImage: (img) => dispatch(threeActions.setImage(img)),
    setBkgText: text => dispatch(uiActions.setBkgText(text)),
    setBkgTextStyle: style => dispatch(uiActions.setBkgTextStyle(style)),
    fetchNextPage:(prods) => dispatch(shopActions.fetchNextPage(prods))
  })
)(ProductsList))

// prod.title, vendor, variants[0].price, images[0].src, <Link
//   key={i}
//   to={'/shop/' + prod.handle}
// >

// this.props.shop.products.map((prod, i) => (

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
import {connect} from 'react-redux'
import Product from 'components/Product'
import seedrandom from 'seedrandom'

const xIcon = require('assets/icons/close-button.svg')

const Container = FlexRow.extend`
  width: calc(100vw - 50px);
  position: absolute;
  top: 100px;
  margin: 0 auto;
  min-height: 100vh;
  flex-flow: row wrap;
  max-width: 100vw;

  .react-draggable {
  }
`
const Products = FlexRow.extend`
  width: calc(100vw - 50px);
  margin: 0 auto;
  min-height: 100vh;
  flex-flow: row wrap;
`
const Preview = styled.img`
  max-width: 350px;
  pointer-events: none;
`
const PreviewContainer = styled.div`
  max-width: 350px;
  margin: 40px;
  z-index: ${props => props.active ? 10 : 1};
  padding: 25px;
  border: 3px solid black;
  background-color: white;

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
  justify-content: center;

  p {
    color: white;
    font-size: 1.5em;
    font-style: italic;
    text-transform: uppercase;
  }
`

// const Hover = FlexCol.extend`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   height: 25%;
//   font-size: 2em;
//   display: none;
// `



class ProductsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeProductIdx: 0
    }
  }

  componentDidMount() {
    this.props.setBkgText('ADC ✝ ')
  }

  onHover = (src, i, title, vendor) => {
    this.props.setImage(src)
    this.setState({activeProductIdx: i, activeImage: src})
    this.props.setBkgText(title + '  ✝  ')
    this.props.setBkgTextStyle({fontStyle: 'italic'})
  }

  closeProduct = i => {
    this.productsRef && this.productsRef.childNodes[i].setAttribute('style', 'opacity: 0; pointer-events: none;')
  }

  render() {
    return (
      <Container>
        <Products innerRef={ref => this.productsRef = ref}>
        {
          this.props.shop.products && this.props.shop.products.map((prod, i) => (
            <Draggable
              key={i}
              axis="both"
              defaultPosition={{x: 150 - 300*Math.random(2*i), y: 150 - 300*Math.random(2*i+1)}}
              position={null}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}
            >
              <PreviewContainer active={this.state.activeProductIdx == i} onMouseOver={() => this.onHover(prod.images[0].src, i, prod.title, prod.vendor)} onMouseOut={() => this.props.setBkgTextStyle({fontStyle: ''})}>
                  <div>
                    <img src={xIcon} onClick={() => this.closeProduct(i)} />
                    <Button>
                      <Link to={'shop/' + prod.handle}>
                          <p>{prod.title}</p>
                      </Link>
                    </Button>
                  </div>
                  <Link to={'shop/' + prod.handle}>
                    <Preview src={prod.images[0].src} alt={prod.title} />
                  </Link>
              </PreviewContainer>
            </Draggable>
          ))
        }
        </Products>
      </Container>
    )
  }
}

export default withRouter(connect(
  state => ({
    image: state.three.image,
    shop: state.shop
  }),
  dispatch => ({
    setImage: (img) => dispatch(threeActions.setImage(img)),
    setBkgText: text => dispatch(uiActions.setBkgText(text)),
    setBkgTextStyle: style => dispatch(uiActions.setBkgTextStyle(style))
  })
)(ProductsList))

// prod.title, vendor, variants[0].price, images[0].src, <Link
//   key={i}
//   to={'/shop/' + prod.handle}
// >

// this.props.shop.products.map((prod, i) => (

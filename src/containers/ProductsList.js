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

const Container = FlexRow.extend`
  // width: calc(100vw - 50px);
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
    > div {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 15%;
      left: 0;
      p {
        font-size: 4em;
        color: #5b00ff;
        overflow: visible;
        text-align: center;
      }
      .button {
        padding: 15px;
        height: 15px;
        background-color: white;
        border: 3px solid black;
        width: 200px;
        margin: 0 auto;
      }
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
// const Hover = FlexCol.extend`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   height: 25%;
//   font-size: 2em;
//   display: none;
// `

const BackgroundText = styled.div`
  width: 140vw;
  margin: 0 auto;
  height: 100vh;
  position: fixed;
  top: 60px;
  left: -20vw;
  z-index: 0;
  font-size: 8em;
  font-style: italic;
  text-transform: uppercase;
  pointer-events: none;
`

class ProductsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeProductIdx: 0,
      backgroundText: 'ANTES DE CRISTO  ✝  '
    }
  }

  onHover = (src, i, title, vendor) => {
    this.props.setImage(src)
    this.setState({activeProductIdx: i, activeImage: src, backgroundText: title + '  ✝  '})
  }

  closeProduct = i => {
    this.productsRef && this.productsRef.childNodes[i].setAttribute('style', 'opacity: 0; pointer-events: none;')
  }

  render() {
    const list = [...Array(100).keys()]

    return (
      <Container>
        <BackgroundText>
          {
            list.map(i => `${this.state.backgroundText}`)
          }
        </BackgroundText>
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
              <PreviewContainer active={this.state.activeProductIdx == i} onMouseOver={() => this.onHover(prod.images[0].src, i, prod.title, prod.vendor)}>
                  <div>
                    <img src={xIcon} onClick={() => this.closeProduct(i)} />
                    <div>
                      <Link to={'shop/' + prod.handle}>
                        {
                          // <p>{prod.title}</p>
                        }
                        <div class="button">CHECK ME OUT</div>
                      </Link>
                    </div>
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
    setImage: (img) => dispatch(threeActions.setImage(img))
  })
)(ProductsList))

// prod.title, vendor, variants[0].price, images[0].src, <Link
//   key={i}
//   to={'/shop/' + prod.handle}
// >

// this.props.shop.products.map((prod, i) => (

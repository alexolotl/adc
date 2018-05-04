import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components'
import { Switch, Route, withRouter, Link } from 'react-router-dom'
import * as threeActions from 'redux/actions/three'
import * as uiActions from 'redux/actions/ui'
import {connect} from 'react-redux'
import {FlexCol, FlexRow} from 'globalStyles'
import {bindActionCreators} from 'redux'

const xIcon = require('assets/icons/close-button.svg')

const Container = FlexRow.extend`
  margin: 0 auto;
  position: absolute;
  top: 0;
  flex-flow: row wrap;
  max-width: 100vw;

  .react-draggable {
  }
`
const Products = FlexRow.extend`
  margin: 0 auto;
  flex-flow: row nowrap;
`
const ArchiveImage = styled.img`
  height: 500px;
  pointer-events: none;
`
const ImgContainer = styled.div`
  flex: 1 1 25%;
  height: calc(100vh - 80px);
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

class Archive extends Component {

  componentDidMount() {
    this.props.setBkgText('ARCHIVE ')
  }
  render() {
    return (
      <Container>
        <Products innerRef={ref => this.productsRef = ref}>
        {
          this.props.shop.products && this.props.shop.products.map((prod, i) => (
              <ImgContainer key={i}>
                  <ArchiveImage src={prod.images[0].src} alt={prod.title} />
              </ImgContainer>
          ))
        }
        </Products>
      </Container>
    )
  }
}

export default withRouter(connect(
  state => ({
    shop: state.shop
  }),
  dispatch => ({
    setImage: (img) => dispatch(threeActions.setImage(img)),
    setBkgText: txt => dispatch(uiActions.setBkgText(txt))
  })
)(Archive))

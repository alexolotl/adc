import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {FlexRow} from 'globalStyles'
import {H1} from 'components/styledComponents/Typography'
import * as cartActions from 'redux/actions/cart'
import * as uiActions from 'redux/actions/ui'
import * as threeActions from 'redux/actions/three'
import Menu from 'components/Menu'
import styled from 'styled-components'
import Cart from 'containers/Checkout'

const Container = styled.div`
  max-width: 100vw;
  & * {
    z-index: 100;
  }
`

const Header = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  max-width: 100vw;



  border-bottom: 2px solid black;
  box-sizing: border-box;

  z-index: 50;
  background-color: white;

  @media (max-width: 700px) {
    height: 50px;
    max-height: 50px;
    border-bottom: 0px solid black;

    padding: 0 25px;

    transform-origin: top center;
    // transform: skew(180deg, -9deg) scaleY(1.5) translateY(20px);
    // transform: scaleY(1.5);
    // top: -2px;
  }
`
const Hamburger = styled.img`
  max-width: 30px;
  max-height: 100%;
`
const Links = FlexRow.extend`
  font-family: "UnifrakturCook";
  font-size: 3em;
  justify-content: space-between;
  max-width: 100px;
  align-items: center;
  margin-right: 20px;
  a {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    cursor: pointer !important;
  }
  a.menu {
    transform: scaleX(.8);
  }
  img {
    width: 35px;
  }

  @media (max-width: 700px) {
    max-width: 70px;
    margin-right: 0;

    img {
      width: 30px;
    }
    // display: none;
  }
`

const HeaderPlaceholder = styled.div`
  height: 60px;
  width: 100%;

  @media (max-width: 700px) {
    height: 50px;
  }
`

const Logo = styled.h1`
  font-size: 3em;
  font-style: italic;
  text-align: left;
  flex: 1 0 30%;
  margin-left: 20px;
  // height: 40px;
  font-weight: medium;
  cursor: pointer;

  a:hover {
    unicode-bidi:bidi-override;
    direction:rtl;
  }

  @media (max-width: 700px) {
    // font-size: 2em;
    font-size: 0;
    flex: 1 0 auto;
    margin: 0 !important;
    position: relative;
    text-align: left;
  }
`

const Img = styled.img`
  max-height: 30px;
  max-width: 50vw;
  cursor: pointer;

  @media (max-width: 700px) {
    max-height: 25px;
    max-width: calc(100vw - 50px - 85px);
    margin: 0 auto;
  }
`

const Footer = styled.footer`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
`

const Cross = styled.a`
  color: white;
  font-size: .9em;
  -webkit-text-stroke: 1px black;
  transform: ${props => props.rotate ? 'rotate(180deg)' : 'none'};
  @media (max-width: 700px) {
    display: block;
  }
`


class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      cart: false
    }
  }

  toggleMenu = e => {
    this.setState({menu: !this.state.menu})
  }

  onMouseEnter = e => {
    this.props.setBackgroundModeShader(!this.state.backgroundModeShader)
  }

  handleCrossClick = () => {
    // this.props.setBackgroundModeShader(!this.props.backgroundModeShader)
    // this.props.activeProduct && this.props.setImage(this.props.activeProduct.images[0].src)
  }

  handleClick = () => {
      this.props.history.push('/shop')
  }

  render() {
    return (
      <Container>
        <Header>
          <Logo onClick={this.handleClick}><Img src={require('assets/images/logo1200.png')} /></Logo>
          <Links>
            <Link to="/cart"><img src={require('assets/icons/cart-black.svg')} /></Link>
            <Cross onClick={this.toggleMenu} rotate={this.props.backgroundModeShader? 1 : 0}>✝&#xFE0E;</Cross>
          </Links>
        </Header>

        {
          this.state.cart && <Cart />
        }
        <HeaderPlaceholder />
        {
          // <Footer>
          //   <Link to='/'>Shop</Link>
          //   <Link to='/archive'>Archive</Link>
          //   <Link to='/about'>About</Link>
          //   <Link to='/cart'>Cart {this.props.checkout.quantity}</Link>
          // </Footer>
        }
        {this.state.menu && <Menu toggleMenu={this.toggleMenu} />}
      </Container>
    );
  }
}

export default withRouter(connect(
  state => ({
    checkout: state.cart.checkout,
    backgroundModeShader: state.ui.backgroundModeShader,
    activeProduct: state.shop.activeProduct
  }),
  dispatch => ({
    openCart: () => dispatch(cartActions.toggleCart(true)),
    setBackgroundModeShader: bool => dispatch(uiActions.setBackgroundModeShader(bool)),
    setImage: img => dispatch(threeActions.setImage(img))
  })
)(Nav))

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
  height: 80px;
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
    border-bottom: 0px solid black;
  }
`

const Links = FlexRow.extend`
  font-family: "UnifrakturCook";
  font-size: 3em;
  justify-content: space-between;
  max-width: 160px;
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
    width: 40px;
  }

  @media (max-width: 700px) {
    max-width: 120px;
    img {
      width: 30px;
    }
  }
`

const HeaderPlaceholder = styled.div`
  height: 80px;
  width: 100%;
`

const Logo = styled.h1`
  font-size: 3em;
  font-style: italic;
  text-align: left;
  flex: 1 0 30%;
  margin-left: 20px;
  // height: 40px;
  font-weight: medium;

  a:hover {
    unicode-bidi:bidi-override;
    direction:rtl;
  }

  @media (max-width: 700px) {
    font-size: 2em;
  }
`

const Img = styled.img`
  max-height: 40px;
  max-width: 50vw;
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

  render() {
    return (
      <Container>
        <Header>
          <Logo><Link to='/shop'><Img src={require('assets/images/logo1200.png')} /></Link></Logo>
          <Links>
            <Cross rotate={this.props.backgroundModeShader} onClick={this.handleCrossClick}>✝&#xFE0E;</Cross>
            <Link to="/cart"><img src={require('assets/icons/cart-black.svg')} /></Link>
            <a className="menu" onClick={this.toggleMenu}><img src={require('assets/icons/menu.svg')} /></a>
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

import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {FlexRow} from 'globalStyles'
import {H1} from 'components/styledComponents/Typography'
import * as cartActions from 'redux/actions/cart'
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
  max-width: 100px;
  align-items: center;
  margin-right: 20px;
  a {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    cursor: pointer !important;
  }
  img {
    width: 40px;
  }

  @media (max-width: 700px) {
    max-width: 80px;
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

  :hover a {
    unicode-bidi:bidi-override;
    direction:rtl;
  }

  @media (max-width: 700px) {
    font-size: 2em;
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
  -webkit-text-stroke: 1px black;
  :hover {
    transform: rotate(180deg);
  }
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

  render() {
    return (
      <Container>
        <Header>
          <Logo><Link to='/shop'>antes de Cristo</Link></Logo>
          <Links>


            {
            //   <Link to='/'>Shop</Link>
            // <Link to='/about'>Contact</Link>
              // <Link to='/archive'>Archive</Link>
              // <Link to='/cart'>Cart {this.props.checkout.quantity}</Link>
              // <Link to='/cart'><img src={require('assets/icons/cart-black.svg')} /></Link>
            }

            <Link to="/cart"><img src={require('assets/icons/cart-black.svg')} /></Link>
            <Cross onClick={this.toggleMenu}>✝&#xFE0E;</Cross>
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
    checkout: state.cart.checkout
  }),
  dispatch => ({
    openCart: () => dispatch(cartActions.toggleCart(true))
  })
)(Nav))

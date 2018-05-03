import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {FlexRow} from 'globalStyles'
import {H1} from 'components/styledComponents/Typography'
import * as cartActions from 'redux/actions/cart'
import Menu from 'components/Menu'
import styled from 'styled-components'

const Container = styled.div`
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

  z-index: 50;
  background-color: white;

  img {
    width: 40px;
  }
`

const Links = FlexRow.extend`
  font-family: "UnifrakturCook";
  font-size: 2.5em;
  justify-content: space-around;

  a {
    color: white;
    -webkit-text-stroke: 1px black;
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
  height: 40px;
  font-weight: bold;
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


class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {menu: false}
  }

  toggleMenu = e => {
    this.setState({menu: !this.state.menu})
  }

  render() {
    return (
      <Container>
        <Header>
          <Logo><Link to='/shop'>Antes De Cristo</Link></Logo>
          <Links>
            <Link to='/'>Shop</Link>
            <Link to='/archive'>Archive</Link>
            <Link to='/about'>About</Link>
            <Link to='/cart'>Cart {this.props.checkout.quantity}</Link>
            <Link to='/cart'><img src={require('assets/icons/shopping-cart.svg')} /></Link>
            <a cross={true} onClick={this.toggleMenu}>✝</a>
          </Links>
        </Header>

        <HeaderPlaceholder />

        <Footer>
          <Link to='/'>Shop</Link>
          <Link to='/archive'>Archive</Link>
          <Link to='/about'>About</Link>
          <Link to='/cart'>Cart {this.props.checkout.quantity}</Link>
        </Footer>

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

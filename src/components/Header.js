import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {H1} from 'components/styledComponents/Typography'
import * as cartActions from 'redux/actions/cart'
import Menu from 'components/Menu'
import styled from 'styled-components'


const HeaderStyled = styled.header`
  position: fixed;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  // color: white;
  background-color: black;

  // border-bottom: 2px solid black;
  width: 100%;
  padding: 20px;
  z-index: 20;
  box-sizing: border-box;
  height: 6vw;

  & * {
    margin-bottom: 0;
  }
`;

const HeaderPlaceholder = styled.header`
  height: calc(6vw + 4vw);
`;

const StyledLink = styled(Link)`
  display: block;
  // margin: 0.5em 0;
  text-decoration: none;
  font-weight: 100;
`;


const HeaderLink = H1.extend`
  font-weight: 600;
  cursor: pointer;
  flex: 0 1 auto;
  color: #ef0232;
  // background-color: blue;
  font-weight: 100;
  // border: 3px solid #ef0232;
  line-height: 1;
  // margin-top: 30px;
  padding: 0 10px;

  display: ${props => props.hide ? 'none' : 'block'};

  // -webkit-text-stroke-width: 1px;
  //  -webkit-text-stroke-color: white;
`
 const Logo = HeaderLink.extend`
  font-size: 5.5vw;
  line-height: .6;
  flex: 1 1 100%;
  transform: scaleY(1.7) scaleX(2.1);
  color: white;
  a {
    color: white;
  }
 `


const Border = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  border: 20px solid #ef0232;
  z-index: 10;
`

const Footer = styled.footer`
  position: fixed;
  width: 100vw;
  top: 6vw;
  font-size: 1vw;
  left: 0;
  height: 4vw;
  box-sizing: border-box;
  border-bottom: 2px solid black;
  background-color: white;
  z-index: 10;
  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
    font-size: 3em;
  }
`


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {menu: false}
  }

  toggleMenu = e => {
    this.setState({menu: !this.state.menu})
  }

  render() {
    return (
      <div>
        <HeaderStyled>
          {
            //<HeaderLink>adc</HeaderLink>
          }
          <Logo><Link to='/'>Antes De Cristo</Link></Logo>
        </HeaderStyled>
        <Footer>

          <Link to='/shop'>Shop</Link>
          <Link to='/archive'>Archive</Link>
          <Link to='/about'>About</Link>
          <Link to='/cart'>Cart {this.props.checkout.quantity}</Link>
          <HeaderLink hide={true} onClick={this.toggleMenu}>✝</HeaderLink>
        </Footer>
        <HeaderPlaceholder>
        </HeaderPlaceholder>
        {this.state.menu && <Menu toggleMenu={this.toggleMenu} />}
      </div>
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
)(Header))

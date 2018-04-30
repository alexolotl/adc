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
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding: 40px;
  z-index: 20;
  box-sizing: border-box;
  height: 4vw;
  background-color: transparent;
  // border-bottom: 2px solid black;

  top: 0;

  & * {
    margin-bottom: 0;
  }
`;

const HeaderLink = H1.extend`
  font-weight: 600;
  cursor: pointer;
  // flex: 1 1 auto;
  color: #ef0232;
  color: white;
  font-weight: 100;
  line-height: 1;

  :hover {
    transform: rotate(180deg);
  }

  display: ${props => props.hide ? 'none' : 'block'};

  // -webkit-text-stroke-width: 1px;
  //  -webkit-text-stroke-color: white;
`

 const Logo = HeaderLink.extend`
  font-size: 3.25em;
  letter-spacing: 2px;
  font-style: italic;
    text-decoration: underline;
  a {
    color: white;
    text-align: left;
  }

 `

const HeaderPlaceholder = styled.div`
  height: 11vh;
`;

const StyledLink = styled(Link)`
  display: block;
  // margin: 0.5em 0;
  text-decoration: none;
  font-weight: 100;
`;




const Footer = styled.footer`
  position: fixed;
  width: 100vw;
  bottom: 0;
  left: 0;
  height: 100px;
  box-sizing: border-box;
  // border-top: 2px solid black;
  background-color: transparent;
  z-index: 10;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // border-top: 2px solid black;

  a {
    font-size: 2.75em;
    font-family: "UnifrakturCook";
    // color: lavender;
    color: transparent;
    -webkit-text-stroke: 2px white;

    :hover {
      color: lavender;
      text-shadow: 2px 2px black;
    }
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
    return this.props.match.path != '/' && (
      <div>
        <HeaderStyled>
          {
            //<HeaderLink>adc</HeaderLink>
            // <h1 style={{fontSize: '4vw', backgroundColor: 'white', color: 'black', transform: 'scaleY(1)', fontFamily: 'Arial', margin: 0, lineHeight: 1, fontStyle: 'italic'}}>ANTES DE CRISTO</h1>

          }

          <Logo><Link to='/'>Antes De Cristo</Link></Logo>
          <HeaderLink onClick={this.toggleMenu}>✝</HeaderLink>
        </HeaderStyled>
        {
          <Footer>

            <Link to='/'>Shop</Link>
            <Link to='/archive'>Archive</Link>
            <Link to='/about'>About</Link>
            <Link to='/cart'>Cart {this.props.checkout.quantity}</Link>
          </Footer>
        }

        {
            // <HeaderPlaceholder>
            // </HeaderPlaceholder>
        }

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

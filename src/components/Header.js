import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {H1} from 'components/styledComponents/Typography'
import * as cartActions from 'redux/actions/cart'
import Menu from 'components/Menu'
import styled from 'styled-components'

const FlexRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  h1 {
    margin-left: 30px;
  }
`

const HeaderStyled = styled.header`
  position: fixed;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding: 40px 25px;
  z-index: 20;
  box-sizing: border-box;
  height: 4vw;
  background-color: transparent;
  // border-bottom: 2px solid black;

  top: 0;

  & * {
    margin-bottom: 0;
  }

  @media (max-width: 700px) {

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
  z-index: 100;

  img {
    width: 45px;
  }

  :hover {
    transform: ${props => props.cross ? 'rotate(180deg)' : 'rotate(0deg)'};
  }

  display: ${props => props.hide ? 'none' : 'block'};

  // -webkit-text-stroke-width: 1px;
  //  -webkit-text-stroke-color: white;

  @media (max-width: 700px) {
    font-size: 2.5em;
  }
`

 const Logo = HeaderLink.extend`
 z-index: 10;
  font-size: 3.25em;
  letter-spacing: 2px;
  font-style: italic;
    // text-decoration: underline;
  a {
    color: white;
    text-align: left;
  }

  @media (max-width: 700px) {
    font-size: 1.75em;
  }

 `

const HeaderPlaceholder = styled.div`
  height: 0px;

  @media (max-width: 700px) {
    height: 80px;
  }
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

    @media (max-width: 700px) {
      display: none;
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
    return (
      <div>
        <HeaderStyled>
          {
            //<HeaderLink>adc</HeaderLink>
            // <h1 style={{fontSize: '4vw', backgroundColor: 'white', color: 'black', transform: 'scaleY(1)', fontFamily: 'Arial', margin: 0, lineHeight: 1, fontStyle: 'italic'}}>ANTES DE CRISTO</h1>

          }

          <Logo><Link to='/shop'>Antes De Cristo</Link></Logo>
          <FlexRow>
            <HeaderLink><Link to='/cart'><img src={require('assets/icons/shopping-cart.svg')} /></Link></HeaderLink>
            <HeaderLink cross={true} onClick={this.toggleMenu}>✝</HeaderLink>
          </FlexRow>
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
            <HeaderPlaceholder>
            </HeaderPlaceholder>
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

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
  // color: white;
  width: 100vw;
  padding: 20px;

  & * {
    margin-bottom: 0;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  // margin: 0.5em 0;
  text-decoration: none;
  // color: black;
  // color: white;
  padding-left: 20px;
  font-size: 1.5em;
  font-weight: 100;
`;

const A = styled.a`
  margin-right:20px;
`

const HeaderLink = H1.extend`
  margin-right:20px;
  font-size: 4em;
  font-weight: 600;
  cursor: pointer;
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
          <h1><StyledLink to='/'>AdC</StyledLink></h1>
          <HeaderLink><A onClick={this.props.openCart}>Cart: {this.props.checkout.lineItems.length}</A></HeaderLink>
          <HeaderLink><A onClick={this.toggleMenu}>§</A></HeaderLink>
        </HeaderStyled>
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

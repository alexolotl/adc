import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Menu from 'components/Menu'
import styled from 'styled-components'

const HeaderStyled = styled.header`
  // position: fixed;
  // border-bottom: 1px solid black;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  // color: white;
  width: 100vw;
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
  // color: white;
  font-size: 1.5em;
  font-weight: 100;
`

export default class Header extends Component {
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
          <h1><A onClick={this.toggleMenu}>§</A></h1>
        </HeaderStyled>
        {this.state.menu && <Menu toggleMenu={this.toggleMenu} />}
      </div>
    );
  }
}

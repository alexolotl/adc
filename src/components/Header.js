import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Menu from 'components/Menu'
import styled from 'styled-components'

const HeaderStyled = styled.header`
  border-bottom: 1px solid black;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  display: block;
  // margin: 0.5em 0;
  text-decoration: none;
  color: black;
  padding-left: 20px;
`;

const A = styled.a`
  margin-right:20px;
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
          <h1><A onClick={this.toggleMenu}>+</A></h1>
        </HeaderStyled>
        {this.state.menu && <Menu toggleMenu={this.toggleMenu} />}
      </div>
    );
  }
}

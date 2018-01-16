import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {H1} from 'components/styledComponents/Typography'
import styled from 'styled-components'

const MenuWrapper = styled.header`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  color: white;

  width: calc(100vw - 80px);
  height: calc(100vh - 80px);
  top: 40px;
  left: 40px;
  border: 4px solid white;
  box-sizing: border-box;
  z-index: 5;
`;

const FlexCol = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const FlexLi = styled.li`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Border = styled.div`
  position: fixed;
  width: calc(100vw - 50px);
  height: calc(100vh - 50px);
  top: 25px;
  left: 25px;
  border: 4px solid white;
  box-sizing: border-box;
`
const MenuHeader = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 2px solid white;
  text-align: right;
`

const X = styled.a`
  position: absolute;
  font-size: 2em;
  right: 10px;
  top: 10px;
  height: 60px;
  width: 60px;
  line-height: 1;
  box-sizing: border-box;
  border: 2px solid white;
  padding: 15px;
`

const StyledLink = styled(Link)`
  color: palevioletred;
  display: block;
  margin: 0.5em 0;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: yellow;
  }
`;

export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MenuWrapper>
        <FlexCol>
          <MenuHeader>
            <X onClick={this.props.toggleMenu}>X</X>
          </MenuHeader>
          <FlexLi>
            <H1><StyledLink to='/shop' onClick={this.props.toggleMenu}>Shop</StyledLink></H1>
          </FlexLi>
          <FlexLi>
            <H1><StyledLink to='/archive' onClick={this.props.toggleMenu}>Archive</StyledLink></H1>
          </FlexLi>
          <FlexLi>
            <H1><StyledLink to='/adc' onClick={this.props.toggleMenu}>About</StyledLink></H1>
          </FlexLi>
        </FlexCol>
      </MenuWrapper>
    );
  }
}

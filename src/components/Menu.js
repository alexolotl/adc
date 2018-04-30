import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {H1} from 'components/styledComponents/Typography'
import styled from 'styled-components'

const MenuWrapper = styled.header`
  position: fixed;
  top: 0;
  color: white;
  background-color: rgba(0,0,0,.8);
  width: 100vw;
  height: 100vh;
  z-index: 20;
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
  // background-color: blue;
  padding: 0 40px;
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
  text-align: right;
`

const X = styled.a`
  position: absolute;
  font-size: 4em;
  font-weight: 100;
  right: 10px;
  top: 10px;
  height: 60px;
  width: 60px;
  line-height: 1;
  padding: 15px;

`

const StyledLink = styled(Link)`

    font-size: 1em;
    font-family: "UnifrakturCook";
    // color: transparent;
    -webkit-text-stroke: 2px black;
    letter-spacing: .07em;
    color: lavender;

    :hover {
      color: lavender;
      text-shadow: 2px 2px black;
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
            <H1><StyledLink to='/shop' onClick={this.props.toggleMenu}>Designers</StyledLink></H1>
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

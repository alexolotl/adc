import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components'
import { Switch, Route, withRouter, Link } from 'react-router-dom'
import * as threeActions from 'redux/actions/three'
import * as uiActions from 'redux/actions/ui'
import {connect} from 'react-redux'
import {FlexCol, FlexRow} from 'globalStyles'
import {bindActionCreators} from 'redux'

const Container = FlexRow.extend`
  position: absolute;
  flex-flow: row wrap;
  width: calc(100vw - 160px);
  height: calc(100vh - 200px);
  top: 140px;
  left: 80px;
  margin: 0 auto;
  background-color: white;
  justify-content: center;
  align-items: center;
`

const AboutText = styled.h2`
  font-size: 3em;
`

class About extends Component {
  constructor(props) {

      super(props)
    this.state = {
      aboutText: "Welcome to antes de cristo"
    }
  }
  componentDidMount() {
    this.props.setBkgText('About ')
  }
  render() {
    return (
      <Container>
        <AboutText>
          {this.state.aboutText}
        </AboutText>
      </Container>
    )
  }
}

export default withRouter(connect(
  state => ({
    shop: state.shop
  }),
  dispatch => ({
    setBkgText: txt => dispatch(uiActions.setBkgText(txt))
  })
)(About))

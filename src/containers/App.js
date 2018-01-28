import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import Header from 'components/Header'
import Main from 'containers/Main'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }
  render() {
    return (
      <div className="App">
        <Header client={this.props.client} />
        <Main client={this.props.client} />
      </div>
    );
  }
}

export default App;

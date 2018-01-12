import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import Header from 'components/Header'
import Main from 'containers/Main'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;

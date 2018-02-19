import React, {Component} from 'react';
import {connect} from 'react-redux'
import {setCollection, filterByType} from 'redux/actions/shop'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'


const FilterMenu = styled.div`
  margin: 0;
  display: flex;
  flex-flow: column nowrap;
  height: 600px;
  border: 2px solid black;
  width: 400px;
  position: fixed;
  top: 200px;
  left: 20px;
  z-index: 20;

  display: ${props => props.active ? 'block' : 'none'};
`;

const FilterItem = styled.a`
  background-color: ${props => props.active ? 'black' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  padding: 20px 0;
  margin: 0;
  font-size: 1.5em;
  flex: 1 1 auto;
  cursor: pointer;
`;

class Filters extends Component {
  constructor() {
    super()
    this.state = {
      isActive: false
    }
  }
  render() {
    let collections;
    let types = ['Boots', 'Shirts']
    if (this.props.collections) {
      collections = this.props.collections
    }
    else {
      collections = [{title: 'a'}, {title: 'b'}]
    }
    return (
      <FilterMenu active={this.state.isActive} onClick={() => this.setState({isActive: true})}>
        <header>
          <h1>Filters</h1>
        </header>
        {collections.map(collection => (
          <FilterItem key={collection.id} onClick={() => this.props.setCollection(collection)}>{collection.title}</FilterItem>
        ))}

        {types.map(type => (
          <FilterItem key={type} onClick={() => this.props.filterByType(type, this.props.client)}>{type}</FilterItem>
        ))}
      </FilterMenu>
    );
  }
}

export default withRouter(connect(
  state => ({
    client: state.client.client
  }),
  dispatch => ({
    setCollection: collection => dispatch(setCollection(collection)),
    filterByType: (type, client) => dispatch(filterByType(type, client))
  })
)(Filters))

import React, { Component } from 'react';
import styled from 'styled-components'

const FilterMenu = styled.div`
  margin: 0;
  display: flex;
  flex-flow: row nowrap;
  max-width: 100%;
`;

const FilterItem = styled.a`
  background-color: ${props => props.active ? 'black' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  padding: 20px 0;
  margin: 0;
  font-size: 1.5em;
  flex: 1 0 25%;
`;

const Filters = props => {
  return (
    <FilterMenu>
      <FilterItem>Clothing</FilterItem>
      <FilterItem>Stones</FilterItem>
      <FilterItem>Vintage</FilterItem>
      <FilterItem active>All</FilterItem>
    </FilterMenu>
  );
}

export default Filters

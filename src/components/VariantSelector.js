import React, {Component} from 'react';
import styled from 'styled-components'

const Select = styled.select`
  width: 100%;
  height: 40px;
  border-radius: 0;
  -webkit-appearance: none;
  -webkit-border-radius: 0px;
  background-color: white;
  font-size: 1em;
  text-transform: uppercase;
  overflow: ellipsis;
  white-space: nowrap;

  margin-right: 20px;
  text-align: center;
  margin-bottom: 20px;

`

const Option = styled.option`
  height: 40px;
  width: 100%;
  border: 2px solid black;
  margin-right: 20px;
  border-radius: 0;
  -webkit-appearance: none;
  -webkit-border-radius: 0px;
  text-align: center;
`

class VariantSelector extends Component {
  render() {
    return (
      <Select
        name={this.props.option.name}
        key={this.props.option.name}
        onChange={this.props.handleOptionChange}
      >
        {this.props.option.values.map((value) => {
          return (
            <Option value={value} key={`${this.props.option.name}-${value}`}>{`${value}`}</Option>
          )
        })}
      </Select>
    );
  }
}

export default VariantSelector;

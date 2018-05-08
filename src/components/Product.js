import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom'
import styled from 'styled-components'
import {FlexRow, FlexCol} from 'globalStyles'
import VariantSelector from 'components/VariantSelector'

import ThreeWindow from 'components/ThreeWindow/ThreeWindow'


import * as cartActions from 'redux/actions/cart'
import * as shopActions from 'redux/actions/shop'
import * as threeActions from 'redux/actions/three'

const ProductPage = FlexRow.extend`
  width: calc(100vw - 40px);
  height: calc(100vh - 80px);
  overflow: hidden;
  justify-content: space-between;
  margin: 0 auto;
  min-height: calc(100vh - 80px);

  box-sizing: border-box;

  @media (max-width: 700px) {
    overflow: scroll;
    height: auto;
    width: 100%;
    position: relative;
    display: block;
    margin-top: 0;
    background-color: white;
  }
`

const ImgContainer = styled.div`
  // max-height: 100vh;
  max-width: 100vw;
  flex: 1 0 50%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 100vh;
  overflow-y: scroll;

  margin: 0 auto;

  @media (max-width: 700px) {
    flex: 1 0 100%;
    width: 100vw;
    max-width: 450px;

  }
`
const Img = styled.img`
  object-fit: contain;
  max-height: 80vh;
  width: 50vw;
  max-width: 50vw;
  margin: 0 auto;

  @media (max-width: 700px) {
    width: 100%;
    max-width: 100%;

    margin: 0 auto;
  }
`
const Details = styled.div`
  padding: 40px;

  flex: 1 1 50%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  background-color: rgba(255,255,255,1);
  margin-right: 20px;
  margin-left: 20px;

  border: 2px solid black;

  // height: 80vh;


  h1 {
    font-size: 3em;
    text-align: left;
    text-transform: uppercase;
  }

  p {
    text-align: left;
  }

  @media (max-width: 700px) {
    margin: 0 auto;
    padding: 0;
    height: auto;
    padding-top: 20px;

    margin-right: auto;

    border: none;

    h1 {
      font-size: 1.5em;
    }

    > div {
      // background-color: rgba(255,255,255,.65);
    }
  }
`

const VariantModal = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  background-color: white;
`


const Variant = styled.div`
  cursor: pointer;
  margin: 5px;
`

const Button = styled.div`
  padding: 10px;
  border: 2px solid black;
  box-sizing: border-box;
  pointer-events: ${props => props.active ? 'auto' : 'none'};
  cursor: pointer;
  margin: 0px 20px 20px 0px;

  width: 100%;
  max-width: 400px;
  text-align:center;
  background-color: ${props => props.added? 'black' : 'white'};
  font-style: ${props => props.added ? 'italic' : 'normal'};
  color: ${props => props.added? 'white' : 'black'};
  pointer-events: ${props => props.added? 'none' : 'initial'};
  font-size: 1.75em;

  font-weight: bold;
  letter-spacing: .2em;

  :hover {
    // background-color: rgba(255,255,255,.3);
    background-color: black;//#aa72ff;
    color: white;
  }

  @media (max-width: 700px) {
    margin: 0px 20px 20px 20px;
  }
`

const DetailRow = FlexRow.extend`
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 30px;
  text-align: left;
  line-height: 1.5;

  select {
    text-align-last: center;
  }

  @media (max-width: 700px) {
    margin-bottom: 20px;
    span {
      margin-left: 20px;
      border: none;
    }
    > div {
      margin-left: 20px;
    }
    > label {
      margin-left: 20px;
    }
  }
`


const Screen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 700vh;
  // background: linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,.2));
  z-index: -1;
`

const Label = styled.label`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  input {
    width: 30px;
    height: 30px;
    border: 2px solid black;
    flex: 1 1 auto;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
    margin-left: 20px;
    text-align-last: center;
  }
`

const Back = styled.img`
  position: fixed;
  top: 100px;
  left: 20px;
  width: 30px;
`


class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      added: false,
      selectedVariantImage: {src: null}
    }
  }

  componentDidMount() {
    if (this.props.products) {
      const activeProduct = this.props.products.find(p => p.handle == this.props.match.params.product)
      this.setState({
        product: activeProduct
      })
      this.props.setActiveProduct(activeProduct)
      activeProduct && this.props.setImage(activeProduct.images[0].src)

      activeProduct && activeProduct.options.forEach((selector) => {
        this.setState({
          selectedOptions: { [selector.name]: selector.values[0].value }
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.state.product && this.props.products !== prevProps.products) {

      const activeProduct = this.props.products.find(p => p.handle == this.props.match.params.product)
      // this.props.getProductById(activeProduct.id, this.props.client)
      this.setState({
        product: activeProduct
      })
      this.props.setActiveProduct(activeProduct)

      activeProduct.options.forEach((selector) => {
        this.setState({
          selectedOptions: { [selector.name]: selector.values[0].value }
        });
      });

      activeProduct && this.props.setImage(activeProduct.images[0].src)
    }
  }

  componentWillUnmount() {
    this.props.setActiveProduct(null)
  }

  selectVariant = variant => {
    this.setState({variant: variant})
  }

  handleQuantityChange = (event) => {
    this.setState({
      quantity: event.target.value
    });
  }

  handleOptionChange = (event) => {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;

    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.state.product, selectedOptions)
    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image
    });
  }

  renderPage(product) {

    let variant = this.state.selectedVariant || product.variants[0]
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let image = this.state.selectedVariantImage.src || this.state.product.images[0].src
    image = image.slice(0, image.lastIndexOf('.')) + '_1024x1024' + image.slice(image.lastIndexOf('.'), -1)

    return (
      <ProductPage>
        <Screen />
        <ImgContainer>
          <Link to={'/shop'}><Back src={require('assets/icons/left-arrow.svg')} /></Link>
          <Img src={image}/>
        </ImgContainer>
        <Details>
            <DetailRow>
              <span><h1>{this.state.product.title}</h1></span>
            </DetailRow>


            <DetailRow>
              <span><h3>{product.description}</h3></span>
            </DetailRow>

            <DetailRow  style={{display: (product.options.length == 1 && product.options[0].name == 'Title') ? 'none' : 'block' }}>
            <div>
              {
                product.options.map((option, i) => {
                  return (
                    <div key={i} style={{width: '100%'}}>
                      <h3>Select {option.name}:</h3>
                      <VariantSelector
                        handleOptionChange={this.handleOptionChange}
                        key={option.id.toString()}
                        option={option}
                      />
                    </div>
                  );
                })
              }
              </div>
            </DetailRow>

            <DetailRow>
              <Label>
                <p>Quantity</p>
                <input min="1" type="number" defaultValue={this.state.quantity || 1} onChange={this.handleQuantityChange}></input>
              </Label>
            </DetailRow>

            <DetailRow>
              <Button active={variant} added={this.state.added} onClick={() => {this.props.addVariantToCart(variant.id, this.state.quantity, this.props.client, this.props.checkout.id); this.setState({added: true})}}>
              {this.state.added ? 'ADDED!' : 'ADD TO CART'}
              </Button>
            </DetailRow>
        </Details>
      </ProductPage>
    )
  }
  render() {
    return (
      <div>
        {this.state.product && this.renderPage(this.state.product)}
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    client: state.client.client,
    checkout: state.cart.checkout,
    products: state.shop.products,
    activeProduct: state.shop.activeProduct
  }),
  dispatch => ({
    addVariantToCart: (variantId, quantity, client, checkoutId) => dispatch(cartActions.addVariantToCart(variantId, quantity, client, checkoutId)),
    setActiveProduct: prod => dispatch(shopActions.setActiveProduct(prod)),
    setImage: (img) => dispatch(threeActions.setImage(img)),
  })
)(Product))

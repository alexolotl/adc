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
import * as utils from 'utils/factory'

import {client} from 'components/initializeClient'

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
  max-height: 80vh;
  overflow-y: scroll;

  margin: 0 auto;

  @media (max-width: 700px) {
    flex: 1 0 100%;
    width: 100vw;
    max-width: 450px;

  }
`
const Img = styled.img`
  // object-fit: contain;
  max-height: 80vh;
  // width: 50vw;
  max-width: 50vw;
  margin: 0 auto;

  @media (max-width: 700px) {
    width: 100%;
    max-width: 100%;

    margin: 0 auto;
  }
`
const Details = styled.div`
  padding: 40px 40px 0 40px;

  flex: 1 1 50%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;

  background-color: rgba(255,255,255,1);
  // margin-right: 20px;
  margin-left: 20px;

  border: 2px solid black;

  height: 80vh;

  overflow-y: scroll;


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
      line-height: 1;
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
    // margin: 0px 20px 20px 20px;
    margin: 0;
  }
`

const DetailRow = FlexRow.extend`
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 30px;
  text-align: left;
  line-height: 1.5;
  flex: 1 0 auto;


  select {
    text-align-last: center;
  }

  @media (max-width: 700px) {
    margin-bottom: 20px;
    width: calc(100vw - 40px);
    span {
      border: none;
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
      selectedVariantQuantity: 1,
      selectedVariant: null,
      selectedOptions: {},
      added: false
    }
  }

  componentDidMount() {
    // if (this.props.client) {
    //   if (!this.props.products.length) {
    //
    //   }
    //   else if (this.props.products.length) {
    //     const activeProduct = this.props.products.find(prod => prod.handle === this.props.match.params.product)
    //     this.props.setActiveProduct(activeProduct)
    //     this.handleNewActiveProduct(activeProduct)
    //   }
    // }

    client && this.props.fetchByHandle(this.props.match.params.product)
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeProduct && !prevProps.activeProduct) {
      this.handleNewActiveProduct(this.props.activeProduct)
      // let info = this.props.client.shop.fetchInfo().then(res => res)
      // let policies = this.props.client.shop.fetchPolicies().then(res =>res)
      // console.log(info); // this includes currency
      // console.log(policies);
    }
  }

  componentWillUnmount() {
    this.props.setActiveProduct(null)
  }

  handleNewActiveProduct = activeProduct => {

    let initOptions = {}
    activeProduct.options.forEach((selector) => {
      initOptions[selector.name] = selector.values[0].value
    });
    this.setState({
      selectedOptions: initOptions,
      product: activeProduct,
      selectedVariant: activeProduct.variants[0]
    });

    this.props.setImage(utils.resizeImgForShopify(activeProduct.variants[0].image.src, '1024x1024'))
  }

  selectVariant = variant => {
    this.setState({selectedVariant: variant, selectedVariantQuantity: 1})
  }

  handleQuantityChange = (event) => {
    // event.target.value >= 0 && event.target.value <= this.state.selectedVariant.available &&
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }

  handleOptionChange = (event) => {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;
    const selectedVariant = client.product.helpers.variantForOptions(this.state.product, selectedOptions)
    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.image.src
    });
  }

  renderPage(product) {
    // console.log(this.state.selectedOptions);
    let variant = this.state.selectedVariant || product.variants[0]
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let image = variant.image.src || this.state.product.images[0].src
    image = utils.resizeImgForShopify(image, '1024x1024')

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

            <DetailRow>
              <span><h3>${variant.price}</h3></span>
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
                <input min="1" type="number" defaultValue={this.state.selectedVariantQuantity || 1} onChange={this.handleQuantityChange}></input>
              </Label>
            </DetailRow>

            <DetailRow>
              <Button active={variant} added={this.state.added === variant.id} onClick={() => {this.props.addVariantToCart(variant.id, this.state.selectedVariantQuantity, this.props.checkout.id); this.setState({added: variant.id})}}>
              {this.state.added === variant.id ? 'ADDED!' : 'ADD TO CART'}
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
    // client: state.client.client,
    checkout: state.cart.checkout,
    products: state.shop.products,
    activeProduct: state.shop.activeProduct
  }),
  dispatch => ({
    addVariantToCart: (variantId, quantity, checkoutId) => dispatch(cartActions.addVariantToCart(variantId, quantity, checkoutId)),
    setActiveProduct: prod => dispatch(shopActions.setActiveProduct(prod)),
    setImage: (img) => dispatch(threeActions.setImage(img)),
    fetchByHandle: (handle) => dispatch(shopActions.fetchByHandle(handle))
  })
)(Product))

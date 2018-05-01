import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import {FlexRow, FlexCol} from 'globalStyles'

import * as cartActions from 'redux/actions/cart'
import * as shopActions from 'redux/actions/shop'
import * as threeActions from 'redux/actions/three'

const ProductPage = FlexRow.extend`
  width: calc(100vw - 40px);
  height: 100vh;
  overflow: hidden;
  // position: absolute;
  // left: 0;
  // top: 0;
  justify-content: space-between;
  margin: 0 auto;

  @media (max-width: 700px) {
    overflow: scroll;
    height: auto;
    width: 100%;
    position: relative;
    display: block;
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

  @media (max-width: 700px) {
    flex: 1 0 100%;

  }
`
const Img = styled.img`
  object-fit: contain;
  max-height: 80vh;
  width: 50vw;
  max-width: 50vw;

  @media (max-width: 700px) {
    width: 100%;
    max-width: 100%;
  }
`
const Details = styled.div`
  height: 100%;
  padding: 40px;

  flex: 1 1 50%;
  box-sizing: border-box;

  height: calc(100vh - 180px);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  color: white;

  position: relative;
  left: -15%;
  top: 100px;

  h1 {
    font-size: 3em;
    text-align: left;
  }

  p {
    text-align: left;
  }

  @media (max-width: 700px) {
    padding: 0;
    margin: 20px 0 40px 0;
    height: auto;

    left: 0;
    top: 0;

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
  padding: 20px;
  border: 2px solid white;
  box-sizing: border-box;
  pointer-events: ${props => props.active ? 'auto' : 'none'};
  cursor: pointer;

  width: 100%;
  max-width: 400px;
  text-align:center;
  background-color: transparent;//rgba(255,255,255,.65);

  color: white;
  font-size: 1.75em;

  :hover {
    background-color: rgba(255,255,255,.3);
  }
`

const DetailRow = FlexRow.extend`
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 30px;

  @media (max-width: 700px) {
    margin: 0;
  }
`


const Screen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 700vh;
  background: linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,.2));
  z-index: -1;
`


class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      added: false,
      variant: {id: null},
      showModal: false
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
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.state.product && this.props.products !== prevProps.products) {
      const activeProduct = this.props.products.find(p => p.handle == this.props.match.params.product)
      console.log(activeProduct.id);
      // this.props.getProductById(activeProduct.id, this.props.client)
      this.setState({
        product: activeProduct
      })
      this.props.setActiveProduct(activeProduct)

      activeProduct && this.props.setImage(activeProduct.images[0].src)
    }
  }

  componentWillUnmount() {
    this.props.setActiveProduct(null)
  }

  selectVariant = variant => {
    this.setState({variant: variant})
  }
  renderVariants = variants => {
    if (variants.length == 1) {
      this.state.variant.id != variants[0].id && this.selectVariant(variants[0])
      return (
        <h3>{variants.length == 1 && variants[0].price}</h3>
      )
    }
    else return (
      <div style={{display: 'flex', flexFlow: 'row nowrap', width: '100%'}}>
        <div onClick={() => this.setState({showModal: !this.state.showModal})}>VIEW SIZES</div>
        <VariantModal style={{display: this.state.showModal ? 'flex' : 'none'}}>
          {
            variants.map((variant, i) => (
              <Variant active={this.state.variant.id === variant.id} key={i} onClick={() => this.selectVariant(variant)}>{variant.title}</Variant>
            ))
          }

      </VariantModal>
      </div>
    )
  }
  renderPage(product) {

    return (
      <ProductPage>
        <Screen />
        <ImgContainer>
          <Img src={product.images[0].src}/>
        </ImgContainer>
        <Details>
            <DetailRow>
              <h1>{this.state.product.title}</h1>
            </DetailRow>

            <DetailRow>
              {
                this.renderVariants(product.variants)
              }
            </DetailRow>


            <DetailRow>
              <p>{product.description}</p>
            </DetailRow>

            {
              // <DetailRow>
              //   <p>Quantity:</p>
              //   <p onClick={() => this.setState({quantity: Math.max(0, this.state.quantity - 1)})}>-</p>
              //   <p>{this.state.quantity}</p>
              //   <p onClick={() => this.setState({quantity: this.state.quantity + 1})}>+</p>
              // </DetailRow>
            }

            <DetailRow>
              <Button active={this.state.variant} onClick={() => {this.props.addVariantToCart(this.state.variant.id, this.state.quantity, this.props.client, this.props.checkout.id); this.setState({added: true})}}>
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

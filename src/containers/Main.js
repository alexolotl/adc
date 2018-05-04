import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'

import Shop from 'containers/Shop'
import Product from 'components/Product'
import Home from 'components/Home'
import Checkout from 'containers/Checkout'
import Cart from 'containers/Cart'
import Archive from 'containers/Archive'
import About from 'containers/About'

const BackgroundText = styled.div`
  width: 140vw;
  margin: 0 auto;
  height: 100vh;
  position: fixed;
  top: 60px;
  left: -20vw;
  z-index: -5;
  font-size: 8em;
  font-style: italic;
  text-transform: uppercase;
  pointer-events: none;

  display: ${props => props.hidden ? 'none': 'block'};
`

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {}
    }
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
  }

  // openCheckout() {
  //   window.open(this.props.checkout.webUrl);
  // }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return this.props.client.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  removeLineItemInCart(lineItemId) {
    const checkoutId = this.state.checkout.id

    return this.props.client.removeLineItems(checkoutId, [lineItemId]).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }



  render() {
    const list = [...Array(100).keys()]
    return (
      <main>
        <BackgroundText hidden={this.props.location.pathname == '/'}>
          {
            list.map(i => <span key={i}>{this.props.backgroundText}</span>)
          }
        </BackgroundText>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/shop' component={Shop} />
          <Route path='/shop/:product' component={Product} />
          <Route path='/cart' component={Checkout} />
          <Route path='/archive' component={Archive} />
          <Route path='/about' component={About} />
        </Switch>
      </main>
    )
  }
}

export default withRouter(connect(
  state => ({
    client: state.shop.client,
    backgroundText: state.ui.backgroundText,
    backgroundTextStyle: state.ui.backgroundTextStyle
  })
)(Main))

/*
  NOTE: ROUTING EXAMPLES:

  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/roster' component={Roster}/>
    <Route path='/roster/:number' component={Player}/>
      NOTE: number will be stored as match.params.number
    <Route path='/schedule' component={Schedule}/>
  </Switch>

  // NOTE: when nesting Routes within other components, it's important that the inner nested ones are the ones that have exact or else it will only render the outer components

  NOTE: Only one of the following should be supplied as a prop to a Route element:

    ----- component, render, or children ------

    - COMPONENT - simple, passes a Component
    - RENDER - similar to component, but useful to pass extra props or inline rendering
    - CHILDREN - returns react element, but will always be rendered regardless of whether route's path matches location

    <Route path='/page' component={Page} />

    const extraProps = { color: 'red' }
    <Route path='/page' render={(props) => (
      <Page {...props} data={extraProps}/>
    )}/>

    <Route path='/page' children={(props) => (
      props.match
        ? <Page {...props}/>
        : <EmptyPage {...props}/>
    )}/>

    NOTE: LINKING

    <Link to='/roster'>Roster</Link>

    'to' can be either a string (like above) or a location object containing any of the following:
        -pathname, search, hash, state
        example: to={{pathname: '/roster/7'}}

 */

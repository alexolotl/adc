import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'

import Home from 'containers/Home'
import Shop from 'containers/Shop'
import Product from 'components/Product'

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
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/shop' component={Shop} />
          <Route path='/shop/:product' component={Product} />
        </Switch>
      </main>
    )
  }
}

export default withRouter(connect(
  state => ({
    client: state.shop.client
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

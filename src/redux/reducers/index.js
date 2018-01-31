import { combineReducers } from 'redux'
import shop from 'redux/reducers/shop'
import three from 'redux/reducers/three'
import cart from 'redux/reducers/cart'
import client from 'redux/reducers/client'

const rootReducer = combineReducers({
  shop,
  three,
  cart,
  client
})

export default rootReducer

import { combineReducers } from 'redux'
import shop from 'redux/reducers/shop'
import three from 'redux/reducers/three'
import client from 'redux/reducers/client'

const rootReducer = combineReducers({
  client,
  shop,
  three
})

export default rootReducer

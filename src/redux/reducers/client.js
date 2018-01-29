import {REQUEST_CLIENT, RECEIVE_CLIENT} from 'redux/actions/client'

let initialState = {
  client: null,
  isFetching: false
}

const client = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CLIENT:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_CLIENT:
      return Object.assign({}, state, {
        isFetching: false,
        client: action.payload
      })
    default:
      return state
  }
}

export default client

import {TOGGLE_HAMBURGER} from 'redux/actions/ui'

const initialState = {
  hamburger: false,
  header: true
}

const ui = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_HAMBURGER:
      return Object.assign({}, state, {
        hamburger: !state.hamburger
      })
    case DISPLAY_HEADER:
      return Object.assign({}, state, {
        header: action.payload
      })
    default:
      return state
  }
}

export default ui

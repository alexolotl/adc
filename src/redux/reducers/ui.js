import {TOGGLE_HAMBURGER} from 'redux/actions/ui'

const initialState = {
  hamburger: false,
}

const ui = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_HAMBURGER:
      return Object.assign({}, state, {
        hamburger: !state.hamburger
      })
    default:
      return state
  }
}

export default ui

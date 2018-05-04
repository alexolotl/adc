import {TOGGLE_HAMBURGER, SET_BKG_TEXT, SET_BKG_TEXT_STYLE} from 'redux/actions/ui'

const initialState = {
  hamburger: false,
  header: true,
  backgroundText: 'Antes de Cristo ',
  backgroundTextStyle: {fontStyle: ''}
}

const ui = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_HAMBURGER:
      return Object.assign({}, state, {
        hamburger: !state.hamburger
      })
    case SET_BKG_TEXT:
      return Object.assign({}, state, {
        backgroundText: action.payload
      })
    case SET_BKG_TEXT:
      return Object.assign({}, state, {
        backgroundTextStyle: action.payload
      })
    default:
      return state
  }
}

export default ui

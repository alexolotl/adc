export const TOGGLE_HAMBURGER = 'TOGGLE_HAMBURGER'
export function toggleHamburger() {
  return {
    type: TOGGLE_HAMBURGER
  }
}

export const SHOW_HEADER = 'SHOW_HEADER'
export function showHeader(bool) {
  return {
    type: SHOW_HEADER,
    payload: bool
  }
}

export const SET_BKG_TEXT = 'SET_BKG_TEXT'
export function setBkgText(bool) {
  return {
    type: SET_BKG_TEXT,
    payload: bool
  }
}

export const SET_BKG_TEXT_STYLE = 'SET_BKG_TEXT_STYLE'
export function setBkgTextStyle(style) {
  return {
    type: SET_BKG_TEXT_STYLE,
    payload: style
  }
}

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

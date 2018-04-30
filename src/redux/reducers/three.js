const initialState = {
  image: null
}

const three = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IMAGE':
      return {
        ...state,
        image: action.payload
      }
    default:
      return state
  }
}

export default three

import * as utils from 'utils/factory'

export const setImage = payload => {
  return {
    type: 'SET_IMAGE',
    payload: utils.resizeImgForShopify(payload, '1024x1024')
  }
}

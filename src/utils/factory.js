export function resizeImgForShopify(src, size) {
  return src.slice(0, src.lastIndexOf('.')) + '_' + size + src.slice(src.lastIndexOf('.'), -1)
}

export default function getParam(url) {
  const href = url.split('/')
  const param = href[href.length - 1]
  return param
}

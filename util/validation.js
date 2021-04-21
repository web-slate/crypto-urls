const Url = require('url-parse')

const isUrl = (url) => {
  var res = url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  )
  return res !== null
}

const isPatternUrl = (url) => {
  if (isUrl(url)) {
    const parsedURL = Url(url)
    const urlChunks = parsedURL.pathname.split('/')
    const filteredPatterns = filterPatterns(urlChunks)
    return filteredPatterns.length > 0
  }
  return false
}

const filterPatterns = (chunks) => {
  return chunks.filter((param) => param.indexOf(':') === 0)
}

const isPatterObject = (obj) => {
  let patternArray = []
  const objKeys = Object.keys(obj)
  objKeys.filter((i) => {
    if (i.startsWith(':')) patternArray.push(i)
  })
  return patternArray.length === objKeys.length
}

const isPath = (path) => {
  return path.startsWith('/')
}

const isPattern = (chunks) => {
  let filteredPatterns = filterPatterns(chunks)
  return filteredPatterns.length > 0
}

export { isUrl, isPatternUrl, isPatterObject, isPattern, isPath }
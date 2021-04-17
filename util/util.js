const Url = require('url-parse')

const isValidUrl = (url) => {
  var res = url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  )
  return res !== null
}

const isValidPatternUrl = (url) => {
  if (isValidUrl(url)) {
    const parsedURL = Url(url)
    const urlChunks = parsedURL.pathname.split('/')
    const filteredPatterns = urlChunks.filter(
      (param) => param.indexOf(':') === 0
    )
    return filteredPatterns.length > 0
  }
  return false
}

export { isValidUrl, isValidPatternUrl }

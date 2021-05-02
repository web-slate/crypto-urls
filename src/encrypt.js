const Url = require('url-parse')
const CryptoJS = require('crypto-js')
import {
  isUrl,
  isPatternUrl,
  isPatterObject,
  isPattern,
  isPath,
  messages,
} from '../util'

const encrypt = (function () {
  const secret = 'Secret Passphrase'
  return {
    url: function (url, options = {}) {
      if (!url) throw new Error(messages.MISSING_URL)

      if (!isUrl(url)) throw new Error(messages.INVALID_URL)

      const pattern = options.pattern || null

      if (pattern === null) throw new Error(messages.MISSING_PATTERN)

      if (!isPatternUrl(pattern)) throw new Error(messages.INVALID_PATTERN)

      // extract pattern from the url
      const parsedPatternURL = Url(pattern)
      const parsedPath = Url(url)

      const patternPathChunks = parsedPatternURL.pathname.split('/')
      const givenPathChunks = parsedPath.pathname.split('/')

      const filteredPatterns = patternPathChunks.filter(
        (param) => param.indexOf(':') === 0
      )

      filteredPatterns.map((p) => {
        let encryptedString = CryptoJS.AES.encrypt(
          givenPathChunks[patternPathChunks.indexOf(p)],
          secret
        ).toString()
        //to escape `/` (forward slash) from encryption
        let escapedEncryptedString = encryptedString
          .replace(/\+/g, 'p1L2u3S')
          .replace(/\//g, 's1L2a3S4h')
          .replace(/=/g, 'e1Q2u3A4l')
        givenPathChunks[patternPathChunks.indexOf(p)] = escapedEncryptedString
      })

      return `${parsedPath.origin}${givenPathChunks.join('/')}`
    },
    path: function (pattern, options = {}) {
      if (!pattern) throw new Error(messages.MISSING_PATTERN)

      if (!isPath(pattern)) throw new Error(messages.INCORRECT_PATH)

      if (Object.keys(options).length === 0)
        throw new Error(messages.MISSING_OPTIONS)

      if (!isPatterObject(options))
        throw new Error(messages.INCORRECT_PATTERN_OBJECT)

      const patternPathChunks = pattern.split('/')

      if (!isPattern(patternPathChunks)) throw new Error(messages.INVALID_PATTERN)

      Object.entries(options).forEach(([k, v]) => {
        let encryptedString = CryptoJS.AES.encrypt(v, secret).toString()
        //to escape `/` (forward slash) from encryption
        let escapedEncryptedString = encryptedString
          .replace(/\+/g, 'p1L2u3S')
          .replace(/\//g, 's1L2a3S4h')
          .replace(/=/g, 'e1Q2u3A4l')
        patternPathChunks[patternPathChunks.indexOf(k)] = escapedEncryptedString
      })
      return `${patternPathChunks.join('/')}`
    },
  }
})()

export { encrypt }

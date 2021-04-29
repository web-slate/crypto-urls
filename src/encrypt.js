const Url = require('url-parse')
const CryptoJS = require('crypto-js')
const fs = require('fs')
import { isUrl, isPatternUrl, isPatterObject, isPattern, isPath } from '../util'

const configData = fs.readFileSync(__dirname + '/config.json', 'utf8')
const configObject = JSON.parse(configData)

const encrypt = (function () {
  const secret = configObject.secret
  return {
    config: function (config = {}) {
      if (Object.keys(config).length === 0)
        throw new Error('options is missing')
      for (const [key, value] of Object.entries(config)) {
        configObject[key] = value
      }
      fs.writeFileSync(__dirname + '/config.json', JSON.stringify(configObject))
    },
    url: function (url, options = {}) {
      if (!url) throw new Error('url is missing')

      if (!isUrl(url)) throw new Error('invalid url')

      const pattern = options.pattern || null

      if (pattern === null) throw new Error('pattern is missing')

      if (!isPatternUrl(pattern)) throw new Error('invalid pattern')

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
      if (!pattern) throw new Error('pattern is missing')

      if (!isPath(pattern)) throw new Error('pattern/path should start with /')

      if (Object.keys(options).length === 0)
        throw new Error('options is missing')

      if (!isPatterObject(options))
        throw new Error('pattern object contains invalid key')

      const patternPathChunks = pattern.split('/')

      if (!isPattern(patternPathChunks)) throw new Error('invalid pattern')

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

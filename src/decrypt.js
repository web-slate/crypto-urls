const Url = require('url-parse')
const CryptoJS = require('crypto-js')

const decrypt = (function () {
  const secret = 'Secret Passphrase'
  return {
    url: function (givenUrl, options = {}) {
      const pattern = options.pattern || null

      if (pattern === null) throw new Error('pattern is missing')

      // extract pattern from the url
      const parsedPatternURL = Url(pattern)
      const parsedGivenURL = Url(givenUrl)

      const patternPathnameArray = parsedPatternURL.pathname.split('/')
      const givenURLPathnameArray = parsedGivenURL.pathname.split('/')

      const filteredPatterns = patternPathnameArray.filter(
        (param) => param.indexOf(':') === 0
      )

      filteredPatterns.map((p) => {
        let encryptedParameter =
          givenURLPathnameArray[patternPathnameArray.indexOf(p)]
        let unescapedEncryptedString = encryptedParameter
          .replace(/p1L2u3S/g, '+')
          .replace(/s1L2a3S4h/g, '/')
          .replace(/e1Q2u3A4l/g, '=')
        let decryptedString = CryptoJS.AES.decrypt(
          unescapedEncryptedString,
          secret
        ).toString(CryptoJS.enc.Utf8)
        givenURLPathnameArray[patternPathnameArray.indexOf(p)] = decryptedString
      })

      return `${parsedGivenURL.origin}${givenURLPathnameArray.join('/')}`
    },
    path: function (pattern, encryptedPath) {
      const patternPathChunks = pattern.split('/')
      const encryptedPathChunks = encryptedPath.split('/')

      const filteredPatterns = patternPathChunks.filter(
        (param) => param.indexOf(':') === 0
      )

      filteredPatterns.map((p) => {
        let encryptedParameter =
          encryptedPathChunks[patternPathChunks.indexOf(p)]
        let unescapedEncryptedString = encryptedParameter
          .replace(/p1L2u3S/g, '+')
          .replace(/s1L2a3S4h/g, '/')
          .replace(/e1Q2u3A4l/g, '=')
        let decryptedString = CryptoJS.AES.decrypt(
          unescapedEncryptedString,
          secret
        ).toString(CryptoJS.enc.Utf8)
        patternPathChunks[patternPathChunks.indexOf(p)] = decryptedString
      })
      return `${patternPathChunks.join('/')}`
    },
  }
})()

export { decrypt }

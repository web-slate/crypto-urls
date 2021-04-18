const { encrypt, decrypt } = require('../src')

describe('Success case: Crypto Url Encrypt and Decrypt with sequential Pattern', () => {
  let actualUrl =
    'https://testapp.com/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/view/tasks'
  let patternUrl = 'https://testapp.com/modules/provider/:id/:action/tasks'
  var encryptedUrl

  test('encrypt.url', () => {
    encryptedUrl = encrypt.url(actualUrl, {
      pattern: patternUrl,
    })
  })

  test('decrypt', () => {
    expect(
      decrypt.url(encryptedUrl, {
        pattern: patternUrl,
      })
    ).toEqual(actualUrl)
  })
})

describe('Success case: Crypto Url Encrypt and Decrypt with mixed/non-sequential Pattern', () => {
  let actualUrl =
    'https://testapp.com/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/tasks/view'
  let patternUrl = 'https://testapp.com/modules/provider/:id/tasks/:action'
  var encryptedUrl

  test('encrypt', () => {
    encryptedUrl = encrypt.url(actualUrl, {
      pattern: patternUrl,
    })
  })

  test('decrypt', () => {
    expect(
      decrypt.url(encryptedUrl, {
        pattern: patternUrl,
      })
    ).toEqual(actualUrl)
  })
})
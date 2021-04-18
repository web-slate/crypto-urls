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

describe('Failure case: Crypto Url Encrypt and Decrypt without Pattern option', () => {
  test('encrypt', () => {
    expect(() =>
      encrypt.url(
        'https://testapp.com/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/tasks/view'
      )
    ).toThrow('pattern is missing')
  })

  test('decrypt', () => {
    expect(() =>
      decrypt.url(
        'https://testapp.com/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/tasks/view'
      )
    ).toThrow('pattern is missing')
  })
})

describe('Failure case: Crypto Url Encrypt and Decrypt without Url option', () => {
  test('encrypt.url', () => {
    expect(() =>
      encrypt.url()
    ).toThrow('url is missing')
  })

  test('decrypt.url', () => {
    expect(() =>
      decrypt.url()
    ).toThrow('url is missing')
  })
})

describe('Failure case: Crypto Url Encrypt and Decrypt invalid Url', () => {
  let patternUrl = 'https://testapp.com/modules/provider/:id/tasks/:action'

  test('encrypt.url', () => {
    expect(() =>
      encrypt.url('https://testapp', {
        pattern: patternUrl,
      })
    ).toThrow('invalid url')
  })

  test('decrypt.url', () => {
    expect(() =>
      decrypt.url(
        'https://testapp/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/tasks/view',
        {
          pattern: patternUrl,
        }
      )
    ).toThrow('invalid url')
  })
})

describe('Failure case: Crypto Url Encrypt and Decrypt invalid Pattern', () => {
  let patternUrl = 'https://testapp/modules/provider/:id/tasks/:action'

  test('encrypt.url', () => {
    expect(() =>
      encrypt.url('https://testapp.com/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/tasks/view', {
        pattern: patternUrl,
      })
    ).toThrow('invalid pattern')
  })

  test('decrypt.url', () => {
    expect(() =>
      decrypt.url(
        'https://testapp.com/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/tasks/view',
        {
          pattern: patternUrl,
        }
      )
    ).toThrow('invalid pattern')
  })
})

describe('Failure case: Crypto Url Encrypt and Decrypt invalid Url & Pattern', () => {
  let patternUrl = 'https://testapp.com/modules/provider/id/tasks/action'

  test('encrypt.url', () => {
    expect(() =>
      encrypt.url('https://testapp', {
        pattern: patternUrl,
      })
    ).toThrow(Error)
  })

  test('decrypt.url', () => {
    expect(() =>
      decrypt.url(
        'https://testapp/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/tasks/view',
        {
          pattern: patternUrl,
        }
      )
    ).toThrow(Error)
  })
})

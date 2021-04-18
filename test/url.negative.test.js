const { encrypt, decrypt } = require('../src')

describe('Failure case: Crypto Url Encrypt and Decrypt - Without Pattern option', () => {
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

describe('Failure case: Crypto Url Encrypt and Decrypt - Without Url option', () => {
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

describe('Failure case: Crypto Url Encrypt and Decrypt - With invalid Url', () => {
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

describe('Failure case: Crypto Url Encrypt and Decrypt - With invalid Pattern', () => {
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

describe('Failure case: Crypto Url Encrypt and Decrypt - With invalid Url & Pattern', () => {
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

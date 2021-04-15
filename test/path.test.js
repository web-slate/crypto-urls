const { encrypt, decrypt } = require('../src')

describe('Success case: Crypto Path Encrypt and Decrypt with sequential pattern', () => {
  let pattern = '/modules/provider/:id/:action/tasks'

  test('encrypt.path', () => {
    encrypt.path(pattern, {
      ':id': '7d8bb2ff-04d8-4c3c-96c4-faafb6321432',
      ':action': 'view',
    })
  })
})

describe('Success case: Crypto Path Encrypt and Decrypt with mixed/non-sequential pattern', () => {
  let pattern = '/modules/provider/:id/tasks/:action'

  test('encrypt.path', () => {
    encrypt.path(pattern, {
      ':id': '7d8bb2ff-04d8-4c3c-96c4-faafb6321432',
      ':action': 'view',
    })
  })
})

describe('Failure case: Crypto Path Encrypt and Decrypt without Options', () => {
  let pattern = '/modules/provider/:id/tasks/:action'
  test('encrypt.path', () => {
    expect(() => encrypt.path(pattern)).toThrow('options is missing')
  })
})

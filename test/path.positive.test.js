const { encrypt, decrypt } = require('../src')

describe('Success case: Crypto Path Encrypt and Decrypt with sequential pattern', () => {
  let pattern = '/modules/provider/:id/:action/tasks'
  let actualPath =
    '/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/view/tasks'
  let encryptedPath

  test('encrypt.path', () => {
    encryptedPath = encrypt.path(pattern, {
      ':id': '7d8bb2ff-04d8-4c3c-96c4-faafb6321432',
      ':action': 'view',
    })
  })

  test('decrypt.path', () => {
    expect(decrypt.path(pattern, encryptedPath)).toEqual(actualPath)
  })
})

describe('Success case: Crypto Path Encrypt and Decrypt with mixed/non-sequential pattern', () => {
  let pattern = '/modules/provider/:id/tasks/:action'
  let encryptedPath
  let actualPath =
    '/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/tasks/view'

  test('encrypt.path', () => {
    encryptedPath = encrypt.path(pattern, {
      ':id': '7d8bb2ff-04d8-4c3c-96c4-faafb6321432',
      ':action': 'view',
    })
  })

  test('decrypt.path', () => {
    expect(decrypt.path(pattern, encryptedPath)).toEqual(actualPath)
  })
})
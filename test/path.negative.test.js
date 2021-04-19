const { encrypt, decrypt } = require('../src')

describe('Failure case: Crypto Path Encrypt - Without Options', () => {
  let pattern = '/modules/provider/:id/tasks/:action'
  test('encrypt.path', () => {
    expect(() => encrypt.path(pattern)).toThrow('options is missing')
  })
})

describe('Failure case: Crypto Path Encrypt - Without Pattern', () => {
  test('encrypt.path', () => {
    expect(() => {
      encrypt.path()
    }).toThrow('pattern is missing')
  })
})

describe('Failure case: Crypto Path Encrypt - Without encrypted Path', () => {
  let pattern = '/modules/provider/:id/:action/tasks'
  test('decrypt.path', () => {
    expect(() => decrypt.path(pattern)).toThrow('encrypted path is missing')
  })
})

describe('Failure case: Crypto Path Encrypt - With invalid pattern key', () => {
  let pattern = '/modules/provider/:id/:action/tasks'
  test('encrypt.path', () => {
    expect(() => {
      encrypt.path(pattern, {
        ':id': '7d8bb2ff-04d8-4c3c-96c4-faafb6321432',
        ':action': 'view',
        'ssdg': 'sdgsd',
      })
    }).toThrow('pattern object contains invalid key')
  })
})

describe('Failure case: Crypto Path Encrypt - With invalid pattern', () => {
  let pattern = '/modules/provider/id/action/tasks'
  test('encrypt.path', () => {
    expect(() => {
      encrypt.path(pattern, {
        ':id': '7d8bb2ff-04d8-4c3c-96c4-faafb6321432',
        ':action': 'view',
      })
    }).toThrow('invalid pattern')
  })
})

describe('Failure case: Crypto Path Encrypt path/pattern starts - Without /', () => {
  let pattern = 'modules/provider/id/action/tasks'
  test('encrypt.path', () => {
    expect(() => {
      encrypt.path(pattern, {
        ':id': '7d8bb2ff-04d8-4c3c-96c4-faafb6321432',
        ':action': 'view',
      })
    }).toThrow('pattern/path should start with /')
  })
})

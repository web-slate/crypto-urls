const { encrypt } = require('../src')

describe('Crypto URLS Encrypt', () => {
    test('encrypt', () => {
        expect(encrypt()).toEqual('')
    })
})
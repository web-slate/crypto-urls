const { encrypt } = require('../src')

describe('Crypto URLS Encrypt', () => {
    test('encrypt', () => {
        expect(encrypt()).toEqual('https://testapp.com/modules/provider/WTq8zYcZfaWVvMncigHqwQ==')
    })
})
const { encrypt } = require('../src')

describe('Crypto URLS Encrypt', () => {
    test('encrypt', () => {
        expect(encrypt()).toEqual('https://v2demo.healthviewx.com/modules/provider/WTq8zYcZfaWVvMncigHqwQ==')
    })
})
const { encrypt } = require("../src");

describe("Crypto URLS Encrypt", () => {
  test("encrypt", () => {
    const actualUrl =
      'https://testapp.com/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432'
    const encryptedUrl =
      'https://testapp.com/modules/provider/WTq8zYcZfaWVvMncigHqwQ=='
    expect(encrypt(actualUrl)).toEqual(encryptedUrl);
  });
});

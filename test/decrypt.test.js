const { decrypt } = require("../src");

describe("Crypto URLS Decrypt", () => {
  test("decrypt", () => {
    expect(decrypt()).toEqual(
      "https://testapp.com/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432"
    );
  });
});

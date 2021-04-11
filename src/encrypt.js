const Url = require("url-parse");
const CryptoJS = require("crypto-js");

const encrypt = (givenUrl, options) => {
  const { pattern } = options || {};
  // mocked for initial test.
  const parsedURL = Url(givenUrl);
  const { pathname } = parsedURL;
  console.log("parsedURL: ", parsedURL);
  
  const encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase").toString()
  const decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase").toString(CryptoJS.enc.Utf8)
  console.log("encrypted pathname: ", encrypted);
  console.log("decrypted pathname: ", decrypted);

  return "https://testapp.com/modules/provider/WTq8zYcZfaWVvMncigHqwQ==";
};

export { encrypt };

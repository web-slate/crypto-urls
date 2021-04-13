const Url = require("url-parse");
const CryptoJS = require("crypto-js");

const encrypt = (givenUrl, options = {} ) => {
  const pattern  = options.pattern || null;
  const secret = "Secret Passphrase"
 
  if(pattern === null)
    throw new Error('pattern is missing')

  // extract pattern from the url
  const parsedPatternURL = Url(pattern);
  const parsedGivenURL = Url(givenUrl);

  const patternPathnameArray = parsedPatternURL.pathname.split("/");
  const givenURLPathnameArray = parsedGivenURL.pathname.split("/");

  const filteredPatterns = patternPathnameArray.filter((param)=> param.indexOf(':') === 0);

  filteredPatterns.map((p) => { 
    let encryptedString = CryptoJS.AES.encrypt(givenURLPathnameArray[patternPathnameArray.indexOf(p)],secret).toString();
    //to escape `/` (forward slash) from encryption
    let escapedEncryptedString = encryptedString.replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l');
    givenURLPathnameArray[patternPathnameArray.indexOf(p)] = escapedEncryptedString
  })

  return `${parsedGivenURL.origin}${givenURLPathnameArray.join('/')}`
};

export { encrypt };

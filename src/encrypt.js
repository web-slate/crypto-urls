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

  const patternPathChunks = parsedPatternURL.pathname.split("/");
  const givenPathChunks = parsedGivenURL.pathname.split("/");

  const filteredPatterns = patternPathChunks.filter((param)=> param.indexOf(':') === 0);

  filteredPatterns.map((p) => { 
    let encryptedString = CryptoJS.AES.encrypt(givenPathChunks[patternPathChunks.indexOf(p)],secret).toString();
    //to escape `/` (forward slash) from encryption
    let escapedEncryptedString = encryptedString.replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l');
    givenPathChunks[patternPathChunks.indexOf(p)] = escapedEncryptedString
  })

  return `${parsedGivenURL.origin}${givenPathChunks.join('/')}`
};

export { encrypt };

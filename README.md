# crypto-urls

A JavaScript library to encrypt/decrypt URL & Path

## Install

```
npm i -S crypto-urls
```

## Usage

### `encrypt` methods

#### `encrypt.path(pattern,options)`

This method takes two parameters, `pattern` and `options`

- `pattern` of type _String_ the Path to be encrypted

  For example: `/m/:id/:action`

- `options` of type _Object_ with, key and value

  For example:

  ```
  {
    ':id':'7d8bb2ff-04d8-4c3c-96c4-faafb6321432',
    ':action':'view'
  }
  ```

#### `encrypt.url(url,options)`


This method takes two parameters, `url` and `options`

- `url` of type _String_ the URL to be encrypted

  For example: https://abc.com/m/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/view

- `options` of type _Object_ with,

  - `pattern` key which specifies which part of the path need to be encrypted

    For example: https://abc.com/m/:id/:action


### `decrypt` methods

#### `decrypt.path(pattern,encryptedPath)`

This method takes two parameters, `url` and `encryptedPath`

- `pattern` of type _String_ the Path to be encrypted

  For example: `/m/:id/:action`

- `encryptedPath` of type _String_ 

  For example: 
  ```
  /m/U2FsdGVkX1p1L2u3SR7Sufd4LxWbAVOcyFep1L2u3SS3tyeYxLTwMxEOwqZ58uGrMiSovHbvfo8qJlaF75up1L2u3S5s1L2a3S4hpZ6DMBV2m5s1L2a3S4hge1Q2u3A4le1Q2u3A4l/U2FsdGVkX18CRp1L2u3S4CViJayssQ6IdkFiR2HEsgCaNY7Poe1Q2u3A4l/
  ```

#### `decrypt.url(url,options)`

This method takes two parameters, `url` and `options`

- `url` of type _String_ the URL to be encrypted

  For example: https://abc.com/m/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/view

- `options` of type _Object_ with,

  - `pattern` key which specifies which part of the path need to be encrypted

    For example: https://abc.com/m/:id/:action

## Sample Code

```js
import { encrypt, decrypt } from 'crypto-urls'

// encrypt & decrypt path()
let pattern = '/modules/provider/:id/:action'
let patternObj = {
  ':id': '7d8bb2ff-04d8-4c3c-96c4-faafb6321432',
  ':action': 'view',
}

let encryptedPath = encrypt.path(pattern, patternObj)
let decryptedPath = decrypt.path(pattern, encryptedPath)

console.log(
  '\nencrypted path() - ',
  encryptedPath,
  '\n\ndecrypted path() - ',
  decryptedPath
)

// encrypt & decrypt url()
let givenUrl =
  'https://testapp.com/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/view'
let patternUrlObj = {
  pattern: 'https://testapp.com/modules/provider/:id/:action',
}

let encryptedUrl = encrypt.url(givenUrl, patternUrlObj)
let decryptedUrl = decrypt.url(encryptedUrl, patternUrlObj)

console.log(
  '\nencrypted url() - ',
  encryptedUrl,
  '\n\ndecrypted url() - ',
  decryptedUrl
)

```

##### Output

```
encrypted path() -  /modules/provider/U2FsdGVkX19Fvii3ib0w7lBJeM7R0yt4oBI0gUpxNjCSwp0d6cipzJJx1up1L2u3SGBc1tIg2f49UD9bEEs1L2a3S4hrncp1L2u3SwTeGge1Q2u3A4le1Q2u3A4l/U2FsdGVkX1p1L2u3SrCSDN2VGpwcSIHI3jbhXVIkZPxqyIBrke1Q2u3A4l 

decrypted path() -  /modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/view

encrypted url() -  https://testapp.com/modules/provider/U2FsdGVkX1p1L2u3Sfd8S02pXdUGqCONxCD334Sqy7ZYnFwf7mtBkjdOIMC5QHf9oNYp1L2u3SN73Wp6vJG0tvhciBQETdITBAe1Q2u3A4le1Q2u3A4l/U2FsdGVkX197InwmsHR4WpTs1L2a3S4hZ88An8gIURIs1L2a3S4hdp1L2u3SqDtKoe1Q2u3A4l 

decrypted url() -  https://testapp.com/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/view
```



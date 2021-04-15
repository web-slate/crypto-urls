# crypto-urls

A JavaScript library to encrypt/decrypt URL & Path

## Install

```
npm i -S crypto-urls
```

## Usage

### `encrypt` method

#### `encrypt.url(url,options)`


This method takes two parameters, `url` and `options`

- `url` of type _String_ the URL to be encrypted

  For example: https://abc.com/m/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/view

- `options` of type _Object_ with,

  - `pattern` key which specifies which part of the path need to be encrypted

    For example: https://abc.com/m/:id/:action

##### Sample code

```js
import { encrypt } from 'crypto-urls'
let actualUrl =
  'https://testapp.com/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/view'
let patternUrl = 'https://testapp.com/modules/provider/:id/:action'

let encryptedUrl = encrypt(actualUrl, {
  pattern: patternUrl,
})
console.log(encryptedUrl)
```

##### Output

```
https://testapp.com/modules/provider/U2FsdGVkX1p1L2u3SR7Sufd4LxWbAVOcyFep1L2u3SS3tyeYxLTwMxEOwqZ58uGrMiSovHbvfo8qJlaF75up1L2u3S5s1L2a3S4hpZ6DMBV2m5s1L2a3S4hge1Q2u3A4le1Q2u3A4l/U2FsdGVkX18CRp1L2u3S4CViJayssQ6IdkFiR2HEsgCaNY7Poe1Q2u3A4l
```

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

##### Sample code

```js
import { encrypt } from 'crypto-urls'
let pattern = '/m/:id/:action'

let encryptedPath = encrypt.path(pattern, {
  ':id': '7d8bb2ff-04d8-4c3c-96c4-faafb6321432',
  ':action': 'view',
})
console.log(encryptedPath)
```

##### Output

```
/m/U2FsdGVkX1p1L2u3SR7Sufd4LxWbAVOcyFep1L2u3SS3tyeYxLTwMxEOwqZ58uGrMiSovHbvfo8qJlaF75up1L2u3S5s1L2a3S4hpZ6DMBV2m5s1L2a3S4hge1Q2u3A4le1Q2u3A4l/U2FsdGVkX18CRp1L2u3S4CViJayssQ6IdkFiR2HEsgCaNY7Poe1Q2u3A4l/
```

### `decrypt` method

#### `decrypt.url(url,options)`

This method takes two parameters, `url` and `options`

- `url` of type _String_ the URL to be encrypted

  For example: https://abc.com/m/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/view

- `options` of type _Object_ with,

  - `pattern` key which specifies which part of the path need to be encrypted

    For example: https://abc.com/m/:id/:action

#### Sample code

```js
import { decrypt } from 'crypto-urls'
let actualUrl =
  'https://testapp.com/modules/provider/U2FsdGVkX1p1L2u3SR7Sufd4LxWbAVOcyFep1L2u3SS3tyeYxLTwMxEOwqZ58uGrMiSovHbvfo8qJlaF75up1L2u3S5s1L2a3S4hpZ6DMBV2m5s1L2a3S4hge1Q2u3A4le1Q2u3A4l/U2FsdGVkX18CRp1L2u3S4CViJayssQ6IdkFiR2HEsgCaNY7Poe1Q2u3A4l'
let patternUrl = 'https://testapp.com/modules/provider/:id/:action'

let decryptedUrl = decrypt.url(actualUrl, {
  pattern: patternUrl,
})
console.log(decryptedUrl)
```

##### Output

```
https://testapp.com/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/view
```

#### `decrypt.path(pattern,encryptedPath)`

This method takes two parameters, `url` and `encryptedPath`

- `pattern` of type _String_ the Path to be encrypted

  For example: `/m/:id/:action`

- `encryptedPath` of type _String_ 

  For example: `/m/U2FsdGVkX1p1L2u3SR7Sufd4LxWbAVOcyFep1L2u3SS3tyeYxLTwMxEOwqZ58uGrMiSovHbvfo8qJlaF75up1L2u3S5s1L2a3S4hpZ6DMBV2m5s1L2a3S4hge1Q2u3A4le1Q2u3A4l/U2FsdGVkX18CRp1L2u3S4CViJayssQ6IdkFiR2HEsgCaNY7Poe1Q2u3A4l/`

#### Sample code

```js
import { decrypt } from 'crypto-urls'
let pattern = '/modules/provider/:id/:action'
let encryptedPath =
  '/modules/provider/U2FsdGVkX1p1L2u3SR7Sufd4LxWbAVOcyFep1L2u3SS3tyeYxLTwMxEOwqZ58uGrMiSovHbvfo8qJlaF75up1L2u3S5s1L2a3S4hpZ6DMBV2m5s1L2a3S4hge1Q2u3A4le1Q2u3A4l/U2FsdGVkX18CRp1L2u3S4CViJayssQ6IdkFiR2HEsgCaNY7Poe1Q2u3A4l'

let decryptedUrl = decrypt.path(pattern, encryptedPath)
console.log(decryptedUrl)
```

##### Output

```
/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/view
```


# crypto-urls

A JavaScript library to encrypt/decrypt URL

## Install

```
npm i crypto-urls
```

## Usage

### encrypt(url,options)

This method takes two parameters - `url` and `options`

- `url` of type *String* the URL to be encrypted

    For example: https://abc.com/m/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/view

- `options`  of type *Object* with,
    -   `pattern` key which specifies which part of the path need to be encrypted

        For example: https://abc.com/m/:id/:action

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

The output of the encryption will be like

```
https://testapp.com/modules/provider/U2FsdGVkX1p1L2u3SR7Sufd4LxWbAVOcyFep1L2u3SS3tyeYxLTwMxEOwqZ58uGrMiSovHbvfo8qJlaF75up1L2u3S5s1L2a3S4hpZ6DMBV2m5s1L2a3S4hge1Q2u3A4le1Q2u3A4l/U2FsdGVkX18CRp1L2u3S4CViJayssQ6IdkFiR2HEsgCaNY7Poe1Q2u3A4l
```

### decrypt(url,options)

This method takes two parameters - `url` and `options`

- `url` of type *String* the URL to be encrypted

    For example: https://abc.com/m/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/view

- `options`  of type *Object* with,
    -   `pattern` key which specifies which part of the path need to be encrypted

        For example: https://abc.com/m/:id/:action

```js
import { decrypt } from 'crypto-urls'
let actualUrl =
  'https://testapp.com/modules/provider/U2FsdGVkX1p1L2u3SR7Sufd4LxWbAVOcyFep1L2u3SS3tyeYxLTwMxEOwqZ58uGrMiSovHbvfo8qJlaF75up1L2u3S5s1L2a3S4hpZ6DMBV2m5s1L2a3S4hge1Q2u3A4le1Q2u3A4l/U2FsdGVkX18CRp1L2u3S4CViJayssQ6IdkFiR2HEsgCaNY7Poe1Q2u3A4l'
let patternUrl = 'https://testapp.com/modules/provider/:id/:action'
let decryptedUrl = decrypt(actualUrl, {
  pattern: patternUrl,
})
console.log(decryptedUrl)
```

The output of the decryption will be like

```
https://testapp.com/modules/provider/7d8bb2ff-04d8-4c3c-96c4-faafb6321432/view
```

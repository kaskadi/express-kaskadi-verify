![](https://img.shields.io/github/package-json/v/kaskadi/express-kaskadi-verify)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/kaskadi/express-kaskadi-verify?color=blue)

**GitHub Actions workflows status**

[![Build workflow status](https://img.shields.io/github/workflow/status/kaskadi/express-kaskadi-verify/build?label=build&logo=mocha)](https://github.com/kaskadi/express-kaskadi-verify/actions?query=workflow%3Abuild)
[![Publish workflow status](https://img.shields.io/github/workflow/status/kaskadi/express-kaskadi-verify/publish?label=publish&logo=npm)](https://github.com/kaskadi/express-kaskadi-verify/actions?query=workflow%3Apublish)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/express-kaskadi-verify?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/express-kaskadi-verify)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/express-kaskadi-verify?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/express-kaskadi-verify)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/express-kaskadi-verify?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/express-kaskadi-verify)

<!-- You can add badges inside of this section if you'd like -->

****

<!-- automatically generated documentation will be placed in here -->
# Installation

```
npm i express-kaskadi-verify
```

# API documentation

## Modules
Module | Description
------ | -----------
[verifier] | Configure a new verifier instance.

## Functions

Name | Description
------ | -----------
[verify(options)] | Verification function.


## verifier

Configure a new verifier instance.

**Returns**: [`verify`] - Verification function  

| Param | Type | Description |
| --- | --- | --- |
| url | `string` | URL to the verification server used for verifying incoming requests. |

**Example**  
```js
const verify = require('express-kaskadi-verify')('http://localhost:3000') // instanciate a new verifier
const express = require('express')
const app = express()
const port = 4000

app.get('/issuer-example', verify({ issuer: ['my-issuer'] }), (req, res) => {
  res.json(req.user)
}) // verify against the JWT issuer

app.get('/admin', verify({ audience: ['admin'] }), (req, res) => {
  res.json(req.user)
}) // verify against the JWT audience

app.get('/some/subject', verify({ subject: ['some'] }), (req, res) => {
  res.json(req.user)
}) // verify against the JWT subject

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

## verify(options)

Verification function.

Provided a set of options, this will return an Express middleware usable inside an Express app. When using this middleware for an endpoint, the decoded JWT will be attached to the `request` object from Express so that it can be used in your code.

**Kind**: global function  
**Returns**: `function` - Express middleware  

| Param | Type | Description |
| --- | --- | --- |
| options | `Object` | Options sent for request verification. This can contain the usual JWT claims (`audience`, `issuer`, `subject`) as well as their expected values. |

<!-- LINKS -->

[verifier]:#verifier
[`verify`]:#verifyoptions
[verify(options)]:#verifyoptions
<!-- automatically generated documentation will be placed in here -->

<!-- You can customize this template as you'd like! -->
/**
 * Verification function.
 *
 * Provided a set of options, this will return an Express middleware usable inside an Express app. When using this middleware for an endpoint, the decoded JWT will be attached to the `request` object from Express so that it can be used in your code.
 *
 * @function verify
 *
 * @param {Object} options - Options sent for request verification. This can contain the usual JWT claims (`audience`, `issuer`, `subject`) as well as their expected values.
 * @return {function} Express middleware
 *
 */

/**
 * Configure a new verifier instance.
 *
 * @module verifier
 *
 * @param {string} url - URL to the verification server used for verifying incoming requests.
 * @return {verify} Verification function
 *
 * @example
 *
 * const verify = require('express-kaskadi-verify')('http://localhost:3000') // instanciate a new verifier
 * const express = require('express')
 * const app = express()
 * const port = 4000
 *
 * app.get('/issuer-example', verify({ issuer: ['my-issuer'] }), (req, res) => {
  res.json(req.user)
}) // verify against the JWT issuer
 *
 * app.get('/admin', verify({audience: ['admin'] }), (req, res) => {
  res.json(req.user)
}) // verify against the JWT audience
 *
 * app.get('/some/subject', verify({subject: ['some'] }), (req, res) => {
  res.json(req.user)
}) // verify against the JWT subject
 *
 * app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
 *
 */

const fetch = require('node-fetch')

function verifier (url) {
  return function verify (options) {
    const opt = JSON.stringify(options)
    return async (req, res, next) => {
      var result = await fetch(url, {
        headers: {
          'x-kaskadi-route-options': opt,
          authorization: ' Bearer ' + getToken(req)
        }
      })
      if (result.status === 200) {
        req.user = (await result.json()).user
        return next()
      } else {
        res.status(401).send(await result.json())
      }
    }
  }
}

function getToken (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    return req.query.token
  }
  return null
}

module.exports = verifier

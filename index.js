/**
 * You can use JSDoc comments in your `.js` files to generate automatically documentation for your package via the `generate-docs` workflow.
 *
 * @module help
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

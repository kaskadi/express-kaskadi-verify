/* eslint-env mocha */
const path = require('path')
const chai = require('chai')
const { assert } = require('chai')
chai.should()

// set environment
require('dotenv').config({ path: path.join(__dirname, '.env') })

// *************
// Write your tests here
describe('template-action', function () {
  // ******* Example test
  describe('Placeholder test', function () {
    this.timeout(30000)
    it('should pass', function () {
      const exp = true
      assert(exp === true, 'This cannot fail!')
    })
  })
  // *******
})
// *************

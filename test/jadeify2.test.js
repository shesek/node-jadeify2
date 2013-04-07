/* global describe, it */

var
  transform = require('./transform'),
  fs = require('fs')

require('should')

describe('node-jadeify2', function () {

  it('should compile Jade template', function (done) {
    transform(__dirname + '/simple/example.jade', function (err, output) {
      if (err) done(err)
      output.should.eql(fs.readFileSync(__dirname + '/simple/example.js').toString())
      done()
    })
  })

  it('should compile Jade template with include', function (done) {
    transform(__dirname + '/include/example.jade', function (err, output) {
      if (err) done(err)
      output.should.eql(fs.readFileSync(__dirname + '/include/example.js').toString())
      done()
    })
  })
})
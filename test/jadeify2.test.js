/* global describe, it */

var
  jadeify = require('..'),
  fs = require('fs')

require('should')

function transform(filename, callback) {
  var
    pipe = jadeify(filename),
    output = ''
  fs.createReadStream(filename).pipe(pipe)
  pipe.on('error', function (error) {
      callback(error)
    })
    .on('data', function (data) {
      output += data
    })
    .on('end', function () {
      callback(null, output)
    })
}

describe('node-jadeify2', function () {

  it('should compile Jade template', function (done) {
    transform(__dirname + '/example.jade', function (err, output) {
      if (err) done(err)
      output.should.eql(fs.readFileSync(__dirname + '/example.js').toString())
      done()
    })
  })
})
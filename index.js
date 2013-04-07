var
  through = require('through'),
  jade = require('jade'),
  relative = require('path').relative

module.exports = browjadify

function browjadify(file) {
  if (!/\.jade$/.test(file)) return through()

  var source = ''
  var stream = through(write, end)

  function write(buf) {
    source += buf
  }

  function end() {
    try {
      var result = compile(file, source)
      this.queue(result)
      this.queue(null)
    } catch (err) {
      stream.emit('error', err)
    }
  }

  return stream
}

function compile(file, source) {
  var template = jade.compile(source, {
    client: true,
    filename: relative(__dirname, file)
  })
  return [
    'var jade = require(\'jade/lib/runtime.js\');',
    'module.exports = ',
    template.toString()
  ].join('')
}


var through = require('through')
var jade = require('jade')

module.exports = browjadify

function browjadify(file, options) {
  if (!/\.jade$/.test(file)) return through()

  options || (options = {})
  options.client != null || (options.client = true)
  options.compileDebug != null || (options.compileDebug = false)
  options.filename || (options.filename = file)

  var source = ''
  var stream = through(write, end)

  function write(buf) {
    source += buf
  }

  function end() {
    try {
      var result = compile(file, source, options)
      this.queue(result)
      this.queue(null)
    } catch (err) {
      stream.emit('error', err)
    }
  }

  return stream
}

function compile(file, source, options) {
  var template = jade.compileClient(source, options)
  return [
    'var jade = require(\'jade/lib/runtime.js\');',
    'module.exports = ',
    template.toString()
  ].join('')
}


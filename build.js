var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var serve = require('metalsmith-serve');

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(markdown())
  .use(serve({}))
  .build(function(err) {
    if (err) {
      console.log(err)
    }
  })

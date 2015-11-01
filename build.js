var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(markdown())
  .build(function(err) {
    if (err) console.log(err)
  })

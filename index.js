var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var watch = require('metalsmith-watch');
var serve = require('metalsmith-serve');

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(markdown())
  .use(templates('handlebars'))
  .use(watch({
    paths: {
      "${source}/**/*": true,
      "templates/**/*": "**/*.md",
    },
    livereload: true,
  }))
  .use(serve({}))
  .build(function(err) {
    if (err) console.log(err)
  });

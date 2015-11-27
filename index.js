const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const templates = require('metalsmith-templates');
const watch = require('metalsmith-watch');
const serve = require('metalsmith-serve');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');

const Handlebars = require('handlebars');
const fs = require('fs');

const headerFile = fs.readFileSync('./templates/partials/header.hbt');
const footerFile = fs.readFileSync('./templates/partials/footer.hbt');

Handlebars.registerPartial('header', headerFile.toString());
Handlebars.registerPartial('footer', footerFile.toString());

Metalsmith(__dirname)
  .source('./src')
  .use(collections({
    pages: {
      pattern: 'content/pages/*.md'
    },
    posts: {
        pattern: 'content/posts/*.md',
        sortBy: 'date',
        reverse: true
    }
  }))
  .use(markdown())
  .use(permalinks({
    pattern: './:collection/:title'
  }))
  .use(templates('handlebars'))
  .destination('./build')
  .use(watch({
    paths: {
      "${source}/**/*": true,
      "templates/**/*": true,
    },
    livereload: true,
  }))
  .use(serve({}))
  .build(function(err) {
    if (err) console.log(err)
  });

const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const templates = require('metalsmith-templates');
const watch = require('metalsmith-watch');
const serve = require('metalsmith-serve');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const sass = require('metalsmith-sass');
const concat = require('metalsmith-concat');
const helpers = require('metalsmith-register-helpers');

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
  .use(helpers({
    'directory': './helpers/'
  }))
  .use(templates('handlebars'))
  .use(sass({
    outputStyle: 'expanded'
  }))
  .use(concat({
    files: 'styles/**/*.css',
    output: 'styles/app.css'
  }))
  .use(concat({
    files: [
      'js/**/jquery.js',
      'js/**/*.js'
    ],
    output: 'js/app.js'
  }))
  .destination('./build')
  .use(serve({
    port: 8000
  }))
  .use(watch({
    paths: {
      '${source}/**/*': true,
      'templates/**/*': true,
    },
    livereload: true,
  }))
  .build(function(err) {
    if (err) console.log(err)
  });

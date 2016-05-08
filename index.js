const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const collections = require('metalsmith-collections');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const sass = require('metalsmith-sass');
const concat = require('metalsmith-concat');

const Handlebars = require('handlebars');
const fs = require('fs');

Metalsmith(__dirname)
  .source('./src')
  .use(markdown())
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials'
  }))
  .use(permalinks({
    pattern: './:collection/:title'
  }))
  .use(sass({
    outputStyle: 'expanded'
  }))
  .use(concat({
    files: 'styles/**/*.css',
    output: 'styles/app.css'
  }))
  .use(concat({
    files: [
      'js/**/*.js'
    ],
    output: 'js/app.js'
  }))
  .destination('./gh-pages')
  .build(function(err) {
    if (err) console.log(err);
  });

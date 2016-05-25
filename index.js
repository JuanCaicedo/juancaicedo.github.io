const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const sass = require('metalsmith-sass');
const concat = require('metalsmith-concat');
const R = require('ramda');

const Handlebars = require('handlebars');
const fs = require('fs');

/* navbar functions */
const addPropertyToFile = R.curry(function(property, root, files, name) {
  files[name][property] = root;
});

const addProperty = R.curry(function(key, value, files) {
  const names = R.keys(files);
  R.forEach(addPropertyToFile(key, value, files), names);
});

Metalsmith(__dirname)
  .source('./src')
  .use(markdown())
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials'
  }))
  .use(permalinks({
    pattern: './:title'
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

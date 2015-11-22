const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const serve = require('metalsmith-serve');

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(markdown())
  .use(serve({}))
  .build((err) => { if (err) console.log(err) })

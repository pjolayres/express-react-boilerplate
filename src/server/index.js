const Express = require('express');
const serveStatic = require('serve-static');

const app = new Express();

app.use(serveStatic('src/client', {
  'index': ['index.html'],
  'dotfiles': 'ignore',
  'maxAge': '0d',
  'setHeaders': (res, path) => {
    if (serveStatic.mime.lookup(path) === 'text/html') {
      res.setHeader('Cache-Control', 'public, max-age=0');
    }
  }
}))

app.get('*', function(req, res) {
  res.status(404).end();
});

const preferredPort = process.env.PORT || 3000;

app.listen(preferredPort, (error) => {
  if (!error) {
    console.log(`📡  Running on port: ${preferredPort}`);
  }
});
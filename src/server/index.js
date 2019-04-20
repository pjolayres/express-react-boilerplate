const Express = require('express');
const serveStatic = require('serve-static');

const app = new Express();

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const publicConfig = require('../../webpack.config');

  const compiler = webpack(publicConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'error',
      publicPath: publicConfig.output.publicPath
    })
  );

  app.use(webpackHotMiddleware(compiler));
}

app.use(
  serveStatic('dist', {
    index: ['index.html'],
    dotfiles: 'ignore',
    maxAge: '0d',
    setHeaders: (res, path) => {
      if (serveStatic.mime.lookup(path) === 'text/html') {
        res.setHeader('Cache-Control', 'public, max-age=0');
      }
    }
  })
);

app.get('*', (req, res) => {
  res.status(404).end();
});

const preferredPort = process.env.PORT || 3000;

app.listen(preferredPort, error => {
  if (!error) {
    console.log(`📡  Running on port: ${preferredPort}`); // eslint-disable-line no-console
  }
});

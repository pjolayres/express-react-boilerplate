# Express and React Boilerplate

A boilerplate for a static React web client application built using Webpack and Babel. Also features an express server with support for Hot Module Reloading (HMR) for faster development.

## Quick Start
```shell
npm install
npm run dev
```

This will build the client web application into `/dist` folder and run an express web server with Hot Module Reloading (HMR) enabled.

## Production build
```shell
npm run build
```

This will build the client web application into `/dist` folder. The following files will be generated:

```bash
dist
├── index.html       <-- HTML entry point
├── report.html      <-- A report that shows the bundle size of each module
├── scripts.js       <-- Main application script
├── scripts.js.map
├── vendors.1.js     <-- Combined scripts from dependencies
└── vendors.1.js.map
```

## Features
- React
- Node.js
- Express
- ES6
- SCSS
- PostCSS
- Babel
- Webpack
- ES Lint
- Prettier
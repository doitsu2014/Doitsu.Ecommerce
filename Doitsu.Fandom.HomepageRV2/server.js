// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const express = require('express')
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const serverPort = process.env.PORT || 3000
app
  .prepare()
  .then(() => {
    const server = express()

    server.use(
      express.static(__dirname + '/staic')
    );
    server.get('/news/:slug', (req, res) => {
      const actualPage = '/news-detail'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/notice/:slug', (req, res) => {
      const actualPage = '/notice-detail'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(serverPort, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${serverPort}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })

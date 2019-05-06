const index = require("./.next/serverless/pages/index.js");
const about = require("./.next/serverless/pages/about.js");
const news = require("./.next/serverless/pages/news.js");
const newsDetail = require("./.next/serverless/pages/news-detail.js");
const notice = require("./.next/serverless/pages/notice.js");

const express = require("express");
const serverPort = process.env.PORT || 3000;

const server = express();
server.get("/", (req, res) => {
  return index.render(req, res);
});

server.get("/about", (req, res) => {
  return about.render(req, res);
});

server.get("/notice", (req, res) => {
  return notice.render(req, res);
});

server.get("/news", (req, res) => {
  return news.render(req, res);
});

server.get("/news/:slug", (req, res) => {
  const actualPage = "/news-detail";
  const queryParams = { slug: req.params.slug };
  newsDetail.render(req, res, queryParams);
});

server.listen(serverPort, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${serverPort}`);
});

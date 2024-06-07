/*jshint esversion: 6 */

"use strict";

const express = require("express");
let path = require("path");
// let bodyParser = require("body-parser");
const compress = require("compression");

const app = express();

// Comment from below this line.
// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See
// http://expressjs.com/api#app-settings for more details.
app.enable("trust proxy");

// Add a handler to inspect the req.secure flag (see
// http://expressjs.com/api#req.secure). This allows us
// to know whether the request was via http or https.
app.use(function (req, res, next) {
  console.log(new Date(), req.method, req.url);
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    next();
    // res.redirect('https://' + req.headers.host + req.url);
  }
});

// CORS

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  if ("OPTIONS" === req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compress());
app.get("*.js", function (req, res, next) {
  req.url = req.url + ".gz";
  res.set("Content-Encoding", "gzip");
  res.set("Content-Type", "text/javascript");
  next();
});
app.get("*.css", function (req, res, next) {
  req.url = req.url + ".gz";
  res.set("Content-Encoding", "gzip");
  res.set("Content-Type", "text/css");
  next();
});
app.use(express.static(__dirname + "/dist/yesican", { redirect: false }));

/////////////////////////////////////////////  Settings /////////////////////////////////////////////////////////////
app.all("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/yesican/index.html"));
});

// Start the app by listening on the port supplied or defaults to 8080
const HTTP_PORT = process.env.PORT || 8080;
app.listen(HTTP_PORT);
console.log(`listening on ${HTTP_PORT}`);

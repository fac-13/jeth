const fs = require('fs');
const path = require('path');
const { filter } = require('./logic');
const request = require('request');
const querystring = require('querystring');

const staticHandler = (response, filepath) => {
  const extension = filepath.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
  };

  fs.readFile(path.join(__dirname, '..', filepath), 'utf8', (error, file) => {
    if (error) {
      response.writeHead(500, { 'content-type': 'text/plain' });
      response.end('server error');
    } else {
      response.writeHead(200, { 'content-type': extensionType[extension] });
      response.end(file);
    }
  });
};

const apiHandler = (response, url) => {
  // THIS IS WHERE YOU SHOULD MAKE A REQUEST TO THE EXTERNAL API USING REQUEST - get the DATA
  // AND THEN LINK IT INTO THE LOGIC FILTER -- filter(DATA)
  // AND THEN RESPONSE.END(FILTERED DATA)
  const query = querystring
    .parse(url)
    ['/api/?q'].toLowerCase()
    .trim();

  const options = {
    method: 'GET',
    uri: `https://jobs.github.com/positions.json?location=${query}`,
  };
  request(options, (err, res, body) => {
    if (err) {
      console.log(err);
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1> There was an error on our end, try again later</h1>');
    } else {
      const bod = JSON.parse(body);
      if (bod.length === 0) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end('<h1> There were no results found</h1>');
      } else {
        const result = filter(bod);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(result));
      }
    }
  });
};

module.exports = {
  staticHandler,
  apiHandler,
};

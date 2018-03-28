const { staticHandler, apiHandler } = require('./handlers');

const router = (request, response) => {
  const url = request.url;

  if (url === '/') {
    staticHandler(response, 'public/index.html');
  } else if (url === '/error') {
    staticHandler(response, 'public/error.html');
  }else if (url.indexOf('public') !== -1) {
    staticHandler(response, url);
  } else if (url.indexOf('api') !== -1) {
    apiHandler(response, url);
  } else {
    response.writeHead(404, { 'content-type': 'text/plain' });
    response.end('404 error');
  }
};

module.exports = router;

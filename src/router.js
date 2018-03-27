const logic = require('./logic');
const { staticHandler, apiHandler } = require('./handlers');

const router = (request, response) => {
    const url = request.url;

    if (url === "/") {
        staticHandler(response, "public/index.html");
    } else if (url.indexOf("public") !== -1) {
        staticHandler(response, url);
    } else if (url.indexOf("api") !== -1) {
        console.log("search router reached");
        apiHandler(response, url);
    } else {
        response.writeHead(404, { "content-type": "text/plain" });
        response.end("404 error");
    }
};

module.exports = router;
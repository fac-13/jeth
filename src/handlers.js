const fs = require('fs');
const path = require('path');
const { filter } = require('./logic');
const request = require('request');

const staticHandler = (response, filepath) => {
    const extension = filepath.split('.')[1];
    const extensionType = {
        html: 'text/html',
        css: 'text/css',
        js: 'application/javascript',
        ico: 'image/x-icon',
        svg: 'image/svg+xml'
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
}

const apiHandler = (response, url) => {
    // THIS IS WHERE YOU SHOULD MAKE A REQUEST TO THE EXTERNAL API USING REQUEST - get the DATA
    // AND THEN LINK IT INTO THE LOGIC FILTER -- filter(DATA)
    // AND THEN RESPONSE.END(FILTERED DATA)
    // let result = logic.searchQuery(url);
    // response.writeHead(200, {'content-type': 'application/json'});
    // response.end(JSON.stringify(result));
}


module.exports = {
    staticHandler,
    apiHandler
};
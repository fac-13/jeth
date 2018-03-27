const querystring = require("querystring");
const dummy = require('./dummy');

const filter = (data) => {
    // FILTER OUT DATA
    const filteredData = [];
    const filteredObj = {};
    data.forEach(obj => {
        filteredObj.title = obj.title;
        filteredObj.location = obj.location;
        filteredObj.type = obj.type;
        filteredObj.company = obj.company;
        filteredData.push(filteredObj);
    });

    return filteredData;
}

// console.log(data);
filter(dummy);

module.exports = {filter};
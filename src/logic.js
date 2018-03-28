const querystring = require('querystring');
const dummy = require('./dummy');

const filter = (data) => {
  // FILTER OUT DATA
  const filteredData = [];

  data.forEach((obj) => {
    const filteredObj = {};
    filteredObj.title = obj.title;
    filteredObj.location = obj.location;
    filteredObj.type = obj.type;
    filteredObj.company = obj.company;
    filteredObj.url = obj.url;
    filteredData.push(filteredObj);
  });

  return filteredData;
};

module.exports = { filter };

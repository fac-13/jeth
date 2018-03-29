/* eslint-disable */
(function() {

  const alert = document.querySelector('.alert');
  const fetch = function(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        callback(response);
      } else if (xhr.readyState === 4 && xhr.status === 500) {
        const main = document.querySelector('.main');

        const alertHead = document.createElement('h1');
        const alertText = document.createTextNode('Oopsy doodle, there has been a problem');
        const bod = document.querySelector('.body');

        clearChildren(alert);
        alertHead.appendChild(alertText);
        alert.appendChild(alertHead);
      } else {
        console.log('XHR error', xhr.readyState);
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  };

  const inputField = document.querySelector('#js-input');
  const submitButton = document.querySelector('#js-button');
  const jobs = document.querySelector('.jobs');

  inputField.focus()
  // ---- EVENT LISTENER
  // ADD EVENT LISTENER TO THE SUBMIT BUTTON, GRAB THE URL
  // CALLS THE FETCH XHR REQUEST
  // PASSES IN THE CALLBACK FUNCTION - DOM MANIPULATION
  function buildURL() {
    const userInput = inputField.value.toLowerCase().trim();
    const url = `/api/?q=${userInput}`;
    return url;
  }

  function clearChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  submitButton.addEventListener('click', e => {
    clearChildren(jobs);
    e.preventDefault();
    fetch(buildURL(), displayJobs);
  });

  // ---- CALLBACK FUNCTION
  const displayJobs = function(arr) {
    clearChildren(alert);
    if (arr.length === 0) {
      const noresults = document.createTextNode('Sorry there are no results');
      alert.appendChild(noresults);
    } else {
      arr.forEach(obj => {
        const jobs = document.querySelector('.jobs');
        const job = document.createElement('section');
        const header = document.createElement('a');
        header.setAttribute('href', obj.url);
        const contentloc = document.createElement('p');
        const contenttyp = document.createElement('p');
        const contentcom = document.createElement('p');

        const headText = document.createTextNode('Job Title: ' + obj.title);
        const contloc = document.createTextNode('Location: ' + obj.location);
        const conttyp = document.createTextNode('Type: ' + obj.type);
        const contcom = document.createTextNode('Company: ' + obj.company);

        contentloc.appendChild(contloc);
        contenttyp.appendChild(conttyp);
        contentcom.appendChild(contcom);
        header.appendChild(headText);

        job.appendChild(header);
        job.appendChild(contentloc);
        job.appendChild(contenttyp);
        job.appendChild(contentcom);
        jobs.appendChild(job);
      });
    }
  };
})();

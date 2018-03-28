(function () {
  const fetch = function (url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        callback(response);
      } else if (xhr.readyState === 4 && xhr.status === 500) {
        const response = JSON.parse(xhr.responseText);
      } else {
        console.log('XHR error', xhr.readyState);
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  };

  const inputField = document.querySelector('#js-input');
  const submitButton = document.querySelector('#js-button');

  // ---- EVENT LISTENER
  // ADD EVENT LISTENER TO THE SUBMIT BUTTON, GRAB THE URL
  // CALLS THE FETCH XHR REQUEST
  // PASSES IN THE CALLBACK FUNCTION - DOM MANIPULATION
  function buildURL() {
    const userInput = inputField.value.toLowerCase().trim();
    const url = `/api/?q=${userInput}`;
    return url;
  }

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetch(buildURL(), displayJobs);
  });

  inputField.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      fetch(buildURL(), displayJobs);
    }
  });

  // ---- CALLBACK FUNCTION
  const displayJobs = function (arr) {
    arr.forEach((obj) => {
      const jobs = document.querySelector('.jobs');
      const job = document.createElement('section');
      const header = document.createElement('a');
      header.setAttribute('href', obj.url);
      const contentloc = document.createElement('p');
      const contenttyp = document.createElement('p');
      const contentcom = document.createElement('p');

      const headText = document.createTextNode(obj.title);
      const contloc = document.createTextNode(obj.location);
      const conttyp = document.createTextNode(obj.type);
      const contcom = document.createTextNode(obj.company);

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
  };
}());

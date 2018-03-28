(function () {
  // ---- XHR REQUEST
  console.log('hello jenath');
  const fetch = function (url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('fetch is working', url);
        const response = JSON.parse(xhr.responseText);
        callback(response);
      } else {
        console.log('XHR error', xhr.readyState);
      }
    });
    xhr.open('GET', url, true);
    xhr.send();
  };

  // ---- EVENT LISTENER
  // ADD EVENT LISTENER TO THE SUBMIT BUTTON, GRAB THE URL
  // CALLS THE FETCH XHR REQUEST
  // PASSES IN THE CALLBACK FUNCTION - DOM MANIPULATION

  const example = [
    {
      title: 'Senior Software Engineer',
      location: 'IRVINE',
      type: 'Full Time',
      company: 'Amare Global',
      url: 'http://jobs.github.com/positions/d298fc26-23c8-11e8-93b7-7517af18f83b',
    },
    {
      title: 'Senior Software Engineer',
      location: 'IRVINE',
      type: 'Full Time',
      company: 'Amare Global',
      url: 'http://jobs.github.com/positions/d298fc26-23c8-11e8-93b7-7517af18f83b',
    },
  ];

  // ---- CALLBACK FUNCTION
  const displayJobs = function (arr) {
    console.log('display jobs triggered');
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

  displayJobs(example);
}());

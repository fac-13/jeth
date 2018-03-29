const { filter } = require('./logic');
const test = require('tape');
const supertest = require('supertest');
const router = require('./router');
const dummy = require('./dummy.json');

test('Testing Tape is working', (t) => {
  t.equal(1, 1, 'Tape is working');
  t.end();
});

// --- TESTING FOR SERVER STUFF
test('check status code is 200', (t) => {
  supertest(router)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, 'check status code is 200');
      t.end();
    });
});

test('check status code is 404', (t) => {
  supertest(router)
    .get('/error')
    .expect(404)
    .expect('Content-Type', /plain/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.text, '404 error', "response should contain '404 error'");
      t.end();
    });
});

test('Check the response back from API is an array', (t) => {
  supertest(router)
    .get('/api/?q=london')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.error(err);
      t.equal(Array.isArray(res.body), true, 'Check the response back from API is an array');
      t.end();
    });
});

test('bad url - no results found', (t) => {
  supertest(router)
    .get('/api/?q=asdfasdkjfh')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.text, '[]', 'bad url - no results found');
      t.end();
    });
});

// --- TESTING FOR THE LOGIC FUNCTIONS
test('Filtered object contains 4 properties', (t) => {
  const actual = filter(dummy);
  if (Object.keys(actual[0]).length === 5) {
    t.pass('Object should contain 4 items');
  } else {
    t.fail('Object should contain 4 items');
  }
  t.end();
});

test('check if filtered data matches expected', (t) => {
    const actual = filter([dummy[0]]);
    const expected = [{
        "title": "Senior Software Engineer",
        "location": "IRVINE",
        "type": "Full Time",
        "company": "Amare Global",
        "url": "http://jobs.github.com/positions/d298fc26-23c8-11e8-93b7-7517af18f83b"
      }];
    t.deepEqual(actual, expected, 'response should contain title, location, type, company and url - but instead got ' + actual);
    t.end();
});

test('check if filtered data matches expected', (t) => {
    const actual = filter([dummy[1]]);
    const expected = [{"title": "Senior Backend Developer (PHP)",
    "location": "Rotterdam",
    "type": "Full Time",
    "company": "VONQ",
    "url": "http://jobs.github.com/positions/d3561f22-2382-11e8-93bc-c9d0d80b5c8a"}];
    t.deepEqual(actual, expected, 'response should contain title, location, type, company and url - but instead got ' + actual);
    t.end();
});

test('check if filtered data is an array', (t) => {
    const actual = Array.isArray(filter(dummy));
    const expected = true;
    t.equal(actual, expected, 'expected true, but instead got ' + actual);
    t.end();
})

// --- TESTING FOR THE LOGIC FUNCTIONS

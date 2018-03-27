const { filter } = require("./logic");
const test = require("tape");
const supertest = require("supertest");
const router = require("./router");
const dummy = require('./dummy.json');

test("Testing Tape is working", t => {
    t.equal(1, 1, "Tape is working");
    t.end();
});




// --- TESTING FOR SERVER STUFF

// --- TESTING FOR THE LOGIC FUNCTIONS
test("Filtered object contains 4 properties", t => {
    const actual = filter(dummy);
    if (Object.keys(actual[0]).length === 4) {
        t.pass('Object should contain 4 items');
    } else {
        t.fail('Object should contain 4 items');
    }
    t.end()
});


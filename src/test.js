const logic = require("./logic");
const test = require("tape");
const supertest = require("supertest");
const router = require("./router");

test("Testing Tape is working", t => {
    t.equal(1, 1, "Tape is not working");
    t.end();
});


// --- TESTING FOR SERVER STUFF

// --- TESTING FOR THE LOGIC FUNCTIONS
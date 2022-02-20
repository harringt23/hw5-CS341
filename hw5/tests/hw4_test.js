const fs = require('fs');
const request = require('supertest');
const express = require('express');
const app = express();
const router = express.Router();

test('Proper path set', () => {
    var appjs = fs.readFileSync('app.js', 'utf8');
    expect(appjs).toEqual(expect.stringContaining('app.use\(\'/orders\','));
});

// Credit:
// https://stackoverflow.com/questions/9517880/how-does-one-unit-test-routes-with-express#answer-33459311
test('Test JSON request returns 200', () => {
    router.get('/orders', function(req, res) {
        res.json({
            "error": null,
            "data": [
                { "topping": "cherry", "quantity": "2" },
                { "topping": "plain", "quantity": "6" },
                { "topping": "chocolate", "quantity": "3" }
            ]
        });
    });

    app.use(router);
    request(app).get('/orders').expect('Content-Type', /json/).expect(200).end(function(err, res) {
        // Do nothing
    });
});

// test('', () => {
//
// });
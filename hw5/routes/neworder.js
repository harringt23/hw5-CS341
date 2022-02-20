/* neworder.js
 * Homework 5 
 * @author Brynn Harrington
 * Date Modified: 10 Feb 2022
 * 
 * Modify the way that the router 
 * posts so the order is processed correctly
 * 
 * Used: https://www.w3schools.com/js/js_json_intro.asp
 */

// require the express and get the router
var express = require('express');
var router = express.Router();

// require the database management system
var dbms = require('./dbms.js');

// initialize function to insert orders
function insert_order(orderid, month, day, quantity, topping, notes, callback) {
    dbms.dbquery("INSERT INTO ORDERS VALUES (" + orderid + ", \"" + month + "\", " + day + ", " + quantity + ", \"" + topping + "\", \"" + notes + "\");",
        // print the information to the console for testing 
        function(error, results) {
            if (error == false) {
                console.log("[neworder.js] <insert_order> |  " + results);
            }
            // print the result to the server and return the error
            callback(error);
        }
    );
}

// have the router use this to call next function
router.use(function(req, res, next) {
    console.log("[orders.js] <router.use>    |  Redirecting router... ");
    next();
});

// post the information 
router.post('/', function(req, res, next) {
    // get the date value 
    console.log("[neworder.js] <router.post> |  Retrieving request detail...");
    const orderid = (new Date().valueOf()) % 2147483646;

    // get the month value 
    console.log("[neworder.js] <router.post> |  ...orderid created...");
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = months[Math.floor(Math.random() * 12)];
    console.log("[neworder.js] <router.post> |  ...month retrieved...");

    // get the day value using spicy math
    var day_set;
    if (month == "SEP" || month == "APR" || month == "JUN" || month == "NOV") {
        day_set = Math.floor(Math.random() * 29) + 1;
    } else if (month == "FEB") {
        day_set = Math.floor(Math.random() * 27) + 1;
    } else {
        day_set = Math.floor(Math.random() * 30) + 1;
    }

    // set the day 
    const day = day_set;
    console.log("[neworder.js] <router.post> |  ...day retrieved...");

    // set the quantity 
    const quantity = req.query.order.quantity;
    console.log("[neworder.js] <router.post> |  ...quantity retrieved...");

    // set the topping
    const topping = ("" + req.query.order.topping).toUpperCase();
    console.log("[neworder.js] <router.post> |  ...topping retrieved...");

    // set the notes
    const notes = req.query.order.notes;

    // TESTING - print values to the console 
    console.log("[neworder.js] <router.post> |  ...notes retrieved...");
    console.log("[neworder.js] <router.post> |  All elements properly retrieved");
    console.log("[neworder.js] <router.post> |  Formatting an INSERT operation for:");
    console.log("                            .      " + orderid + "\n                            .      ");
    console.log("                            .      " + month + "\n                            .      ");
    console.log("                            .      " + day + "\n                            .      ");
    console.log("                            .      " + quantity + "\n                            .      ");
    console.log("                            .      " + topping + "\n                            .      ");
    console.log("                            .      " + notes + "\n                            .      ");
    console.log("[neworder.js] <router.post> |  Sending INSERT request...");
    insert_order(orderid, month, day, quantity, topping, notes, function(error) {
        res.send(error);
    });
    // testing of the absolute callback hell
    get_num_orders("CHERRY", month, function(total_cherry) {
        console.log("[neworder.js] <router.post> |  Returned number for cherry: " + total_cherry);
        get_num_orders("PLAIN", month, function(total_plain) {
            console.log("[neworder.js] <router.post> |  Returned number for plain: " + total_plain);
            get_num_orders("CHOCOLATE", month, function(total_chocolate) {
                console.log("[neworder.js] <router.post> |  Returned number for chocolate: " + total_chocolate);
                var response = {
                    "error": null,
                    "data": [
                        { "topping": "cherry", "quantity": total_cherry },
                        { "topping": "plain", "quantity": total_plain },
                        { "topping": "chocolate", "quantity": total_chocolate }
                    ]
                };
                console.log("[neworder.js] <router.post> |  Client response prepared:");
                console.log("                            .      " + JSON.stringify(response));
                res.json(response);
                console.log("[neworder.js] <router.post> |  JSON Response has been sent!");
            });
        });
    });
});

module.exports = router;
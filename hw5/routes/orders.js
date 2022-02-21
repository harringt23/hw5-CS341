/* orders.js
 * Homework 5 
 * @author Brynn Harrington
 * Date Modified: 10 Feb 2022
 * 
 * Create a new route to access the orders data for the 
 * given month from the database and return that data to 
 * the client.
 * 
 * Used: https://www.w3schools.com/js/js_json_intro.asp
 */

// require the express and get the router
var express = require('express');
var router = express.Router();

// require the database management system
var dbms = require('./dbms.js');

// function to get the number of orders 
function get_num_orders(type, month, callback) {
    dbms.dbquery("SELECT QUANTITY FROM ORDERS WHERE MONTH='" + month + "' AND TOPPING='" + type + "';",
        function(error, results) {
            var total = 0;
            if (error != false) {
                total = "---";
                // testing 
                console.log("[orders.js] <dbms.dbquery>  |  Error! " + error);
            } else {
                for (row of results) {
                    total = total + row.QUANTITY;
                }
            }
            console.log("[orders.js] <dbms.dbquery>  |  Result for '" + type + "' query: " + total);
            callback(total);
        }
    );
}

router.use(function(req, res, next) {
    // testing
    console.log("[orders.js] <router.use>    |  Redirecting router... ");
    next();
});

router.post('/', function(req, res, next) {
    // testing 
    console.log("[orders.js] <router.post>   |  Retrieving request detail");
    const month = req.query.month;
    console.log("                            .      " + month + "\n                            .      ");
    console.log("[orders.js] <router.post>   |  Querying database for quantities for month of '" + month + "'...");
    // enter the callback 
    get_num_orders("CHERRY", month, function(total_cherry) {
        console.log("[orders.js] <router.post>   |  Returned number for cherry: " + total_cherry);
        get_num_orders("PLAIN", month, function(total_plain) {
            console.log("[orders.js] <router.post>   |  Returned number for plain: " + total_plain);
            get_num_orders("CHOCOLATE", month, function(total_chocolate) {
                console.log("[orders.js] <router.post>   |  Returned number for chocolate: " + total_chocolate);
                var response = {
                    "error": null,
                    "data": [
                        { "topping": "cherry", "quantity": total_cherry },
                        { "topping": "plain", "quantity": total_plain },
                        { "topping": "chocolate", "quantity": total_chocolate }
                    ]
                };
                console.log("[orders.js] <router.post>   |  Client response prepared:");
                console.log("                            .      " + JSON.stringify(response));
                res.json(response);
                console.log("[orders.js] <router.post>   |  JSON Response has been sent!");
            });
        });
    });
});

module.exports = router;
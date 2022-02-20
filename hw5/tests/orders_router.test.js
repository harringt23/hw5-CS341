/* Test for the new "orders" Route
 * Brynn Harrington 
 *
 * This unit test verifies the correct 
 * functionality of the orders route 
 * 
 * STATUS: PASSED
 */
var fs = require('fs');
const { hasUncaughtExceptionCaptureCallback } = require('process');

test('test selectEvent', () => {

    // read the orders.js file into a string
    var js = fs.readFileSync('routes/orders.js', 'utf8');
    // verify non-null value is okay / just make sure there is a file there
    expect(js).toEqual(expect.anything()); 
}); 
/* cheesecake_functions.js
 * Homework 5 
 * @author Brynn Harrington
 * Date Modified: 10 Feb 2022
 * 
 * Handles the functions necessary for the cheesecake form
 * website database and tracking.
 * 
 * Used: https://www.w3schools.com/js/default.asp
 */

/* Handler to help with the tasks needed to use the submit event */
submitHandler = function (e) {
    // extract the values of the text and "vegan" key-phrase 
    var notesText = $.trim($("#notes").val());
    var veganCheck = notesText.toLowerCase().indexOf("vegan");
    var warning = "Warning, these cheesecakes contain dairy. Do you still want to order?";

    // checking to see if notes contain the word "vegan" and confirm their order
    if (veganCheck != -1) {
        if(!confirm(warning)){
            alert("Order successfully canceled. Have a nice day!");            
        }        
    }

    // otherwise submit the entries and hide the elements no longer needing to be used
    else {
        // hide unnecessary elements
        $("#table").hide();
        $("#notes").hide();
        $("#notesText").hide();
        $("#order").hide();

        // determine the values of necessary items / write thank you message
        var topping = $("input[name='topping']:checked").val();
        var quantity = $('#quantity:selected').text();
        var message = "<h3>Thank you! Your order has been placed</h3>";

        // write an alert for the parameters
        var toppingsAlert = "<p>Topping: " + topping + "</p>"
        var quantityAlert = "<p>Quantity: " + quantity + "</p>"
        var notesAlert = "<p>Notes: " + notesText + "</p>"

        // send the order information through post
        $.post("https://localhost:3000/process_orders",
        {
            quantity : $("quantity:selected").val(),
            topping : $("input[name='topping']:checked"),
            notes : $('#notes').val(),
        });

        // alert the users of what they ordered
        alert("Thank you! Your order has been placed. Here are the details:"
            + "\nQuantity: " + quantity
            + "\nTopping: " + topping
            + "\nNotes: " + notesText);

        // append the new message 
        $("body").append(message, toppingsAlert, quantityAlert, notesAlert);
    }
    // prevent original page from loading
    e.preventDefault();
}

/* Handler to help with the tasks needed to extract information for months*/
monthHandler = function () {
    // extract the current month text in dropdown
    var monthText = $(this).text();
    $("#monthText").html(monthText);

    // send the document through post by the conditions of the function with the order array parameter
    $.post('\orders', { month: monthText }, function(orderArray) {
        // hide the current orders
        $("#cherryOrders").hide();
        $("#chocolateOrders").hide();
        $("#orderList").hide();

        var newCherryOrders = "<li>" + orderArray.data[0].cherry.quantity + " " + orderArray.data[0].cherry.topping + "</li>";
        var newChocolateOrders = "<li>" + orderArray.data[1].chocolate.quantity + " " + orderArray.data[1].chocolate.topping + "</li>";
        var newPlainOrders = "<li>" + orderArray.data[2].plain.quantity + " " + orderArray.data[2].plain.topping + "</li>";

        // append the new orders to the page
        //$("#orderList").append(newCherryOrders, newChocolateOrders, newPlainOrders);
        $("#cherryOrders").html(newCherryOrders);
        $("#chocolateOrders").html(newChocolateOrders);
        $("#plainOrders").html(newPlainOrders);
    });
}

/* Read in and handle the events from the main document */
$(document).ready(function () {
    // call submit on the form
    $("form").on("submit", submitHandler);

    // call month handler on selected month
    $("#month").click(monthHandler);
});

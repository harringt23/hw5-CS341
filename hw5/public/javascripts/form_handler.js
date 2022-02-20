/* form_handler.js
 * Homework 5 
 * @author Brynn Harrington
 * Date Modified: 10 Feb 2022
 * 
 * This is the handler for the forms
 * TODO - fix updating
 */

// handle the forms
form_submit_handler = function(e) {
        // stop the default behavior of refreshing the website
        e.preventDefault();

        // if the notes contains substring "vegan", post an alert and do nothing
        if (~($("#notes").val().toLowerCase()).indexOf("vegan")) {
            window.alert("WARNING: Cheesecake contains dairy, so it is not vegan!");
        } else {
            // extract the data for the type, quantity, notes
            var type = $("input[name='type']:checked").val();
            var quantity = $("#quantity").val();
            var notes = $("#notes").val();

            // initialize a new line variable for efficiency
            var new_line = "<br /><br />"

            // print the order
            $("form").html("Thank you!&nbsp;&nbsp;Here is your order:" + new_line);
            $("form").append("<span class=\"" + type + "\">" + quantity + " x " + type + " cheesecakes</span>" + new_line);
            $("form").append("Notes: <br />");
            $("form").append("<span class=\"notes\">" + notes + "</span>");

            // ceneter and format
            $("form").addClass("completed");

            // initialize the new order 
            var order = "/neworder?order[quantity]=" + quantity + "&order[topping]=" + type + "&order[notes]=" + notes;

            // send the new order through post
            $.post(order, function(error) {
                // inform user their order was placed  
                if (error == false) {
                    alert("Order placed successfully!");
                }
                // otherwise, alert them of the error
                else {
                    alert("There was an error placing your order!");
                }
            });
        }
    }
    // call on the submit handler when form action taken
$(function() {
    $("form").submit(form_submit_handler);
});
/* dropdown_handler.js
 * Homework 5 
 * @author Brynn Harrington
 * Date Modified: 10 Feb 2022
 * 
 * This is the handler for the drop down menu.
 * 
 * Note: This only works if nothing is manually 
 * in the express is modified. If someone added 
 * the "current-month" class to  another month
 * div, that one would be toggled instead.
 */

// handler for the dropdown
dropdown_title_handler = function(e) {
    // extract the first element in the dropdown with class "current-month"
    var month = $("#months").children(".current-month")[0];

    // remove the "current-month" class from the element, making it visible
    $(month).removeClass("current-month");

    // update the selector/widget's current text to the month selected
    var month_string = $(this).html();
    $("#selector").html(month_string);

    // remove that month from the menu by updating it to the "current-month" class
    $(this).addClass("current-month");

    // send the post
    $.post("/orders?month=" + month_string.toUpperCase(), function(data) {
        $("#cherry-quantity").html(JSON.stringify(data.data[0].quantity));
        $("#chocolate-quantity").html(JSON.stringify(data.data[1].quantity));
        $("#plain-quantity").html(JSON.stringify(data.data[2].quantity));
    });
}

// determine if a month was clicked - if so, call the function 
$(function() {
    // If a month in the dropdown is clicked
    $(".month").click(dropdown_title_handler);
});
/* orders_placed.js
 * Homework 5 
 * @author Brynn Harrington
 * Date Modified: 10 Feb 2022
 * 
 * This is the handler for the forms
 */

arrow_change_handler = function(e) {
    $("#testimonial-arrow").toggleClass("mirrored");
}

$(function() {
    // If the testamonial card is "mouseover'd" or "mouseout'd", toggle the direction of the arrow.
    $("#testimonials").mouseover(arrow_change_handler).mouseout(arrow_change_handler);
});
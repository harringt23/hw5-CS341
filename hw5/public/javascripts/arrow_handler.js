/* arrow_handler.js
 * Homework 5 
 * @author Brynn Harrington
 * Date Modified: 10 Feb 2022
 * 
 * This is the handler for the arrow
 */

arrow_change_handler = function(e) {
    $("#onial-arrow").toggleClass("mirrored");
}

$(function() {
    // If the testamonial card is "mouseover'd" or "mouseout'd", toggle the direction of the arrow.
    $("#onials").mouseover(arrow_change_handler).mouseout(arrow_change_handler);
});
/* Author: Dylan Kramis
 * Version: 1/27/2022
 */

/* orderClick
 * Prosesses orders and displays appropriate messages for specific inputs.
 */
function orderClick() {

    // gets text
    var notesText = document.getElementById("notes").value;

    // alerts customer if 'vegan' is found in the notes
    if (notesText.indexOf('vegan') > -1) {
        alert("WARNING: Cheesecake contains dairy, which is an animal product and therefore not vegan!");

        // otherwise hides order form and thanks user
    } else {
        document.getElementById("order-form").style.display = "none";
        document.getElementById("order-button").style.display = "none";
        document.getElementById("thank-you-message").style.display = "block";
    }
}

/* changeMonth
 * Changes the month for which order history is displayed.
 */
function changeMonth(newMonth) {
    document.getElementById("month").textContent = newMonth;
}
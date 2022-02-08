/* Author: Dylan Kramis
 * Version: 2/7/2022
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
  // changes the month displayed in text
  document.getElementById("month").textContent = newMonth;

  // requests order data through post
  $.post("/orders", { month: newMonth }, function (data) {

    // if received, data from each order will be used to update the page
    for (let i = 0; i < data.length; i++) {

      // checks parameters to determine how to update data. 
      // NOTE: currently not set up to handle multiple order records of the same topping!
      if (data[i].topping == "cherry") {
        document.getElementById("cherry-count").textContent = data[i].quantity + " cherry";
      } else if (data[i].topping == "chocolate") {
        document.getElementById("chocolate-count").textContent = data[i].quantity + " chocolate";
      } else if (data[i].topping == "plain") {
        document.getElementById("plain-count").textContent = data[i].quantity + " plain";
      }
    }
  });
}
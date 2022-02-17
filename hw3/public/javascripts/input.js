/* input.js
 * Processes inputs from the webpage and posts requests to the server.
 * 
 * Author: Dylan Kramis
 * Version: 2/16/2022
 * Issues: Special instructions/notes box doesn't always accept text.
 */

/* orderClick
 * Prosesses orders and displays appropriate messages for specific inputs.
 */
function orderClick() {

  // gathers test in notes
  var notesText = document.getElementById("notes").value;

  // alerts customer if 'vegan' is found in the notes
  if (notesText.indexOf('vegan') > -1) {
  alert("WARNING: Cheesecake contains dairy, which is an animal product and therefore not vegan!");

  // otherwise submits order and thanks user
  } else {

    // detects complicated oreder fields and retrieves data
    var quantity = document.getElementById("quantity-select").value;

    var topping;// radio button handler
    if (document.getElementById("chocolate-radio").checked) {
      topping = "chocolate";
    } else if (document.getElementById("cherry-radio").checked) {
      topping = "cherry";
    } else if (document.getElementById("plain-radio").checked) {
      topping = "plain";
    } else {// default response, asks user to select a topping
      alert("Please select a topping.");
      return;
    }

    // sends post request to log order
    $.post("/neworder", { quantity: quantity, topping: topping, notes: notesText }, function (data) {

      // hides order form and reveals thank you message if order successful
      if (data == "success") {
        document.getElementById("order-form").style.display = "none";
        document.getElementById("order-button").style.display = "none";
        document.getElementById("thank-you-message").style.display = "block";
      } else {// alerts if unsuccessful
        alert("Sorry, you order could not be processed.")
      }
    });
  }
}

/* changeMonth
 * Changes the month for which order history is displayed.
 */
function changeMonth(month) {
  // changes the month displayed in text
  document.getElementById("month-text").textContent = month;

  // requests order data through post
  $.post("/orders", { key: month }, function (data) {

    // if "no connection" received, update text to say so
    if (data == "no connection") {
      document.getElementById("cherry-count").textContent = "no connection";
      document.getElementById("chocolate-count").textContent = "no connection";
      document.getElementById("plain-count").textContent = "no connection";
    }

    //else, count up order data and display
    else {

      // order quantities
      var cherryQuantity = 0, chocolateQuantity = 0, plainQuantity = 0;

      // updates quantities for each order
      for (let i = 0; i < data.length; i++) {

        // checks parameters to determine how to update data. 
        if (data[i].TOPPING == "cherry") {
          cherryQuantity += data[i].QUANTITY;
        } else if (data[i].TOPPING == "chocolate") {
          chocolateQuantity += data[i].QUANTITY;
        } else if (data[i].TOPPING == "plain") {
          plainQuantity += data[i].QUANTITY;
        }
      }

      // updates text display
      document.getElementById("cherry-count").textContent = cherryQuantity + " cherry";
      document.getElementById("chocolate-count").textContent = chocolateQuantity + " chocolate";
      document.getElementById("plain-count").textContent = plainQuantity + " plain";
    }
  });
}
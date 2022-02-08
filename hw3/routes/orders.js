/* Author: Dylan Kramis
 * Version: 2/7/2022
 */

const express = require('express');
const router = express.Router();


// creates data
const data = [];
data[0] = { topping: "cherry", quantity: 2 };
data[1] = { topping: "plain", quantity: 6 };
data[2] = { topping: "chocolate", quantity: 3 };

// gets data for displaying json in browser
router.get('*', function (req, res, next) {
  res.json(data);
});
 
// send json to client issuing post request
// NOTE: for future reference, you might want to clarify that "app" isn't needed
router.post('*', function (req, res, next) {
  res.json(data);
});

module.exports = router;
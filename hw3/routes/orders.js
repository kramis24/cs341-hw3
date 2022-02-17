/**orders.js
 * Handle post requests for order data and 
 * 
 * Author: Dylan Kramis
 * Version: 2/14/2022 FINAL
 */

//requirements
const express = require('express');
const router = express.Router();
const dbms = require('./dbms.js');

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

  // connect to mysql, issue query, process results with function
  dbms.dbquery("SELECT * FROM ORDERS;", function (error, result) {

    // filters through data and sends if no error
    if (error == false) {

      // return array
      var monthData = [];

      // loops through return and adds data matching month to return array
      for (let i = 0; i < result.length; i++) {
        if (result[i].MONTH == req.body.key.toUpperCase()) {
          monthData.push(result[i]);
        }
      }

      if (monthData.length == 0) {// message if no orders found, there isn't actually
        res.send("no data");      // any special code necessary to handle this
      } else {// sends json if data exists
        res.json(monthData);
      }
    }

    // sends error message if an error prevents connection to database
    else {
      res.send("no connection");
    }
  });

  // return data as json, dummied out
  //res.json(data);
});

module.exports = router;
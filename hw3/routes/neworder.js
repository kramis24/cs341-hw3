/**newOrder.js
 * Handles post requests for new orders
 * 
 * Author: Dylan Kramis
 * Version: 2/16/2022 FINAL
 */

// requirements
const express = require('express');
const router = express.Router();
const dbms = require('./dbms.js');

// function for handling post requests
router.post('*', function (req, res, next) {

  // checks to makes sure values exist
  if (req.body.quantity != null && req.body.topping != null && req.body.notes != null) {

    // obtains new order id before sending data
    dbms.dbquery("SELECT * FROM ORDERS;", function (error, orders) {

      // if no error, proceed to insert new table data
      if (error == false) {
        dbms.dbquery("INSERT INTO ORDERS (ORDERID, MONTH, DAY, QUANTITY, TOPPING, NOTES) VALUES("
          + orders.length + ", "
          + "\"JUL\", "// fixed month to july
          + (Math.floor(Math.random() * 31) + 1) + ", "
          + req.body.quantity + ", "
          + "\"" + req.body.topping + "\", "
          + "\"" + req.body.notes + "\");",
          function (error, result) {

            // relays success if no problems occur with query
            if (error == false) {
              res.send("success");
            } else {// else error
              res.send("error");
            }
          }
        );

      } else {// error
        res.send("error");
      }
    });

  } else {// error
    res.send("error");
  }

});

module.exports = router;
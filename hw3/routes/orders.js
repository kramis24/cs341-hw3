var express = require('express');
var router = express.Router();

// creates data
const data = [];
data[0] = { topping: "cherry", quantity: 2 };
data[1] = { topping: "plain", quantity: 6 };
data[2] = { topping: "chocolate", quantity: 3 };

//const dataJSON = JSON.stringify(data);
 
// display json in browser
router.get('/', function (req, res, next) {
    res.json(data);
})

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render("index.ejs");

});

/* GET Time */
router.get('/:time', function (req, res, next) {
  var result = {};
  var date = getDate(req.params.time);
  if (date === undefined) {
    result.unix = null;
    result.natural = null;
  } else {
    result.unix = date.getTime() / 1000;
    result.natural = date;
  }
  res.send(JSON.stringify(result));
});

function getDate(time) {
  var d;
  if (isUnixTime(time)) {
    d = new Date(time * 1000);
  } else {
    d = new Date(time);
  }

  if (d.toString() === "Invalid Date") {
    return undefined;
  } else {
    return d;
  }
}
function isUnixTime(time) {
  var num = parseInt(time);
  return !isNaN(num);
}

module.exports = router;

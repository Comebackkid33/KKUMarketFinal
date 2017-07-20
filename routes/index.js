var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {

    var fs = require('fs');
    var Cities = JSON.parse(fs.readFileSync('./public/JSON/Cities.JSON', 'utf8'));
    res.render('index',{title:"ККУ",Cities: Cities});
});



module.exports = router;

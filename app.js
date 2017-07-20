var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'KovrovKuBot@gmail.com',
        pass: 'KovrovKuBot1'
    }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);




//получить цену на мешки
app.post('/bag_price', function(req, res) {

    var r = req.body;
    var result = countSumBag(r.Fraction,r.Count);
    res.send(result);
});

//получить цену на кучи
app.post('/stack_price', function(req, res) {

    var r = req.body;
    var result = countSumStack(r.Fraction,r.Count,r.City);
    res.send(result);
});

function searchFr(fraction, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].Fraction === fraction) {
            return myArray[i].Price;
        }
    }
}
function searchCt(count,city, myArray){
    var res = 0;
    for (var i=0; i < myArray.length; i++) {

        if (myArray[i].City === city) {

          res += myArray[i].Price2 * count/30;

          if(count%30<=5){
              res += myArray[i].Price1;
          }
          else{
              res += myArray[i].Price2;
          }
        }
    }
    return res;
}
/////////////////////////////////////////////////////////////////

//делаем заказ мешками
app.post('/make_bag_price', function(req, res) {

    var r = req.body;
    var price = countSumBag(r.bagPrice[0],r.bagPrice[1])

    var mailOptions = {
        from: 'KovrovKuBot@gmail.com',
        to: 'kurganovk@gmail.com',
        subject: 'Новый заказ',
        text: 'Тип: Мешки \nДата:' +  Date()+'\nКлиент: '+r.bagName +'\nТелефон: ' + r.bagPhone + '\nФракция: '+ r.bagPrice[0] + '\nКоличество мешков: ' + r.bagPrice[1] +' шт.' + '\nЦена: ' + price +' руб'

    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.render('success');
        }
    });
});

function countSumBag(fr,count){

    var fs = require('fs');
    var prices = JSON.parse(fs.readFileSync('./public/JSON/Prices.JSON', 'utf8'));

    var resObj = searchFr(fr, prices);
    var result = Number((count * resObj).toFixed(2));

    return result.toString();
}
/// заказ россыпи
app.post('/make_stack_price', function(req, res) {

    var r = req.body;
    var price = countSumStack(r.stackPrice[0],r.stackPrice[1],r.stackPrice[2])

    var mailOptions = {
        from: 'KovrovKuBot@gmail.com',
        to: 'kurganovk@gmail.com',
        subject: 'Новый заказ',
        text: 'Тип: Навалом \nДата:' +  Date()+'\nКлиент: '+r.stackName +'\nТелефон: ' + r.stackPhone + '\nФракция: '+ r.stackPrice[0] + '\nМасса: ' + r.stackPrice[1] +' т' +'\nДоставка: '+ r.stackPrice[2] + '\nЦена: ' + price +' руб'

    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.render('success');
        }
    });
});

function countSumStack(fr,count,city){

    var fs = require('fs');
    var prices = JSON.parse(fs.readFileSync('./public/JSON/Prices.JSON', 'utf8'));
    var cities = JSON.parse(fs.readFileSync('./public/JSON/Cities.JSON', 'utf8'));

    var resObj = searchFr(fr, prices);
    var deliveryPrice = searchCt(count,city,cities);

    var result = Number((count * resObj + deliveryPrice).toFixed(2));

    return result.toString();
}


//////////////////////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

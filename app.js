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


////////////////////////////
//support /send_report
//////////////////////
app.post('/send_report', function(req, res) {

    var r = req.body;


    var mailOptions = {
        from: 'KovrovKuBot@gmail.com',
        to: 'Sales@kovrovskoe.ru',
        subject: 'Новое обращение в поддержку',
        text: ' Дата:' +  Date()+'\nКлиент: '+r.name +'\nТелефон: ' + r.phone

    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send('ok');
        }
    });
});

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
            return myArray[i];
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
    var price = countSumBag(r.bagPrice[0],r.bagPrice[1]);

    var mailOptions = {
        from: 'KovrovKuBot@gmail.com',
        to: 'Sales@kovrovskoe.ru',
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
    var prices =   frJson;


    var resObj = searchFr(fr, prices);
    var result = Number((count * resObj.PriceBag).toFixed(2));

    return result.toString();
}
/// заказ россыпи
app.post('/make_stack_price', function(req, res) {

    var r = req.body;
    var price = countSumStack(r.stackPrice[0],r.stackPrice[1],r.stackPrice[2])

    var mailOptions = {
        from: 'KovrovKuBot@gmail.com',
        to: 'Sales@kovrovskoe.ru',
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
    var prices = frJson;
    var cities = cityJson;

    var resObj = searchFr(fr, prices);
    var deliveryPrice = searchCt(count,city,cities);

    var result = Number((count * resObj.Price + deliveryPrice).toFixed(2));

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

var frJson = [
    {
        Fraction: '5(3) - 20 мм М400',
        Price: 499,
        PriceBag: 99
    },
    {
        Fraction: '20 - 40 мм М400',
        Price: 449,
        PriceBag: 90
    },
    {
        Fraction: '40 - 70мм М400',
        Price: 399,
        PriceBag: 0
    },
    {
        Fraction: '5(3) - 10мм М300',
        Price: 419,
        PriceBag: 90
    },
    {
        Fraction: '5(3) - 20мм М300',
        Price: 399,
        PriceBag: 0
    },
    {
        Fraction: '20 - 40мм М300',
        Price: 350,
        PriceBag: 0
    },
    {
        Fraction: '5 - 20мм М200',
        Price: 319,
        PriceBag: 0
    },
    {
        Fraction: '20 - 40мм М200',
        Price: 289,
        PriceBag: 0
    },
    {
        Fraction: '40 - 70мм М200',
        Price: 269,
        PriceBag: 0
    }
];

var cityJson = [
    {
        City: 'Самовывоз',
        Price1: 0,
        Price2: 0
    },
    {
        City: 'г.Ковров по городу',
        Price1: 2130,
        Price2: 3190
    },
    {
        City: 'Бабенки',
        Price1: 1810,
        Price2: 2660
    },
    {
        City: 'Близнино',
        Price1: 3190,
        Price2: 4780
    },
    {
        City: 'Брызгалово',
        Price1: 2870,
        Price2: 3720
    },
    {
        City: 'Великово',
        Price1: 2130,
        Price2: 3190
    },
    {
        City: 'Владимир город',
        Price1: 6910,
        Price2: 9560
    },
    {
        City: 'Восход',
        Price1: 3190,
        Price2: 4780
    },
    {
        City: 'Вязники город',
        Price1: 6380,
        Price2: 8500
    },
    {
        City: 'Гигант',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Глебово',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Говядиха',
        Price1: 2130,
        Price2: 3190
    },
    {
        City: 'Голышево',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Гороженово',
        Price1: 2130,
        Price2: 3190
    },
    {
        City: 'Гостюхино',
        Price1: 2130,
        Price2: 3190
    },
    {
        City: 'Гридино',
        Price1: 2130,
        Price2: 3190
    },
    {
        City: 'Достижение',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Дроздовка',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Душкино',
        Price1: 3720,
        Price2: 5310
    },
    {
        City: 'Заря',
        Price1: 2130,
        Price2: 3190
    },
    {
        City: 'Игумново',
        Price1: 2130,
        Price2: 3190
    },
    {
        City: 'Ильино',
        Price1: 3190,
        Price2: 4780
    },
    {
        City: 'Камешково город',
        Price1: 3720,
        Price2: 5310
    },
    {
        City: 'Клязьминский городок',
        Price1: 3190,
        Price2: 4780
    },
    {
        City: 'Княгинино',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Красный Маяк',
        Price1: 3190,
        Price2: 4780
    },
    {
        City: 'Красный Октябрь',
        Price1: 3190,
        Price2: 4780
    },
    {
        City: 'Крестниково',
        Price1: 3190,
        Price2: 4780
    },
    {
        City: 'Крутово',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Кузнечиха',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Кусакино',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Малыгино (Малышево)',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Маринино',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Марьино',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Медынцево',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Мелехово',
        Price1: 1600,
        Price2: 2660
    },
    {
        City: 'Мстера',
        Price1: 3720,
        Price2: 5310
    },
    {
        City: 'Нерехта',
        Price1: 2130,
        Price2: 3720
    },
    {
        City: 'Новинки',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Новый',
        Price1: 2130,
        Price2: 3720
    },
    {
        City: 'Новки',
        Price1: 3190,
        Price2: 4780
    },
    {
        City: 'Павловское',
        Price1: 2130,
        Price2: 3720
    },
    {
        City: 'Пантелеево',
        Price1: 3720,
        Price2: 5310
    },
    {
        City: 'Пакино',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Первомайский п. (птичник)',
        Price1: 1600,
        Price2: 2660
    },
    {
        City: 'Погост',
        Price1: 2130,
        Price2: 3720
    },
    {
        City: 'Приволье',
        Price1: 3190,
        Price2: 5310
    },
    {
        City: 'Ручей',
        Price1: 2130,
        Price2: 3720
    },
    {
        City: 'Санниково',
        Price1: 3720,
        Price2: 5310
    },
    {
        City: 'Сан.им.Абельмана',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Сенино',
        Price1: 2130,
        Price2: 3720
    },
    {
        City: 'Сенинские Дворики',
        Price1: 2130,
        Price2: 3720
    },
    {
        City: 'Смолино',
        Price1: 3190,
        Price2: 4780
    },
    {
        City: 'Старая деревня',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Степаново',
        Price1: 2660,
        Price2: 2450
    },
    {
        City: 'Сувориха',
        Price1: 3190,
        Price2: 4780
    },
    {
        City: 'Суханиха',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Троицко-Никольское',
        Price1: 2130,
        Price2: 3720
    },
    {
        City: 'Уваровка',
        Price1: 3190,
        Price2: 4780
    },
    {
        City: 'Усолье',
        Price1: 3190,
        Price2: 4780
    },
    {
        City: 'Филино',
        Price1: 3190,
        Price2: 4780
    },
    {
        City: 'Чернево',
        Price1: 1810,
        Price2: 2660
    },
    {
        City: 'Черноситово',
        Price1: 1600,
        Price2: 2660
    },
    {
        City: 'Шевинская',
        Price1: 3190,
        Price2: 5310
    },
    {
        City: 'Шмелево',
        Price1: 2870,
        Price2: 4250
    },
    {
        City: 'Эсино (Иваново-Эсино)',
        Price1: 2660,
        Price2: 4250
    },
    {
        City: 'Юдиха',
        Price1: 3720,
        Price2: 5310
    },
    {
        City: 'Юрино',
        Price1: 3720,
        Price2: 5310
    },
    {
        City: 'Другое',
        Price1: 0,
        Price2: 0
    }
];
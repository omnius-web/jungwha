// Index_ROUTER
var express = require('express');
var router = express.Router();
var path = require('path');
var dbOpt = require('../models/db');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var calMod = require('../models/calendar');
var solarHoliday = require('../models/solarholiday');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var excel = require('../models/excel');

var db = mysql.createConnection(dbOpt);


db.connect();
var sessionStore = new MySQLStore(dbOpt);

router.use(session({
  secret: 'dhasldjtmtptus',
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}))

router.use(bodyParser.urlencoded({ extended: false }));
var passport = require('../models/passport')(router);

router.get('/',function(req,res){
  res.send('SERVER SET...');
})

router.get('/db',function(req,res){
  console.log(req.user);
  db.query(`SELECT * FROM test`,function(err,data){
    if(err){
      throw err;
    }
    console.log(data);
    var yyu = `<a>${data[0].wr2}</a>`;
    res.send(yyu);
    //res.render('index',{title:data, name:"omnius"});
  });
});

router.get('/omnius',function(req,res){
  //var omPw = path.parse(req.params.pw).base;
  var rstSend = {
    auth: req.user
  }
  res.render('index',rstSend);

});




// Excel4Node
router.get('/excel',function(req,res){
  var excelRst = excel();
  excelRst.write('Excel.xlsx',res);
});
// Excel4Node




// Calendar
router.post('/calendar',function(req,res){
  var year = req.body.year;
  var month = req.body.month;
  var rstCalendar = calMod(year,month);
  var holiday = solarHoliday(rstCalendar.rstcalendar,year,month);
  var rstSend = {
    year: year,
    month: month,
    cal: rstCalendar.rstcalendar,
    now: rstCalendar.now,
    holi: holiday
  };
  console.log(rstSend);
  res.render('calendar',rstSend);
});
// Calendar
















router.get('/gett/:id',function(req,res){
  var id = req.params.id;
  res.send(id);
});

router.post('/post',function(req,res){
  res.send(`post is ${req.body.wr1}`);
});

router.get('/slide',function(req,res){
  res.render('slide');
});



module.exports = router;

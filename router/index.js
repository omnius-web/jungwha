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
var authMd = require('../models/auth');
var omTime = require('../models/time');

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
  var authRst = authMd.authcheck(req,res,1);
  var rstSend = {
    auth: authRst,
    userInfo: req.user
  }
  console.log(omTime.timeSt());
  console.log(omTime.selTimeSt(2020,9,14));
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
  var sche_list = function(){
    return new Promise(function(resolve,reject){
      db.query('select wr3 from schedule where wr1=? and wr2=?',[year,month],(err,data)=>{
        if(err){
          throw 'schedule select fail';
        }
        resolve(data);
      })
    })
  };
  sche_list().then(function(rst){
    var rstScheArr = [];
    for(num in rst){
      rstScheArr.push(Number(rst[num].wr3));
    }
    var rstSend = {
      year: year,
      month: month,
      cal: rstCalendar.rstcalendar,
      now: rstCalendar.now,
      holi: holiday,
      auth: req.user,
      schedule: rstScheArr
    };
    //console.log('입력된 스케쥴 배열',rstSend.cal);
    res.render('calendar',rstSend);
  }).catch(function(){
    console.log(reject);
  })


});
// Calendar


// contactprc
router.post('/contactprc',(req,res)=>{
  var post = req.body;
  console.log(post);
  res.send(post);
});
// contactprc
















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

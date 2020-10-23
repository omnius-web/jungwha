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
var popTemplate = require('../models/poptemplate');
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
  db.query('select * from popup where anum=1',(err,data)=>{
    if(err){
      throw 'main popup select query error';
    }
    var rstSend = {
      auth: authRst,
      userInfo: req.user
    }
    if(data[0].wr2=='0'){
      rstSend.popup = ``;
    }
    if(data[0].wr2=='1'){
      rstSend.popup = `
      <div class="main_popup">
        <div class="popup_img">
          <img src="/upload/${data[0].wr1}">
        </div>
        <div class="popup_close">
          <a>닫기</a>
        </div>
      </div>
      `;
    }
    res.render('index',rstSend);
  });
  

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
  }).catch(function(err){
    console.log(err);
  })


});
// Calendar


// contactprc
router.post('/contactprc',(req,res)=>{
  var sendJn = {};
  var confpost = true;
  var post = req.body;
  for(postnum in post){
    if(post[postnum]==''){
      sendJn.rst = false;
      sendJn.err = '2';
      confpost = false;
      res.send(sendJn);
      return
    }
  }
  if(confpost){
    var conDate = post.wr2;
    var dateSplit = conDate.split('-');
    var reqSelTime = omTime.selTimeSt(Number(dateSplit[0]),Number(dateSplit[1])-1,Number(dateSplit[2]));
    var nowTime = omTime.timeSt();

    post.wr8 = dateSplit[0];
    post.wr9 = dateSplit[1];
    post.wr10 = dateSplit[2];
    post.wr11 = reqSelTime.selTS2;
    post.wr12 = 0;
    post.wr13 = 0;
    post.wr15 = 0;
    post.wr16 = 0;
    post.date = nowTime.now2;

    var dbSearch = function(){
      return new Promise(function(resolve,reject){
        db.query('select * from contact where wr5 = ? and not wr12="1"',[post.wr5],function(err,data){
          if(err){
            throw 'contact db for hp num search';
          }
          resolve(data);
        });
      });
    }

    dbSearch().then(function(rst){
      if(rst[0]===undefined){
        db.query('insert into contact set ?',post,(err,rst)=>{
          if(err){
            throw 'contact insert error';
          }
          sendJn.rst = true;
          res.send(sendJn);
        });
      }
      else{
        sendJn.rst = false;
        sendJn.err = '1';
        res.send(sendJn);
      }
    }).catch(function(err){
      console.log(err);
    });
  }





});
// contactprc




// contactList
router.post('/contactlist',(req,res)=>{
  var post = req.body;
  console.log(post);
  var searList = function(){
    return new Promise(function(resolve,reject){
      var sql = '';
      if(post.sendtype=='list'){
        sql = `select * from contact where wr1=? and wr5=? and wr12='1' order by wr11 desc`;
      }
      if(post.sendtype=='conf'){
        sql = `select * from contact where wr1=? and wr5=? and not wr12='1' order by wr11 desc`;
      }
      db.query(sql,[post.wr1,post.wr5],function(err,data){
        if(err){
          throw 'contact List select err';
        }
        resolve(data);
      });
    });
  }
  searList().then(function(rst){
    var rstSend = {};
    rstSend.clval = true;
    rstSend.name = post.wr1;
    rstSend.hp = post.wr5;
    if(rst[0]==undefined){
      rstSend.clval = false;
    }
    for(num in rst){
      rstSend['cl'+num] = rst[num];
    }
    //console.log(rstSend);
    if(post.sendtype=='list'){
      var rstHtml = popTemplate.conListRst(rstSend);
    }
    if(post.sendtype=='conf'){
      // if(post.sms){
      //   var sql = `insert into contact (wr16) values ("1") where anum `;
      // }
      // else{
      //   var sql = `insert into contact (wr16) values ("")`;
      // }
      // db.query(sql,function(err,rst){
      //   if(err){
      //     throw 'contact insert smsAlert query error';
      //   }
      //   resolve(true);
      // })
      console.log(rst);
      var rstHtml = popTemplate.conConfRst(rstSend);
    }
    res.send(rstHtml);
  }).catch(function(err){
    console.error(err);
  })
  
})
// contactList




// contact confirm
router.post('/contactconf',(req,res)=>{
  var post = req.body;
  if(post.confname == '1'){
    var rstHtml = popTemplate.conList();
    res.send(rstHtml);
  }
  if(post.confname == '2'){
    var rstHtml = popTemplate.conConf();
    res.send(rstHtml);
  }
});
// contact confirm












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

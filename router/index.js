// Index_ROUTER
var express = require('express');
var router = express.Router();
var path = require('path');
var cssRead = require('../models/cssread');
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
var namehpSecu = require('../models/namehpsecu');
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

// router.get('/',function(req,res){
//   res.send('SERVER SET...');
// })

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

// router.get('/',function(req,res){
//   res.send('');
//   /*
//   var authRst = authMd.authcheck(req,res,1);
//   db.query('select * from popup where anum=1',(err,data)=>{
//     if(err){
//       throw 'main popup select query error';
//     }
//     var rstSend = {
//       auth: authRst,
//       userInfo: req.user,
//       css: 'main.css'
//     }
//     if(data[0].wr2=='0'){
//       rstSend.popup = ``;
//     }
//     if(data[0].wr2=='1'){
//       rstSend.popup = `
//       <div class="main_popup">
//         <div class="popup_img">
//           <img src="/upload/${data[0].wr1}">
//         </div>
//         <div class="popup_close">
//           <a class="popup_close_a">닫기</a>
//         </div>
//       </div>
//       `;
//     }
//     // res.render('index',rstSend);
//     if(req.user === undefined){
//       res.render('index',rstSend);
//     }
//     else{
//       res.redirect('/adm');
//     }
//   });
//   */

// });


router.get('/',(req,res)=>{
  var authRst = authMd.authcheck(req,res,1);
  db.query('select * from popup where anum=1',(err,data)=>{
    if(err){
      throw 'main popup select query error';
    }
    var rstSend = {
      auth: authRst,
      userInfo: req.user,
      css: 'main.css'
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
          <a class="popup_close_a">닫기</a>
        </div>
      </div>
      `;
    }
    // res.render('index',rstSend);
    if(req.user === undefined){
      res.render('main',rstSend);
    }
    else{
      res.redirect('/adm');
    }
  });
})




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
      schedule: rstScheArr,
      mon6th: false
    };
    var date2 = new Date();
    var date1 = new Date(Number(year),Number(month)-1,date2.getDate());
    //console.log(date2.getDate());
    var date2Sum6 = date2.setMonth(date2.getMonth()+4);
    //console.log(date1.getTime(),date2.getTime());
    if(date1.getTime() > date2.getTime()){
      rstSend.mon6th = true;
    }
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

  var postCount = 0;
  for(postnum in post){
    if(post[postnum]=='' && postCount < 5){
      sendJn.rst = false;
      sendJn.err = '2';
      confpost = false;
      res.send(sendJn);
      return
    }
    postCount++;
  }
  if(post.wr21===undefined){
    sendJn.rst = false;
    sendJn.err = '3';
    confpost = false;
    res.send(sendJn);
    return
  }
  
 
  if(confpost){
    /* 주소 앞 시구 삭제 -> 메인페이지에서 삭제되어서 들어옴
    var jusoSpl = post.wr4;
    jusoSpl = jusoSpl.split(' ');
    delete jusoSpl[0];
    delete jusoSpl[1];
    var jusoSplRst = '';
    for(jsn in jusoSpl){
      jusoSplRst += jusoSpl[jsn]+' ';
    }
    */
    var conDate = post.wr2;
    var dateSplit = conDate.split('-');
    var reqSelTime = omTime.selTimeSt(Number(dateSplit[0]),Number(dateSplit[1])-1,Number(dateSplit[2]));
    var nowTime = omTime.timeSt();

    post.wr4 = post.wr4+' '+post.wr4_1;
    post.wr23 = post.wr23+' '+post.wr4_1;
    delete post.wr4_1;

    if(post.wr7 !== '1'){
      post.wr7 = '0';
    }

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
        db.query('select * from contact where (wr5 = ? and not wr12="1") or (wr2 = ? and wr3 = ?)',[post.wr5,post.wr2,post.wr3],function(err,data){
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
        if(rst[0].wr2==post.wr2 && rst[0].wr3==post.wr3){
          console.log('시간동일');
          sendJn.err = '4';
        }
        if(rst[0].wr5==post.wr5){
          console.log('번호동일');
          sendJn.err = '1';
        }
        sendJn.rst = false;
        
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
  //console.log(post);
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
    var namehpSecuRst = namehpSecu(rstSend.name, rstSend.hp);
    console.log(namehpSecuRst.name);
    console.log(namehpSecuRst.hp);

    if(rst[0]==undefined){
      rstSend.clval = false;
    }
    for(num in rst){
      rstSend['cl'+num] = rst[num];
    }
    //console.log(rstSend);
    if(post.sendtype=='list'){
      rstSend.rstCon = '';
      rstSend.rstJuso = '';
      if(rstSend.clval){
        rstSend.rstCon = `<li class="popup_list_rst_bottom_li">
        <img src="/img/main/popup_list_rst_bottom_text2.png" class="popup_list_rst_bottom_noimg">
        <div class="popup_list_rst_bottom_li_div">
          <a>${rstSend.cl0.wr8}</a>
          <a>년</a>
          <a>${rstSend.cl0.wr9}</a>
          <a>월</a>
          <a>${rstSend.cl0.wr10}</a>
          <a>일</a>
        </div>
        </li>`;
        rstSend.rstJuso = rstSend.cl0.wr4;
      }
      else{
        rstSend.rstCon = `<li class="popup_list_rst_bottom_li"><img src="/img/main/popup_list_rst_bottom_text.png" class="popup_list_rst_bottom_noimg"></li>`;
      }
      var thcss = cssRead('public/css/conlist.css');
      var thjs = cssRead('public/js/conlist.js');
      res.render('popup/conlistrst',{css:thcss,js:thjs,rstSend:rstSend});
      //var rstHtml = popTemplate.conListRst(rstSend);
    }
    if(post.sendtype=='conf' && post.test==undefined){
      //console.log('신청확인첫번째');
      if(rstSend.clval){
        var se2_htlm = '<div class="con_conf_sms"><img src="/img/main/sms_conf.png"><li class="con_conf_sms_input"><a><input type="radio" name="sms" value="1"></a><a>네</a><a><input type="radio" name="sms" value="0"></a><a>아니요</a></li><li class="search_icon search_enter sms_conf_icon"><img src="/img/icon_b.png"></li></div>';
        res.send(se2_htlm);
      }
      else{
        var se2_htlm = '<div class="con_conf_sms"><img src="/img/main/con_conf_no.png"><li class="search_icon conf_first_close sms_conf_icon"><img src="/img/icon_b.png"></li></div>';
        res.send(se2_htlm);
      }
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
      //console.log(rst);
      //var rstHtml = popTemplate.conConfRst(rstSend);
    }
    if(post.sendtype=='conf' && post.test=='index'){
      //console.log('완전한 신청확인');
      if(post.sms=='1'){
        //console.log('알림신청');
        if(rstSend.clval){
          var smsupNum = '1';
          rstSend.rstCon = `<li class="popup_list_rst_bottom_li">
          <img src="/img/main/popup_list_rst_bottom_text3.png" class="popup_list_rst_bottom_noimg">
          </li>`;
          rstSend.rstJuso = rstSend.cl0.wr4;
        }
      }
      else{
        //console.log('알림신청안함');
        if(rstSend.clval){
          var smsupNum = '0';
          rstSend.rstCon = `<li class="popup_list_rst_bottom_li">
          <img src="/img/main/popup_list_rst_bottom_text4.png" class="popup_list_rst_bottom_noimg">
          </li>`;
          rstSend.rstJuso = rstSend.cl0.wr4;
        }
      }
      var smsupSql = `update contact set wr16=? where anum=?`;
      var smsParams = [smsupNum,rstSend.cl0.anum];
      db.query(smsupSql,smsParams,function(err,rst){
        if(err){
          throw 'sms update query err';
        }
        //console.log(smsParams);
        var thcss = cssRead('public/css/conlist.css');
        var thjs = cssRead('public/js/conlist.js');
        res.render('popup/conconfrst',{css:thcss,js:thjs,rstSend:rstSend});
      });
      
    }
    //res.send(rstHtml);
  }).catch(function(err){
    console.error(err);
  })
  
})
// contactList




// contact confirm
router.post('/contactconf',(req,res)=>{
  var post = req.body;
  if(post.confname == '1'){
    // var rstHtml = popTemplate.conList();
    // res.send(rstHtml);
    var thcss = cssRead('public/css/conlist.css');
    var thjs = cssRead('public/js/conlist.js');
    res.render('popup/conlist',{css:thcss,js:thjs});
  }
  if(post.confname == '2'){
    // var rstHtml = popTemplate.conConf();
    // res.send(rstHtml);
    var thcss = cssRead('public/css/conlist.css');
    var thjs = cssRead('public/js/conlist.js');
    res.render('popup/conconf',{css:thcss,js:thjs});
  }
});
// contact confirm






// agree

router.get('/agree',(req,res)=>{
  var thcss =  cssRead('public/css/agree.css');
  res.render('agree',{css:thcss});
})













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

router.get('/test',(req,res)=>{
  
  res.send('ok');
});




module.exports = router;

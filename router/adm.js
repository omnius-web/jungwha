// adm_Router
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbOpt = require('../models/db');
var session = require('express-session');
var bodyParser = require("body-parser");
var MySQLStore = require('express-mysql-session')(session);
var flash = require('connect-flash');
var authMd = require('../models/auth');
var omTime = require('../models/time');
var omToLoString = require('../models/omtolocalestring');
var excel = require('../models/excel');
var multer  = require('multer');
var uploadDate = Date.now();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + uploadDate)
  }
});

var upload = multer(
  { 
    storage: storage,
    limits: {fileSize: 1100000}
  }).single('wr1');

var db = mysql.createConnection(dbOpt);
db.connect();

var sessionStore = new MySQLStore(dbOpt);


//router.use(express.static("public"));
router.use(session({
  secret: 'dhasldjtmtptus',
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}))
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(flash());

var passport = require('../models/passport')(router,db);






// ROUTE_START


// 아이디/비번 체크
router.post('/login_prc', passport.authenticate('local',
    {
      successRedirect: '/',
      failureRedirect: '/adm/login',
      failureFlash: true
    }
  )
);

// 로그인 화면
router.get('/login',(req,res)=>{
  console.log(req.user);
  if(req.user === undefined){
    var rstSend = {
      auth: false
    }
    res.render('login',rstSend);
  }
  else{
    res.redirect('/')
  }

});

// 회원가입 화면
router.get('/join',(req,res)=>{
  var rstSend = {
    auth: req.user
  }
  res.render('adm/join',rstSend);
});

// 회원가입_Process
router.post('/join_prc',(req,res)=>{
  authMd.joinprc(req,res,db);
})

// ADMIN 기본화면
router.get('/',(req,res)=>{
  var authRst = authMd.authcheck(req,res,10);
  if(authRst){
    var rstSend = {
      auth: authRst,
      userInfo: req.user
    }
    res.render('adm/admin',rstSend);
  }else{
    res.redirect('/adm/login');
  }

});

// ADMIN 회원관리
router.get('/member',(req,res)=>{
  var authRst = authMd.authcheck(req,res,10);
  if(authRst){
    var rstSend = {
      auth: authRst,
      userInfo: req.user
    }
    db.query('select * from member',function(err,data){
      if(err){
        var memberRst = false;
      }
      var memberRst = data;
      var rstSend = {
        auth: authRst,
        userInfo: req.user,
        member: memberRst
      }
      res.render('adm/member',rstSend);
    })
  }else{
    res.redirect('/adm/login');
  }
});

// ADMIN 게시판관리
router.get('/board',(req,res)=>{
  var authRst = authMd.authcheck(req,res,10);
  if(authRst){
    db.query('show tables',(err,rst)=>{
      if(err){
        throw 'board_show_table_err';
      }
      var bo_list = [];
      for(lis in rst){
        for(lisName in rst[lis]){
            bo_list.push(rst[lis][lisName]);
        }
      }
      var rstSend = {
        auth: authRst,
        userInfo: req.user,
        bolist: bo_list
      }
      res.render('adm/board',rstSend);
    });
  }else{
    res.redirect('/adm/login');
  }
});

// 스케쥴
router.get('/schedule',(req,res)=>{
  var authRst = authMd.authcheck(req,res,10);
  if(authRst){
    var rstSend = {
      auth: authRst,
      userInfo: req.user
    }
    res.render('adm/schedule',rstSend);
  }else{
    res.redirect('/adm/login');
  }

})

// 스케쥴_입력
router.post('/schedule_prc',(req,res)=>{
  var authRst = authMd.authcheck(req,res,10);
  var post = req.body;
  if(authRst){
    var timestamp = Math.floor(new Date().getTime()/1000);
    var rstSend = {
      subject: '일정입력',
      writer: '관리자',
      date: timestamp,
      wr1: post.nowy,
      wr2: post.nowm,
      wr3: post.nowd
    }
    db.query('insert into schedule set ?',rstSend,(err,data)=>{
      if(err){
        throw 'schedule insert err';
      }
      if(data.insertId){
        res.send(true);
      }
      else{
        res.send(false);
      }
    })

  }else{
    res.redirect('/adm/login');
  }
})

// 스케쥴_삭제
router.post('/schedule_prc_del',(req,res)=>{
  var authRst = authMd.authcheck(req,res,10);
  var post = req.body;
  if(authRst){
    var rstSend = {
      wr1: post.nowy,
      wr2: post.nowm,
      wr3: post.nowd
    }
    db.query('delete from schedule where wr1=? and wr2=? and wr3=?',[rstSend.wr1,rstSend.wr2,rstSend.wr3],(err,data)=>{
      if(err){
        throw 'schedule delete err';
      }
      res.send(true);
    })

  }else{
    res.redirect('/adm/login');
  }
})


//  Contact 고객관리
router.get('/contact',(req,res)=>{
  var rstSend = {};
  var authRst = authMd.authcheck(req,res,10);
  var nowTime = omTime.timeSt();
  if(authRst){
    rstSend = {
      auth: authRst,
      userInfo: req.user,
      nowTime: nowTime
    }
    rstSend.post = {};
    var conList = new Promise(function(resolve,reject){
      db.query(`select * from contact where (wr12 = "0" or wr12 = "2") and wr8="${nowTime.nowY}" and wr9="${nowTime.nowM}" order by wr11`,(err,data)=>{
        if(err){
          throw 'adm contact list select query error';
        }
        resolve(data);
      })
    });
    conList.then(function(rst){
      var rstSumWr13 = 0;
      var rstSumWr15 = 0;
      for(rstNum in rst){
        rstSumWr13 += Number(rst[rstNum].wr13);
        rstSumWr15 += Number(rst[rstNum].wr15);
        rst[rstNum].wr13 = omToLoString.double(rst[rstNum].wr13);
        rst[rstNum].wr15 = Number(rst[rstNum].wr15).toLocaleString();
      }
      rst.push({
        sumwr13: omToLoString.double(rstSumWr13),
        sumwr15: Number(rstSumWr15).toLocaleString()
      });
      rstSend.data = rst;
      var jsonText = JSON.stringify(rst);
      rstSend.jsonText = jsonText;
      res.render('adm/contact',rstSend);
    }).catch(function(err){
      console.log(err);
    });
  }
  else{
    res.redirect('/adm/login');
  }
})


router.post('/contact',(req,res)=>{
  var rstSend = {};
  var authRst = authMd.authcheck(req,res,10);
  var nowTime = omTime.timeSt();
  if(authRst){
    rstSend = {
      auth: authRst,
      userInfo: req.user,
      nowTime: nowTime
    }
    var post = req.body;
    rstSend.post = {};
    var query = `select * from contact`;
    var sql = [];
    var params = [];
    /*
    // sql += ` wr8=?`;
    // params.push(post.year);
    // sql += ` and wr9=?`;
    // params.push(post.month);
    if(post.year!=='0'){
      sql += ` and wr8=?`;
      params.push(post.year);
    }
    if(post.month!=='0'){
      sql += ` and wr9=?`;
      params.push(post.month);
    }
    if(post.day!=='0'){
      sql += ` and wr10=?`;
      params.push(post.day);
    }
    if(post.name!==''){
      sql += ` and (wr1 like ? or wr22 like ?)`;
      params.push(`%${post.name}%`);
      params.push(`%${post.name}%`);
    }
    if(post.hp!==''){
      sql += ` and (wr5 like ? or wr14 like ?)`;
      params.push(`%${post.hp}%`);
      params.push(`%${post.hp}%`);
    }
    if(post.jusogu!=='0'){
      sql += ` and wr19=?`;
      params.push(post.jusogu);
    }
    if(post.juso!==''){
      sql += ` and wr4 like ?`;
      params.push(`%${post.juso}%`);
    }
    if(post.usu == '1'){
      sql += ` and wr20=?`;
      params.push(`1`);
    }
    if(post.complete!=='3'){
      sql += ` and wr12=?`;
      params.push(post.complete);
    }
    if(post.payrst=='1'){
      sql += ` and wr18=?`;
      params.push('미수');
    }
    */




    if(post.year!=='0'){
      sql.push(` wr8=?`);
      params.push(post.year);
    }
    if(post.month!=='0'){
      sql.push(` wr9=?`);
      params.push(post.month);
    }
    if(post.day!=='0'){
      sql.push(` wr10=?`);
      params.push(post.day);
    }
    if(post.name!==''){
      sql.push(` (wr1 like ? or wr22 like ?)`);
      params.push(`%${post.name}%`);
      params.push(`%${post.name}%`);
    }
    if(post.hp!==''){
      sql.push(` (wr5 like ? or wr14 like ?)`);
      params.push(`%${post.hp}%`);
      params.push(`%${post.hp}%`);
    }
    if(post.jusogu!=='0'){
      sql.push(` wr19=?`);
      params.push(post.jusogu);
    }
    if(post.juso!==''){
      sql.push(` wr4 like ?`);
      params.push(`%${post.juso}%`);
    }
    if(post.usu == '1'){
      sql.push(` wr20=?`);
      params.push(`1`);
    }
    if(post.complete!=='3'){
      sql.push(` wr12=?`);
      params.push(post.complete);
    }
    if(post.payrst=='1'){
      sql.push(` wr18=?`);
      params.push('미수');
    }

    if(sql[0] !== undefined){
      for(sqlNum in sql){
        var queryWhere = ' and';
        if(sqlNum == 0){
          queryWhere = ' where';
        }
        query += queryWhere+sql[sqlNum];
      }
    }
    
    query += ` order by wr11`;

    console.log(query);
    console.log(sql);
    console.log(params);
    
    db.query(query,params,function(err,rst){
      if(err){
        throw 'adm contact list post select where error';
      }
      var rstSumWr13 = 0;
      var rstSumWr15 = 0;
      for(rstNum in rst){
        rstSumWr13 += Number(rst[rstNum].wr13);
        rstSumWr15 += Number(rst[rstNum].wr15);
        rst[rstNum].wr13 = omToLoString.double(rst[rstNum].wr13);
        rst[rstNum].wr15 = Number(rst[rstNum].wr15).toLocaleString();
      }
      rst.push({
        sumwr13: omToLoString.double(rstSumWr13),
        sumwr15: Number(rstSumWr15).toLocaleString()
      });
      rstSend.data = rst;
      rstSend.post = post;
      var jsonText = JSON.stringify(rst);
      rstSend.jsonText = jsonText;
      res.render('adm/contact',rstSend);
    })
  }
  else{
    res.redirect('/adm/login');
  }
})


//  Contact 고객관리

// Contact list 수정
router.post('/contactup',(req,res)=>{
  var authRst = authMd.authcheck(req,res,10);
  if(authRst){
    var post = req.body;
    var anum = post.anum;
    delete post.anum;
    var conDate = post.wr2;
    var dateSplit = conDate.split('-');
    var reqSelTime = omTime.selTimeSt(Number(dateSplit[0]),Number(dateSplit[1])-1,Number(dateSplit[2]));
    var nowTime = omTime.timeSt();

    post.wr8 = dateSplit[0];
    post.wr9 = dateSplit[1];
    post.wr10 = dateSplit[2];
    post.wr11 = reqSelTime.selTS2;
    post.wr13 = post.wr13.replace(',','');
    post.wr13 = Number(post.wr13).toFixed(3);
    post.wr15 = post.wr15.replace(',','');
    post.wr15 = Number(post.wr15);
    var sql = 'update contact set';
    var params = [];
    // post.wr13 = Math.floor(post.wr13);
    if(post.wr20 === undefined){
      post.wr20 = '0';
    }
    console.log(post.wr20);
    for(poval in post){
      sql += ` ${poval} = ?,`;
      params.push(post[poval]);
    }
    sql = sql.substr(0, sql.length -1);
    sql += ' where anum = ?';
    params.push(anum);
    // console.log(sql);
    // console.log(params);
    var conUpdate = new Promise(function(resolve,reject){
      db.query(sql,params,function(err,rst){
        if(err){
          throw 'adm contact update query error';
        }
        resolve(rst);
      })
    });
    conUpdate.then(function(rst){
      res.send(true);
    }).catch(function(err){
      console.log(err);
    })
  }
  
})
// Contact list 수정




// Contact list 삭제
router.post('/contactdel',(req,res)=>{
  var authRst = authMd.authcheck(req,res,10);
  if(authRst){
    var post = req.body;
    var anum = post.anum;
    
    var conUpdate = new Promise(function(resolve,reject){
      db.query('delete from contact where anum = ?',[anum],function(err,rst){
        if(err){
          throw 'adm contact delete query error';
        }
        resolve(rst);
      })
    });
    conUpdate.then(function(rst){
      res.send(true);
    }).catch(function(err){
      console.log(err);
    })
  }
  
})
// Contact list 삭제




// EXCEL Down
router.post('/excelsend',(req,res)=>{
  var post = req.body;
  var excelRst = excel(post);
  excelRst.write('Excel.xlsx',res);
});
// EXCEL Down



// Print
router.post('/print',(req,res)=>{
  var post = req.body;
  post.jstextarea = JSON.parse(post.jstextarea);
  res.render('adm/print',post);
});
// Print




// POPUP
router.get('/popup',(req,res)=>{
  var authRst = authMd.authcheck(req,res,10);
  if(authRst){
    var rstSend = {
      auth: authRst,
      userInfo: req.user
    }
    db.query('select * from popup where anum=1',(err,data)=>{
      if(err){
        throw 'adm popup select error';
      }
      rstSend.popdata = data;
      res.render('adm/popup',rstSend);
    });
    
  }else{
    res.redirect('/adm/login');
  }
})

router.post('/popupprc',(req,res)=>{
  upload(req, res, function (err) {
    if (err) {
      // 업로드할때 오류가 발생함
      res.send('<script>alert("파일 용량은 1Mb 이하로 업로드가능합니다.");location.href="/adm/popup";</script>');
      return
    }
    var post = req.body;
    if(req.file===undefined){
      var sql = 'update popup set wr2=?';
      var params = [post.wr2];
    }
    else{
      // if(req.file.size > 1100000){
      //   res.send('<script>alert("파일 용량은 1Mb 이하로 업로드가능합니다.");location.back();</script>');
      //   return;
      // }
      var sql = 'update popup set wr1=?, wr2=?';
      var params = [req.file.fieldname + '-' + uploadDate,post.wr2];
    }
    

    db.query(sql,params,function(err,rst){
      if(err){
        throw 'adm popup update error';
      }
      res.redirect('/adm/popup');
    })
    // 정상적으로 완료됨
  })
  
})
// POPUP









// 로그아웃
router.get('/logout', function(req, res){
  req.logout();
  req.session.save((err)=>{
    if(err){
      throw err;
    }
    res.redirect('/');
  })
});

// DB 테이블만들기
router.post('/createtable',(req,res)=>{
  var authRst = authMd.authcheck(req,res,10);
  if(authRst){
    var tbName = req.body;
    var cretb = authMd.createtable(db, tbName.name);
    if(cretb){
      res.redirect('/adm/board');
    }
  }
  else{
    res.redirect('/adm/login');
  }
});

// DB 회원관리 테이블만들기
router.post('/createmembertable',(req,res)=>{
  var authRst = authMd.authcheck(req,res,10);
  if(authRst){
    var tbName = req.body;
    var cretb = authMd.createmembertable(db);
  }
  res.send(cretb);
});



module.exports = router;

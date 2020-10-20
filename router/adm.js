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

var db = mysql.createConnection(dbOpt);
db.connect();

var sessionStore = new MySQLStore(dbOpt);


router.use(express.static("public"));
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
    var conList = new Promise(function(resolve,reject){
      db.query('select * from contact where not wr12 = "1" order by wr11',(err,data)=>{
        if(err){
          throw 'adm contact list select query error';
        }
        resolve(data);
      })
    });
    conList.then(function(rst){
      rstSend.data = rst;
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
  var post = req.body;
  console.log(post);
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
    var sql = 'update contact set';
    var params = [];
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

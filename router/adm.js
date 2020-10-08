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

var passport = require('../models/passport')(router);






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
  var rstSend = {
    auth: req.user
  }
  res.render('login',rstSend);
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
  var post = req.body;
  var postRst = {};
  postRst.mb_id = post.id;
  postRst.mb_pw = post.pw;
  postRst.mb_json = {};
  for(name in post){
    if(name !== 'id' && name !== 'pw'){
      postRst.mb_json[name] = post[name];
    }
  }
  postRst.mb_json = JSON.stringify(postRst.mb_json);

  authMd.joinprc(res,db,postRst);


})

// ADMIN 기본화면
router.get('/',(req,res)=>{
  var authRst = authMd.authcheck(req,res,10);
  var userInfo = {};
  if(authRst){
    userInfo = req.user;
  }
  var rstSend = {
    auth: userInfo
  }
  res.render('adm/admin',rstSend);
});

// ADMIN 회원관리
router.get('/member',(req,res)=>{
  var authRst = authMd.authcheck(req,res,10);
  var userInfo = {};
  if(authRst){
    userInfo = req.user;
  }
  db.query('select * from member',function(err,data){
    if(err){
      var memberRst = false;
    }
    var memberRst = data;
    var rstSend = {
      auth: userInfo,
      member: memberRst
    }
    res.render('adm/member',rstSend);
  })
});

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
  }
  res.send(cretb);
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

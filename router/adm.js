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

// ADMIN 기본화면
router.get('/',(req,res)=>{
  var userInfo = authMd.authcheck(req,res,10);
  var rstSend = {
    auth: userInfo
  }
  res.render('adm/admin',rstSend);
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
  var tbName = req.body;
  var cretb = authMd.createtable(db, tbName.name);
  res.send(cretb);
});


module.exports = router;

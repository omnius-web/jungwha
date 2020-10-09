// Module_passport
module.exports = function(router,db){
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;


  router.use(passport.initialize());
  router.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
      done(null, id);
  });


  passport.use(new LocalStrategy(
    {
    usernameField: 'id',
    passwordField: 'pw'
    },
    function(username, password, done) {
      db.query('select * from member where mb_id=?',[username],function(err,data){
        if(err){
          throw 'login_id_check_err';
        }
        if(data[0]){
          var crypto = require('crypto');
          crypto.randomBytes(64, (err, buf) => {
            var bsalt = data[0].mb_st;
              crypto.pbkdf2(password, bsalt, 120847, 64, 'sha512', (err, key) => {
                if(key.toString('base64') === data[0].mb_pw){
                  var mb_json = JSON.parse(data[0].mb_json);
                  var auth = {
                    name: data[0].mb_id,
                    nickname: mb_json.name,
                    num: 10
                  };
                  return done(null, auth);
                }else{
                  return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
              });
          });
        }
        else{
          return done(null, false, { message: '가입되지 않은 아이디입니다.' });
        }
      })



      // if(username === 'admin'){
      //   if(password === '1234'){
      //     var auth = {
      //       name: 'admin',
      //       nickname: '관리자',
      //       auth: 'super',
      //       num: 10
      //     };
      //     return done(null, auth);
      //   } else {
      //     return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
      //   }
      // } else {
      //   return done(null, false, { message: '가입되지 않은 아이디입니다.' });
      // }
    }
  ));

  return passport;
};

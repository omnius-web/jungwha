// Module_passport
module.exports = function(router){
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
      if(username === 'admin'){
        if(password === '1234'){
          var auth = {
            name: 'admin',
            nickname: '관리자',
            auth: 'super',
            num: 10
          };
          return done(null, auth);
        } else {
          return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        return done(null, false, { message: '가입되지 않은 아이디입니다.' });
      }
    }
  ));

  return passport;
};

// 로그인 확인 및 등급확인
module.exports = {
  authcheck: function(req,res,num){
    if(!req.user){
      res.redirect('/adm/login');
    } else {
      if(req.user.num < num){
        res.redirect('/');
      } else {
        return req.user;
      }
    }
  },
  createtable: function(db, name){
    db.query(`create table ?? (wr1 int, wr2 varchar(255))`,[name],function(err,data){
      if(err){
        throw err;
      }
      return true;
    })
  }
};

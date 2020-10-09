// 로그인 확인 및 등급확인
module.exports = {
  authcheck: function(req,res,num){
    if(!req.user){
      return false;
    } else {
      if(req.user.num < num){
        return false;
      } else {
        return true;
      }
    }
  },
  createtable: function(db, name){
    db.query(`create table ?? (wr1 int, wr2 varchar(255))`,[name],function(err,data){
      if(err){
        throw err;
      }
    })
    return true;
  },
  createmembertable: function(db){
    db.query(`create table member (
      mb_num INT AUTO_INCREMENT PRIMARY KEY,
      mb_id varchar(100),
      mb_pw varchar(255),
      mb_st varchar(255),
      mb_json text,
      date DATETIME
    )`,function(err,data){
      if(err){
        throw err;
      }
    })
    return true;
  },
  joinprc: function(req,res,db){
    var crypto = require('crypto');

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

    crypto.randomBytes(64, (err, buf) => {
      var bsalt = buf.toString('base64');
      crypto.pbkdf2(postRst.mb_pw, buf.toString('base64'), 120847, 64, 'sha512', (err, key) => {
        var bkey = key.toString('base64');
        postRst.mb_pw = bkey;
        postRst.mb_st = bsalt;
        console.log(bkey);
        db.query('insert into member set ?',postRst,function(err,rst){
          if (err){
            throw err;
          }
          console.log(rst.insertId);
          var rsthtml = `<a>${rst.insertId}</a>`
          res.send(rsthtml);
        })

      });
    });
  }
};

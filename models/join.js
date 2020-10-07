var crypto = require('crypto');
var path = require('path');

crypto.randomBytes(64, (err, buf) => {
  var bsalt = buf.toString('base64');
  crypto.pbkdf2('sicse123', buf.toString('base64'), 120847, 64, 'sha512', (err, key) => {
    var bkey = key.toString('base64');

    crypto.pbkdf2('sicse123', bsalt, 120847, 64, 'sha512', (err, key) => {
      console.log(key.toString('base64') === bkey);
    });
  });
});

// 정규 표현식
var text = "";
var idPattern = /^[A-Za-z]{1}[A-Za-z0-9]{3,19}$/; // 영어알파벳이 1개 이상포함된 3~19자리 문자
var pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/; // 영소, 영대, 특수문자, 숫자 모두 포함된 비번
var emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
var phonePattern = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g;

var idn = "12345678";

if(phonePattern.test(idn) == true){
  var text = text + "ID : " + idn + "\n";
}else{
  console.log("잘못 입력 하셨습니다.");
}

console.log(text);

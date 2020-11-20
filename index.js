// MAIN_SERVER
var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');
var indexRout = require('./router/index');
var admRout = require('./router/adm');
var ejs = require('ejs');


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');


var option = {
	key: fs.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server.key'),
	cert: fs.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server.crt'),
	//ca: fs.readFileSync(__dirname+'')
};

var option2 = {
	key: fs.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server2.key'),
	cert: fs.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server2.crt'),
	//ca: fs.readFileSync(__dirname+'')
};

var option3 = {
	key: fs.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server3.key'),
	cert: fs.readFileSync('/opt/bitnami/apache/conf/bitnami/certs/server3.crt'),
	//ca: fs.readFileSync(__dirname+'')
};

app.use('/',indexRout);
app.use('/adm',admRout);

https.createServer(option3, app).listen(3002,function(){
	console.log('HTTPS SERVER START! PORT:3002');
});

https.createServer(option, app).listen(3001,function(){
	console.log('HTTPS SERVER START! PORT:3001');
});

https.createServer(option2, app).listen(3000,function(){
	console.log('HTTPS SERVER START! PORT:3000');
});





/*app.listen(3000,function(){
    console.log('SERVER START!');
});*/
//git Up

var fs = require('fs');

var cssRd = function(cssfile){
    return '<style>'+fs.readFileSync(cssfile,'utf8')+'</style>';
}

module.exports = cssRd;
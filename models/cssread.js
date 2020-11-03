var fs = require('fs');

var cssRd = function(cssfile){
    var fileSet = cssfile.charAt(cssfile.length-2);
    //console.log(fileSet);
    if(fileSet == 's'){
        return '<style>'+fs.readFileSync(cssfile,'utf8')+'</style>';
    }
    if(fileSet == 'j'){
        return '<script>'+fs.readFileSync(cssfile,'utf8')+'</script>';
    }
    
}

module.exports = cssRd;
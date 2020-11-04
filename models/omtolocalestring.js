module.exports = function(om){
    var basicNum = '';
    basicNum = om.toFixed(3);
    basicNum = basicNum.split('.');
    basicNum = Number(basicNum[0]).toLocaleString()+'.'+basicNum[1];
    return basicNum;
}
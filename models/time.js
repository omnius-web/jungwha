module.exports = {
  timeSt: function(){
    var omDate = new Date();
    var omNYear = omDate.getFullYear();
    var omNMonth = omDate.getMonth()+1;
    var omNDay = omDate.getDate();
    var selTimeStNow = new Date().getTime();
    var selTimeStNow2 = Math.floor(selTimeStNow/1000);
    return {
      now: selTimeStNow,
      now2: selTimeStNow2,
      nowY: omNYear,
      nowM: omNMonth,
      nowD: omNDay
    };
  },
  selTimeSt: function(year,mon,day){
    var selT = new Date(year,mon,day,0,0,0,1).getTime();
    return {
      selTS: Math.floor(selT/1000),
      selTS2: selT
    }
  }
};

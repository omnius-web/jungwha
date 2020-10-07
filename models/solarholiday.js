var holidayKR = require('holiday-kr');

module.exports = function(dayList,year,month){
  var rstHoli = [];
  for (var dL in dayList) {
    for (var dL2 in dayList[dL]) {
      if(dayList[dL][dL2]!==0){
        var holiRst = holidayKR.isSolarHoliday(year, month, dayList[dL][dL2]);
        if(holiRst){
          rstHoli.push(dayList[dL][dL2]);
        }
      }
    }
  }
  return rstHoli;
}

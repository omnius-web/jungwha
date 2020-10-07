// Module_calendar
var calendar = require('node-calendar');

module.exports = function(year,month){
  var rstSend = {};
  var omDate = new Date();
  var omNYear = omDate.getFullYear();
  var omNMonth = omDate.getMonth()+1;
  var omNDay = omDate.getDate();
  var cal = new calendar.Calendar(calendar.SUNDAY);
  var rstCalendar = cal.monthdayscalendar(year, month);
  rstSend.rstcalendar = rstCalendar;
  rstSend.now = {
    nowY: omNYear,
    nowM: omNMonth,
    nowD: omNDay
  }
  return rstSend;
};

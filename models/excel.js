var xl = require('excel4node');

module.exports = function(post){
  


  var postJson = JSON.parse(post.jstextarea);
  var numName = {
    'wr12': {
      '0': '대기',
      '1': '완료',
      '2': '접수'
    },
    'wr16': {
      '0': '미수신',
      '1': '수신'
    },
    'wr7': {
      '0': '미발행',
      '1': '요청',
      '2': '완료'
    }
  }
  for(poJN in postJson){
    postJson[poJN].wr12 = numName.wr12[postJson[poJN].wr12];
    postJson[poJN].wr16 = numName.wr16[postJson[poJN].wr16];
    postJson[poJN].wr7 = numName.wr7[postJson[poJN].wr7];
  }
  //console.log(postJson);
  
  // Create a new instance of a Workbook class
  var wb = new xl.Workbook();

  // Add Worksheets to the workbook
  var ws = wb.addWorksheet('Sheet 1');
  //var ws2 = wb.addWorksheet('Sheet 2');

  // Create a reusable style
  var style = wb.createStyle({
    alignment: {
      wrapText: true,
      horizontal: 'center',
      vertical: 'center'
    },
    font: {
      color: '#000000',
      size: 12,
    },
    numberFormat: '#,##0; (#,##0); -',
  });
  var style2 = wb.createStyle({
    alignment: {
      wrapText: true,
      horizontal: 'center',
      vertical: 'center'
    },
    font: {
      color: '#000000',
      size: 20,
      bold: true,
    },
    numberFormat: '#,##0; (#,##0); -',
  });
  ws.column(2).setWidth(40);
  ws.column(4).setWidth(70);
  ws.column(5).setWidth(70);
  ws.column(7).setWidth(20);
  ws.column(9).setWidth(15);
  ws.column(10).setWidth(15);
  ws.column(16).setWidth(40);
  ws.column(17).setWidth(40);
  ws.row(1).setHeight(50);
  ws.cell(1, 1, 1, 18, true).string(`${post.year}년 ${post.month}월`).style(style2);

  ws.row(2).setHeight(40);
  ws.cell(2,1).string('번호').style(style);
  ws.cell(2,2).string('이름').style(style);
  ws.cell(2,3).string('구').style(style);
  ws.cell(2,4).string('주소').style(style);
  ws.cell(2,5).string('신주소').style(style);
  ws.cell(2,6).string('청소날짜').style(style);
  ws.cell(2,7).string('청소시간').style(style);
  ws.cell(2,8).string('청소량').style(style);
  ws.cell(2,9).string('전화번호1').style(style);
  ws.cell(2,10).string('전화번호2').style(style);
  ws.cell(2,11).string('청소금액').style(style);
  ws.cell(2,12).string('결재여부').style(style);
  ws.cell(2,13).string('청소완료').style(style);
  ws.cell(2,14).string('청소알림').style(style);
  ws.cell(2,15).string('세금계산서').style(style);
  ws.cell(2,16).string('요청사항').style(style);
  ws.cell(2,17).string('비고').style(style);
  ws.cell(2,18).string('우수환경').style(style);

  var cellnum = 3;
  var inNo = 1;
  var sumwr13 = 0;
  var sumwr15 = 0;
  for(jsnum in postJson){
    if(postJson[jsnum].sumwr13===undefined){
    ws.row(cellnum).setHeight(25);
    ws.cell(cellnum,1).string(`${inNo}`).style(style);
    ws.cell(cellnum,2).string(`${postJson[jsnum].wr1}`).style(style);
    ws.cell(cellnum,3).string(`${postJson[jsnum].wr19}`).style(style);
    ws.cell(cellnum,4).string(`${postJson[jsnum].wr4}`).style(style);
    ws.cell(cellnum,5).string(`${postJson[jsnum].wr23}`).style(style);
    ws.cell(cellnum,6).string(`${postJson[jsnum].wr2}`).style(style);
    ws.cell(cellnum,7).string(`${postJson[jsnum].wr3}`).style(style);
    ws.cell(cellnum,8).string(`${postJson[jsnum].wr13}`).style(style);
    ws.cell(cellnum,9).string(`${postJson[jsnum].wr5}`).style(style);
    ws.cell(cellnum,10).string(`${postJson[jsnum].wr14}`).style(style);
    ws.cell(cellnum,11).string(`${postJson[jsnum].wr15}`).style(style);
    ws.cell(cellnum,12).string(`${postJson[jsnum].wr18}`).style(style);
    ws.cell(cellnum,13).string(`${postJson[jsnum].wr12}`).style(style);
    ws.cell(cellnum,14).string(`${postJson[jsnum].wr16}`).style(style);
    ws.cell(cellnum,15).string(`${postJson[jsnum].wr7}`).style(style);
    ws.cell(cellnum,16).string(`${postJson[jsnum].wr6}`).style(style);
    ws.cell(cellnum,17).string(`${postJson[jsnum].wr17}`).style(style);
    ws.cell(cellnum,18).string(`${postJson[jsnum].wr20}`).style(style);
    cellnum++;
    inNo++;
    //sumwr13 += Number(postJson[jsnum].wr13);
    // sumwr15 += Number(postJson[jsnum].wr15);
    }
  }

  ws.row(cellnum+2).setHeight(30);
  ws.cell(cellnum+2,7).string(`합계`).style(style);
  ws.cell(cellnum+2,8).string(`${postJson[inNo-1].sumwr13}`).style(style);
  ws.cell(cellnum+2,11).string(`${postJson[inNo-1].sumwr15}`).style(style);


  // Set value of cell A1 to 100 as a number type styled with paramaters of style
  // ws.cell(1, 1)
  // .number(100)
  // .style(style);

  // Set value of cell B1 to 200 as a number type styled with paramaters of style
  // ws.cell(1, 2)
  // .number(200)
  // .style(style);

  // Set value of cell C1 to a formula styled with paramaters of style
  // ws.cell(1, 3)
  // .formula('A1 + B1')
  // .style(style);

  // Set value of cell A2 to 'string' styled with paramaters of style
  // ws.cell(2, 1)
  // .string('string')
  // .style(style);

  // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
  // ws.cell(3, 1)
  // .bool(true)
  // .style(style)
  // .style({font: {size: 14}});

  return wb;
  
}

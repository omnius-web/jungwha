// COMMON_JS
$(document).ready(function(){
  var slideNum = $('.om_slide').length;
  var slideHeight = $('.om_slide').height();
  $('.om_slide_content').css('height',slideHeight);
  //console.log(window.location.pathname); // 현재경로

  // Calendar
  var omDate = new Date();
  var omNYear = omDate.getFullYear();
  var omNMonth = omDate.getMonth()+1;
  var omNDay = omDate.getDay();
  calAjax(omNYear,omNMonth);

  $(document).on('click','.om_cal_next',function(){
    var ajYear = $('.om_cal_year').data('calyear');
    var ajNextM = $('.om_cal_next').data('nextmon');
    if(ajNextM === 13){
      ajYear = ajYear+1;
      ajNextM = 1;
    }
    calAjax(ajYear,ajNextM);
  });
  $(document).on('click','.om_cal_prev',function(){
    var ajYear = $('.om_cal_year').data('calyear');
    var ajPrevM = $('.om_cal_prev').data('prevmon');
    if(ajPrevM === 0){
      ajYear = ajYear-1;
      ajPrevM = 12;
    }
    calAjax(ajYear,ajPrevM);
  });

  function calAjax(year,month){
    $.ajax({
      type : 'post',
      url : '/calendar',
      data : {
        year: year,
        month: month
      },
      cache : false,
      success : function(calData){
        $('.om_calendar_input').html(calData);
      }
    });
  }
  // Calendar




  // main
  $('.om_main_bt_li').mouseover(function(){
    $('.om_main_bt_b').css('display','none');
    $('.om_main_bt_o').css('display','inline-block');
  });
  $('.om_main_bt_li').mouseleave(function(){
    $('.om_main_bt_b').css('display','inline-block');
    $('.om_main_bt_o').css('display','none');
  });

  // main





  // 게시판만들기

  $(document).on('click','.create_table',function(){
    $.ajax({
      type : 'post',
      url : '/adm/createtable',
      data : {
        name: 'crtb'
      },
      cache : false,
      success : function(rst){
        if(rst){
          alert('게시판이 성공적으로 만들어졌습니다.');
        }else{
          alert('DB나 회원등급에 문제가 있습니다.');
        }
      }
    });
  });

  // 게시판만들기

  // 회원관리 게시판만들기

  $(document).on('click','.create_member_table',function(){
    $.ajax({
      type : 'post',
      url : '/adm/createmembertable',
      data : {
        name: 'crtb'
      },
      cache : false,
      success : function(rst){
        if(rst){
          alert('게시판이 성공적으로 만들어졌습니다.');
          location.reload();
        }else{
          alert('DB나 회원등급에 문제가 있습니다.');
          location.reload();
        }
      }
    });
  });

  // 회원관리 게시판만들기


});

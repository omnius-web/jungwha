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

  // $(document).on('click','#calFormInput',function(){
  //   $('.calForForm').css('display','inline-block');
  // }
  $('#calFormInput').click(function(){
    $('.calForForm').css('display','inline-block');
  });
  // function calFormInput(){
  //   $('.calForForm').css('display','inline-block');
  // }
  $('.calBottom').click(function(){
    $('.calForForm').css('display','none');
  });

  $(document).on('click','.selokc',function(){
    var onCy = $('.now_y').text();
    var onCm = $('.now_m').text();
    var onCd = $(this).children('a').text();
    $('input[name="wr2"]').val(`${onCy}-${onCm}-${onCd}`);
    //alert(`${onCy}-${onCm}-${onCd}`);
  });
  // $('.selOkC').click(function(){
  //   alert('예약가능');
  // });
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




  // schedule
  $(document).on('click','.adm_sche_in',function(){
    var nowY = $('.now_y').text();
    var nowM = $('.now_m').text();
    var nowD = $(this).children('a').text();
    var conf = confirm('입력하시겠습니까?');
    if(conf){
      $.ajax({
        type : 'post',
        url : '/adm/schedule_prc',
        data : {
          nowy: nowY,
          nowm: nowM,
          nowd: nowD
        },
        cache : false,
        success : function(rst){
          if(rst){
            alert('입력되었습니다.');
            location.reload();
          }else{
            alert('입력오류!');
            location.reload();
          }
        }
      });
    }
    else{

    }

  });

  $(document).on('click','.sche_in',function(){
    var nowY = $('.now_y').text();
    var nowM = $('.now_m').text();
    var nowD = $(this).children('a').text();
    var conf = confirm('삭제하시겠습니까?');
    if(conf){
      $.ajax({
        type : 'post',
        url : '/adm/schedule_prc_del',
        data : {
          nowy: nowY,
          nowm: nowM,
          nowd: nowD
        },
        cache : false,
        success : function(rst){
          if(rst){
            alert('삭제되었습니다.');
            location.reload();
          }else{
            alert('삭제오류!');
            location.reload();
          }
        }
      });
    }
    else{

    }

  });
  // schedule



  // juso
  $(document).on('click','.juso_list_td',function(){
    var juso1 = $(this).children('.juso_list_li1').text();
    var juso2 = $(this).children('.juso_list_li2').text();
    //var juso2 = $(this).next('td').children('.juso_list_li1').text();
    //$('input[name="wr3"]').val(juso1);

    var jusoAddHtml = `
    <li class="jusoInLi"><input type="text" name="" value="${juso1}" readonly></li>
    <li class="jusoInLi"><input type="text" name="jusorst1" value="${juso2}" readonly></li>
    <li class="jusoInLi"><input type="text" name="jusorst2" value="" placeholder="상세주소"></li>
    <li class="jusoInLiBt"><button type="button" class="jusoinbt">주소입력</button></li>
    `;
    $('.jusoAddIn').html(jusoAddHtml);
    $('#list').html('');
    $('.paginate').html('');
  });

  $(document).on('click','.jusoinbt',function(){
    var rstSujo1 = $('input[name="jusorst1"]').val();
    var rstSujo2 = $('input[name="jusorst2"]').val();
    $('input[name="wr3"]').val(`${rstSujo1} ${rstSujo2}`);
    $('.om_juso').fadeOut();
    $('.blackbg').animate({opacity:'0'},500);
    setTimeout(function(){
      $('.wrap_div').removeClass('blackbg');
    },500);
  });


  $('input[name="wr3"]').click(function(){
    $('.om_juso').fadeIn();
    $('.wrap_div').addClass('blackbg');
    $('.blackbg').animate({opacity:'0.8'},200);
  });
  $('.juso_close a').click(function(){
    $('.om_juso').fadeOut();
    $('.blackbg').animate({opacity:'0'},500);
    setTimeout(function(){
      $('.wrap_div').removeClass('blackbg');
    },500);
  });

  // juso
});

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
    var rstText = onCy+'-'+onCm+'-'+onCd;
    $('input[name="wr2"]').val(rstText);
    $('.calForForm').css('display','none');
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

    var jusoAddHtml = '<li class="jusoInLi"><input type="text" name="" value="'+juso1+'" readonly></li><li class="jusoInLi"><input type="text" name="jusorst1" value="'+juso2+'" readonly></li><li class="jusoInLi"><input type="text" name="jusorst2" value="" placeholder="상세주소"></li><li class="jusoInLiBt"><button type="button" class="jusoinbt">주소입력</button></li>';

    $('.jusoAddIn').html(jusoAddHtml);
    $('#list').html('');
    $('.paginate').html('');
  });


  $(document).on('click','.jusoinbt',function(){
    var rstSujo1 = $('input[name="jusorst1"]').val();
    var rstSujo2 = $('input[name="jusorst2"]').val();
    $('input[name="wr4"]').val(rstSujo1+' '+rstSujo2);
    $('.om_juso').fadeOut();
    $('.blackbg').animate({opacity:'0'},500);
    setTimeout(function(){
      $('.wrap_div').removeClass('blackbg');
    },500);
  });


  $('.jusoinput').click(function(){
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


  // 메인_고객_청소신청
  $('.om_main_fcd_li2_2_a1').click(function(){
    $('.om_main_fcd_li2_2_option').slideToggle();
  });
  $('.om_main_fcd_li2_2_option a').click(function(){
    $('.om_main_fcd_li2_2_option').slideUp();
    var omfl2oa = $(this).text();
    $('.om_main_fcd_li2_2 input[name="wr3"]').val(omfl2oa);
    $('.om_main_fcd_li2_2_a1').text(omfl2oa);
  });
  $('.contact_else').click(function(){
    $('.contact_else_option').slideToggle();
  });
  $('.contact_else_option a').click(function(){
    var thdata = $(this).data('conelse');
    if(thdata=='1'){
      $('.contact_else').focus();
    }
    else{
      var seldata = $(this).text();
      $('.contact_else').val(seldata);
    }
    $('.contact_else_option').slideUp();
  })
  $('.om_main_fcd_li1_a_last').click(function(){
    var inhtmllast = '<i class="fa fa-check" aria-hidden="true"></i>';
    var confhtml = $(this).html();
    var chkval = $('.om_main_fcd_li2 input[name="wr7"]').val();
    if(confhtml){
      //alert('체크됨');
      $('.om_main_fcd_li1_a_last').html('');
      $('.om_main_fcd_li2 input[name="wr7"]').val('0');
    }
    else{
      //alert('체크안됨');
      $('.om_main_fcd_li1_a_last').html(inhtmllast);
      $('.om_main_fcd_li2 input[name="wr7"]').val('1');
    }
    // var chkval = $('.om_main_fcd_li2 input[name="wr7"]').val();
    // alert(chkval);
    // $('.om_main_fcd_li1_a_last').html(inhtmllast);
  });
  $('.contact_submit').click(function(){
    var contactData = $('.main_contact').serialize();
    $.ajax({
      type : 'post',
      url : '/contactprc',
      data : contactData,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      dataType: "text",
      cache : false,
      success : function(rst){
        var rstJn = JSON.parse(rst);
        if(rstJn.rst){
          alert('신청이 완료되었습니다.');
          location.reload();
        }
        else{
          if(rstJn.err=='1'){
            alert('이미 신청된 내역이 있습니다.');
          }
          else if(rstJn.err=='2'){
            alert('모든 내용을 입력해주세요.');
          }
          else{
            alert('신청오류! 전화문의주세요.');
          }
        }
      }
    });
  });

  $('.om_main_bt_li4').click(function(){
    $.ajax({
      type : 'post',
      url : '/contactconf',
      data : {confname: "1"},
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      dataType: "text",
      cache : false,
      success : function(rst){
        $('.search').html(rst);
        $('.search').fadeIn();
        $('.wrap_div').addClass('blackbg');
        $('.blackbg').animate({opacity:'0.8'},200);
      }
    });
    
  });
  $('.om_main_bt_li5').click(function(){
    $.ajax({
      type : 'post',
      url : '/contactconf',
      data : {confname: "2"},
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      dataType: "text",
      cache : false,
      success : function(rst){
        $('.search').html(rst);
        $('.search').fadeIn();
        $('.wrap_div').addClass('blackbg');
        $('.blackbg').animate({opacity:'0.8'},200);
      }
    });
  
  });

  $(document).on('click','.search_close',function(){
    $('.search').fadeOut();
    $('.search').html('');
    $('.blackbg').animate({opacity:'0'},500);
    setTimeout(function(){
      $('.wrap_div').removeClass('blackbg');
    },500);
  });

  $(document).on('click','.search_close',function(){
    $('.search').fadeOut();
    $('.search').html('');
    $('.blackbg').animate({opacity:'0'},500);
    setTimeout(function(){
      $('.wrap_div').removeClass('blackbg');
    },500);
  });
  $(document).on('click','.search_rst_bt',function(){
    $('.search').fadeOut();
    $('.search').html('');
    $('.blackbg').animate({opacity:'0'},500);
    setTimeout(function(){
      $('.wrap_div').removeClass('blackbg');
    },500);
  });


  // $('.search_close').click(function(){
  //   // $('.search_basic').fadeOut();
  //   // $('.search_rst').fadeOut();
  //   // $('.search_conf').fadeOut();
  //   $('.search').fadeOut();
  //   $('.search').html('');
  //   $('.blackbg').animate({opacity:'0'},500);
  //   setTimeout(function(){
  //     $('.wrap_div').removeClass('blackbg');
  //   },500);
  //   $('input').val('');
  //   $('.search_rst_li1').text('');
  //   $('.search_rst_li2').text('');
  //   $('.search_rst_li3').text('');
  //   $('.search_rst_content').text('');
  // });
  // $('.search_rst_bt').click(function(){
  //   $('.search_basic').fadeOut();
  //   $('.search_rst').fadeOut();
  //   $('.search_conf').fadeOut();
  //   $('.blackbg').animate({opacity:'0'},500);
  //   setTimeout(function(){
  //     $('.wrap_div').removeClass('blackbg');
  //   },500);
  //   $('input').val('');
  //   $('.search_rst_li1').text('');
  //   $('.search_rst_li2').text('');
  //   $('.search_rst_li3').text('');
  //   $('.search_rst_content').text('');
  // });


  // 메인_고객_청소신청



  // 신청이력조회
  

  
  $(document).on('click','.search_enter',function(){
    var contactData = $('.search_list').serialize();
    $('.sms_conf').css('display','none');
    
    var sendty = $('input[name="sendtype"]').val();
    if(sendty=='conf'){
      var smsVal = $('input[name="sms"]:checked').val();
      contactData += '&sms='+smsVal;
    }
    
    $.ajax({
      type : 'post',
      url : '/contactlist',
      data : contactData,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      dataType: "text",
      cache : false,
      success : function(rst){
        $('.search').html(rst);
        // var rstJn = JSON.parse(rst);
        // var srstcon = '';
        // console.log(rstJn.clval);
        // $('.search').css('display','none');
        // $('.search_rst').css('display','inline-block');
        // var name = $('.shrst_in_wr1').val();
        // var hp = $('.shrst_in_wr2').val();
        // $('.search_rst_li1').text(name);
        // $('.search_rst_li2').text(hp);


        // if(rstJn.clval){
        //   $('.search_rst_li3').text(rstJn.cl0.wr4);
        //   srstcon = '<li><a>마지막청소날짜</a></li><li><a>'+rstJn.cl0.wr8+'년 '+rstJn.cl0.wr9+'월 '+rstJn.cl0.wr10+'일</a></li>';
        // }
        // else{
        //   srstcon = '<li><a>죄송합니다.</a></li><li><a>이전청소일을 확인할 수 없습니다.</a></li>';
        // }
        // $('.search_rst_content').html(srstcon);
      }
    });
  });



  $(document).on('click','.search_enter2',function(){
    var contactData = $('.search_list').serialize();
    contactData += '&test=index';
    var se2_htlm = '<div class="con_conf_sms"><li><input type="radio" name="sms" value="0"></li><li><input type="radio" name="sms" value="1"></li></div><div class="search_icon search_enter"><img src="/img/icon_b.png"></div>';
    $('.sms_conf').html(se2_htlm);
    $('.sms_conf').css('display','inline-block');
  });

  // $('.search_enter').click(function(){
  //   var contactData = $('.search_list').serialize();
  //   $.ajax({
  //     type : 'post',
  //     url : '/contactlist',
  //     data : contactData,
  //     contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  //     dataType: "text",
  //     cache : false,
  //     success : function(rst){
  //       var rstJn = JSON.parse(rst);
  //       var srstcon = '';
  //       console.log(rstJn.clval);
  //       $('.search').css('display','none');
  //       $('.search_rst').css('display','inline-block');
  //       var name = $('.shrst_in_wr1').val();
  //       var hp = $('.shrst_in_wr2').val();
  //       $('.search_rst_li1').text(name);
  //       $('.search_rst_li2').text(hp);


  //       if(rstJn.clval){
  //         $('.search_rst_li3').text(rstJn.cl0.wr4);
  //         srstcon = '<li><a>마지막청소날짜</a></li><li><a>'+rstJn.cl0.wr8+'년 '+rstJn.cl0.wr9+'월 '+rstJn.cl0.wr10+'일</a></li>';
  //       }
  //       else{
  //         srstcon = '<li><a>죄송합니다.</a></li><li><a>이전청소일을 확인할 수 없습니다.</a></li>';
  //       }
  //       $('.search_rst_content').html(srstcon);
  //     }
  //   });
  // });

  // setInterval(function(){
  //   $('.search_icon img').fadeToggle();
  // },700);
  // $('.search_icon').mouseover(function(){
  //   $('.search_icon img').stop().fadeIn();
  // })



  // 아이콘 깜빡임
  var stint = null;
  function startinter(){
    stint = setInterval(function(){
      $('.search_icon img').animate({opacity:0},700).animate({opacity:1},700)
    },1400);
  }
  $('.search_icon').mouseover(function(){
    iconstop();
  });
  $('.search_icon').mouseleave(function(){
    startinter()
  });
  function iconstop(){
    clearInterval(stint);
  }

  startinter();
  // 아이콘 깜빡임

  // 신청이력조회




  // admin contact list
  $(document).on('click','.admconup',function(){
    var confedit = confirm('수정하시겠습니까?');
    if(confedit){
      var contactData = $(this).parents('.admcon_bt').prevAll('#admconup').serialize();
      $.ajax({
        type : 'post',
        url : '/adm/contactup',
        data : contactData,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "text",
        cache : false,
        success : function(rst){
          if(rst){
            alert('수정되었습니다.');
            //location.reload();
          }
          else{
            alert('수정오류!');
          }
        }
      });
    }
  });

  $(document).on('click','.admcondel',function(){
    var confedit = confirm('삭제하시겠습니까?');
    if(confedit){
      var contactData = $(this).parents('.admcon_bt').prevAll('#admconup').serialize();
      $.ajax({
        type : 'post',
        url : '/adm/contactdel',
        data : contactData,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "text",
        cache : false,
        success : function(rst){
          if(rst){
            alert('삭제되었습니다.');
            location.reload();
          }
          else{
            alert('삭제오류!');
          }
        }
      });
    }
  });
  // admin contact list

  // popup close
  // $('.popup_close a').click(function(){
  //   $('.main_popup').html('');
  // })
  $(document).on('click','.popup_close_a',function(){
    $('.main_popup').html('');
  });
  // popup close



});


function numchk(val){
  var rstval = val.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
  $('.numvalin').val(rstval);
}

function moneycol(selval, nnth){
  var nnthyy = $(nnth).parents('td').prev('.money_td').children('input');
  if(selval=='현금'){
    nnthyy.removeClass('mc_black');
    nnthyy.removeClass('mc_gray');
    nnthyy.removeClass('mc_red');
    nnthyy.addClass('mc_black');
  }
  if(selval=='입금'){
    nnthyy.removeClass('mc_black');
    nnthyy.removeClass('mc_gray');
    nnthyy.removeClass('mc_red');
    nnthyy.addClass('mc_gray');
  }
  if(selval=='미수'){
    nnthyy.removeClass('mc_black');
    nnthyy.removeClass('mc_gray');
    nnthyy.removeClass('mc_red');
    nnthyy.addClass('mc_red');
  }
  if(selval==''){
    nnthyy.removeClass('mc_black');
    nnthyy.removeClass('mc_gray');
    nnthyy.removeClass('mc_red');
    nnthyy.addClass('mc_black');
  }
}
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

  




  // $('#calFormInput').click(function(){
  //   $('.calForForm').css('display','inline-block');
  // });




  
  $('.calBottom li').click(function(){
    // $('.calForForm').css('display','none');
    // $('.calForForm').slideDown();
    if($('.calForForm').is(":visible")) {
      $('.calForForm').slideUp();
    } else {
      $('.calForForm').slideDown();
    }
  });
  
  

  $('#calFormInput').click(function(){
    if($('.calForForm').is(":visible")) {
      $('.calForForm').slideUp();
    } else {
      $('.calForForm').slideDown();
    }
  });

  $('#main_n_timesel').click(function(){
    // $('.main_n_conin_timesel').css('display','inline-block');
    if($('.main_n_conin_timesel').is(":visible")) {
      $('.main_n_conin_timesel').slideUp();
    } else {
      $('.main_n_conin_timesel').slideDown();
    }
  });

  $('#main_yoch_sel').click(function(){
    if($('.main_n_conin_yoch').is(":visible")) {
      $('.main_n_conin_yoch').slideUp();
    } else {
      $('.main_n_conin_yoch').slideDown();
    }
  });
  

  $(document).on('click','.selokc',function(){
    var onCy = $('.now_y').text();
    var onCm = $('.now_m').text();
    var onCd = $(this).children('a').text();
    var rstText = onCy+'-'+onCm+'-'+onCd;
    $('#calFormInput').val(rstText);
    // $('.calForForm').css('display','none');
    if($('.calForForm').is(":visible")) {
      $('.calForForm').slideUp();
    } else {
      $('.calForForm').slideDown();
    }
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


  

  $('.main_n_juso_in').click(function(){
    if($('.main_n_juso').is(":visible")) {
      $('.main_n_juso').slideUp();
    } else {
      $('.main_n_juso').slideDown();
    }
  });

  $('.main_sang_ju').click(function(){
    
      $('.main_n_juso').slideUp();
    
  });


  $(document).on('click','.juso_list_td',function(){
    // var juso1 = $(this).children('.juso_list_li1').text();
    var juso2 = $(this).children('.juso_list_li2').text();
    var juso3 = $(this).children('.juso_list_li1').text();
    juso2 = juso2.split(' ');
    var newJuso2 = '';

    for(jsnum2 in juso2){
      
      if(jsnum2 > 1){
        newJuso2 += juso2[jsnum2]+' ';

      }
    }

    juso3 = juso3.split(' ');
    var newJuso3 = '';

    for(jsnum3 in juso3){
      
      if(jsnum3 > 1){
        newJuso3 += juso3[jsnum3]+' ';

      }
    }

    // var jusoAddHtml = '<li class="jusoInLi"><input type="text" name="" value="'+juso1+'" readonly></li><li class="jusoInLi"><input type="text" name="jusorst1" value="'+juso2+'" readonly></li><li class="jusoInLi"><input type="text" name="jusorst2" value="" placeholder="상세주소"></li><li class="jusoInLiBt"><button type="button" class="jusoinbt">주소입력</button></li>';

    // $('.jusoAddIn').html(jusoAddHtml);
    // $('.main_n_juso_in').val(juso2);
    $('.main_n_juso_in').val(newJuso2);
    $('.main_sinjuso_wr23').val(newJuso3);
    
    if($('.main_n_juso').is(":visible")) {
      $('.main_n_juso').slideUp();
    } else {
      $('.main_n_juso').slideDown();
    }

    $('#list').html('');
    $('.paginate').html('');
    $('.juso_bot_text').html('');
    $('.jusoschkeyview').val('');
    $('.main_n_juso_desc2').css('display','inline-block');
  });


  // $(document).on('click','.jusoinbt',function(){
  //   var rstSujo1 = $('input[name="jusorst1"]').val();
  //   var rstSujo2 = $('input[name="jusorst2"]').val();
  //   $('input[name="wr4"]').val(rstSujo1+' '+rstSujo2);
  //   $('.om_juso').fadeOut();
  //   $('.blackbg').animate({opacity:'0'},500);
  //   setTimeout(function(){
  //     $('.wrap_div').removeClass('blackbg');
  //   },500);
  // });


  // $('.jusoinput').click(function(){
  //   $('.om_juso').fadeIn();
  //   $('.wrap_div').addClass('blackbg');
  //   $('.blackbg').animate({opacity:'0.8'},200);
  // });
  // $('.juso_close a').click(function(){
  //   $('.om_juso').fadeOut();
  //   $('.blackbg').animate({opacity:'0'},500);
  //   setTimeout(function(){
  //     $('.wrap_div').removeClass('blackbg');
  //   },500);
  // });



  




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
  $('.main_n_conin_yoch li').click(function(){
    var thdata = $(this).data('conelse');
    if(thdata=='1'){
      
      // $('.contact_else22').attr("readonly",false);
      $('.contact_else22').focus();
      // $('.contact_else22').prop('readonly', false);
    }
    else{
      var seldata = $(this).text();
      $('.contact_else').val(seldata);
    }
    $('.contact_else_option').slideUp();
  });
  $('.main_n_conin_yoch li').click(function(){
    var thdata = $(this).data('conelse');
    if(thdata=='1'){
      $('#main_yoch_sel').val('');
      $('#main_yoch_sel').focus();
    }
    else{
      var seldata = $(this).text();
      $('#main_yoch_sel').val(seldata);
    }
    if($('.main_n_conin_yoch').is(":visible")) {
      $('.main_n_conin_yoch').slideUp();
    } else {
      $('.main_n_conin_yoch').slideDown();
    }
  });
  $('.main_n_conin_timesel li').click(function(){
    
      var seldata = $(this).text();
      $('#main_n_timesel_input').val(seldata);
      $('#main_n_timesel').text(seldata);
      $('.main_n_conin_li4_a').css('font-size','1rem');
      $('.main_n_conin_li4_a').css('color','#000000');
      $('.main_n_conin_li4_a').css('padding-top','18px');
    
    if($('.main_n_conin_timesel').is(":visible")) {
      $('.main_n_conin_timesel').slideUp();
    } else {
      $('.main_n_conin_timesel').slideDown();
    }
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
        // var alertPopClose = '<div class="main_alert_pop_close"><img src="/img/main/close.png"></div>';
        // var alertPopClose2 = '<div class="main_alert_pop_close" data-apm="rlo"><img src="/img/main/close.png"></div>';
        var alertPopClose = '<div class="main_alert_pop_close"><img src="/img/main/close_text.png"></div>';
        var alertPopClose2 = '<div class="main_alert_pop_close" data-apm="rlo"><img src="/img/main/close_text.png"></div>';
        if(rstJn.rst){
          //alert('신청이 완료되었습니다.');
          $('.alertpop').html('<img src="/img/main/alert6.png">'+alertPopClose2);
            $('.alertpop').css('display','inline-block');
            // setTimeout(function(){
            //   $('.alertpop').css('display','none');
            //   $('.alertpop').html('');
            //   location.reload();
            // },1000);
          
        }
        else{
          if(rstJn.err=='1'){
            //alert('이미 신청된 내역이 있습니다.');
            $('.alertpop').html('<img src="/img/main/alert2.png">'+alertPopClose);
            $('.alertpop').css('display','inline-block');
            // setTimeout(function(){
            //   $('.alertpop').css('display','none');
            //   $('.alertpop').html('');
            // },3000);
          }
          else if(rstJn.err=='2'){
            //alert('모든 내용을 입력해주세요.');
            $('.alertpop').html('<img src="/img/main/alert1.png">'+alertPopClose);
            $('.alertpop').css('display','inline-block');
            // setTimeout(function(){
            //   $('.alertpop').css('display','none');
            //   $('.alertpop').html('');
            // },3000);
          }
          else if(rstJn.err=='3'){
            //alert('개인정보수집 및 활용동의해주세요.');
            $('.alertpop').html('<img src="/img/main/alert3.png">'+alertPopClose);
            $('.alertpop').css('display','inline-block');
            // setTimeout(function(){
            //   $('.alertpop').css('display','none');
            //   $('.alertpop').html('');
            // },3000);
          }
          else if(rstJn.err=='4'){
            //alert('선택하신 시간은 이미 예약되어있습니다.');
            $('.alertpop').html('<img src="/img/main/alert5.png">'+alertPopClose);
            $('.alertpop').css('display','inline-block');
            // setTimeout(function(){
            //   $('.alertpop').css('display','none');
            //   $('.alertpop').html('');
            // },3000);
          }
          else{
            //alert('신청오류! 전화문의주세요.');
            $('.alertpop').html('<img src="/img/main/alert4.png">'+alertPopClose);
            $('.alertpop').css('display','inline-block');
            // setTimeout(function(){
            //   $('.alertpop').css('display','none');
            //   $('.alertpop').html('');
            // },3000);
          }
        }
      }
    });
  });

  $(document).on('click','.main_alert_pop_close',function(){
    if($('.main_alert_pop_close').data('apm') == 'rlo'){
      location.reload();
    } else {
      $('.alertpop').css('display','none');
      $('.alertpop').html('');
    }
    
    
  });

  $('.main_bt_list').click(function(){
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
  $('.main_bt_conf').click(function(){
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
  $(document).on('click','.conf_first_close',function(){
    $('.sms_conf').html('');
    $('.sms_conf').css('display','none');
  });
  $(document).on('click','.sms_conf_icon_p_close',function(){
    $('.sms_conf').html('');
    $('.sms_conf').css('display','none');
  });
  

  
  $(document).on('click','.main_agree_img',function(){
    $.ajax({
      url : '/agree',
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      cache : false,
      success : function(rst){
        $('.agree_html').html(rst);
        $('.agree_wrap').fadeIn();
        $('.wrap_div').addClass('blackbg');
        $('.blackbg').animate({opacity:'0.8'},200);
      }
    });
  });
  $(document).on('click','.agree_close',function(){
    $('.agree_wrap').fadeOut();
    $('.agree_html').html('');
    $('.blackbg').animate({opacity:'0'},500);
    setTimeout(function(){
      $('.wrap_div').removeClass('blackbg');
    },500);
  });
  $(document).on('click','.agree_close2',function(){
    $('.agree_wrap').fadeOut();
    $('.agree_html').html('');
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




  $(document).on('click','.admconin',function(){
    var confedit = confirm('입력하시겠습니까?');
    if(confedit){
      var contactData = $(this).parents('.admcon_bt').prevAll('#admconin').serialize();
      $.ajax({
        type : 'post',
        url : '/adm/contactin',
        data : contactData,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "text",
        cache : false,
        success : function(rst){
          if(rst){
            alert('입력되었습니다.');
            location.reload();
          }
          else{
            alert('입력오류!');
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


  $(document).on('click','.main_bt1',function(){
    $('.main_qa').fadeIn();
    $('.wrap_div').addClass('blackbg');
    $('.blackbg').animate({opacity:'0.8'},200);
  });

  $(document).on('click','.main_qa_icon',function(){
    $('.main_qa').fadeOut();
    $('.blackbg').animate({opacity:'0'},500);
    setTimeout(function(){
      
      $('.wrap_div').removeClass('blackbg');
      
    },500);
    $('html').scrollTop(0);
  });

  $(document).on('click','.main_qa_bt1',function(){
    $('.main_qa').fadeOut();
    $('.blackbg').animate({opacity:'0'},500);
    setTimeout(function(){
      
      $('.wrap_div').removeClass('blackbg');
      
    },500);
    $('html').scrollTop(0);
  });



  $('.main_qa_bt2').click(function(){
    $.ajax({
      type : 'post',
      url : '/contactconf',
      data : {confname: "1"},
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      dataType: "text",
      cache : false,
      success : function(rst){
        $('.main_qa').fadeOut();
        $('.blackbg').animate({opacity:'0'},500);
        setTimeout(function(){
          
          $('.wrap_div').removeClass('blackbg');
          
        },500);
        $('html').scrollTop(0);
        $('.search').html(rst);
        $('.search').fadeIn();
        $('.wrap_div').addClass('blackbg');
        $('.blackbg').animate({opacity:'0.8'},200);
      }
    });
    
  });




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



  // button over
  // var btOverHtml1 = `<a><img src="/img/main/bt5_o.png"></a>`;
  // var btLeaveHtml1 = `<a><img src="/img/main/bt5.png"></a>`;
  $(document).on('mouseover','.main_bottom_bt_li1',function(){
    // $('.main_bottom_bt_li1').html(btOverHtml1);
    $('.main_bot_bt_img1_o').css('display','inline-block');

  });
  $(document).on('mouseleave','.main_bottom_bt_li1',function(){
    // $('.main_bottom_bt_li1').html(btLeaveHtml1);
    $('.main_bot_bt_img1_o').css('display','none');

  });

  $(document).on('mouseover','.main_bottom_bt_li2',function(){
    // $('.main_bottom_bt_li1').html(btOverHtml1);
    $('.main_bot_bt_img2_o').css('display','inline-block');

  });
  $(document).on('mouseleave','.main_bottom_bt_li2',function(){
    // $('.main_bottom_bt_li1').html(btLeaveHtml1);
    $('.main_bot_bt_img2_o').css('display','none');

  });

  $(document).on('mouseover','.main_bt1',function(){
    // $('.main_bottom_bt_li1').html(btOverHtml1);
    $('.main_bot_bt_img3_o').css('display','inline-block');

  });
  $(document).on('mouseleave','.main_bt1',function(){
    // $('.main_bottom_bt_li1').html(btLeaveHtml1);
    $('.main_bot_bt_img3_o').css('display','none');

  });

  // button over




  // top_scroll_bt
  
  // top_scroll_bt




});





function numchk(val){
  var rstval = val.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
  $('.numvalin').val(rstval);
}

function conlistwr13(val){
  var wr13Val = 0;
  
  $('.conlistwr13input').each(function(){
    var bthval = '';
    bthval = $(this).val();
    bthval = bthval.replace(',','');
    wr13Val += Number(bthval);
    

    //wr13Val += Number($(this).val());
  });
  var basicNum = '';
  basicNum = wr13Val.toFixed(3);
  basicNum = basicNum.split('.');
  basicNum = Number(basicNum[0]).toLocaleString()+'.'+basicNum[1];
  // wr13Val = Number(wr13Val).toFixed(3);
  // wr13Val = Number(wr13Val).toLocaleString();
  //$('.wr13Rst').text(wr13Val);
  
  $('.wr13Rst').text(basicNum);
}



function conlistwr15(val){
  var wr15Val = 0;
  $('.conlistwr15input').each(function(){
    // wr15Val += Number($(this).val());
    var bthval = '';
    bthval = $(this).val();
    bthval = bthval.replace(',','');
    wr15Val += Number(bthval);
  });
  $('.wr15Rst').text(wr15Val.toLocaleString());
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


function omJusoEnter(){
  var schKey = $('.jusoschkeyview').val();
  $('.om_search_key').val(schKey);
  enterSearch();
}
function omJusoBt(){
  var schKey = $('.jusoschkeyview').val();
  $('.om_search_key').val(schKey);
  getAddr(1);
}

function calelse(){
  alert('ok');
  if($('#calelse').is(":checked")){
    $('#main_n_timesel_input').val('빠른시일 아무때나');
    $('#main_n_timesel').text('빠른시일 아무때나');
    $('.main_n_conin_li4_a').css('font-size','1rem');
    $('.main_n_conin_li4_a').css('color','#000000');
    $('.main_n_conin_li4_a').css('padding-top','18px');
  }
}
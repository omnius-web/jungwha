$(document).on('click','.search_enter2',function(){
    var contactData = $('.search_list').serialize();
    
    $.ajax({
      type : 'post',
      url : '/contactlist',
      data : contactData,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      dataType: "text",
      cache : false,
      success : function(rst){
        $('.sms_conf').html(rst);
        $('.sms_conf').css('display','inline-block');
      }
    });
    var se2_htlm = '<div class="con_conf_sms"><img src="/img/main/sms_conf.png"><li class="con_conf_sms_input"><a><input type="radio" name="sms" value="0"></a><a>네</a><a><input type="radio" name="sms" value="1"></a><a>아니요</a></li><li class="search_icon search_enter sms_conf_icon"><img src="/img/icon_b.png"></li><p class="sms_conf_icon_p_close"><i class="fa fa-times" aria-hidden="true" style="color: black;"></i></p></div>';
    // $('.sms_conf').html(se2_htlm);
    // $('.sms_conf').css('display','inline-block');
});

$(document).on('click','.search_enter',function(){
    var contactData = $('.search_list').serialize();
    $('.sms_conf').css('display','none');
    
    var sendty = $('input[name="sendtype"]').val();
    if(sendty=='conf'){
      var smsVal = $('input[name="sms"]:checked').val();
      contactData += '&sms='+smsVal;
      contactData += '&test=index';
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



module.exports = {
    conList: function(){
        var html = '';
        html = `
        <div class="search_con search_basic">
            <div class="search_logo">
                <img src="/img/logo.png">
            </div>
            <form class="search_list" method="post">
                <input type="hidden" name="sendtype" value="list">
                <div class="search_from">

                        <div class="search_from_div">
                            <li class="search_from_div_li sfd_li1">
                                <a class="om_main_fcd_a1 sfd_li_a1">성</a><a class="sfd_li_a1">명</a>
                            </li>
                            <li class="search_from_div_li sfd_li2">
                                <input type="text" name="wr1" value="" class="sfd_li2_in shrst_in_wr1">
                            </li>
                        </div>
                        <div class="search_from_div">
                            <li class="search_from_div_li sfd_li1">
                                <a class="sf_a_num sfd_li_a1">전화번호</a>
                            </li>
                            <li class="search_from_div_li sfd_li2">
                                <input type="text" name="wr5" value="" oninput="numchk(this.value);" class="sfd_li2_in shrst_in_wr2 numvalin">
                            </li>
                        </div>
                </div>
                <div class="search_icon search_enter">
                    <img src="/img/icon_w.png">
                </div>
                <div class="search_bt search_enter">
                    <a>정화조 청소이력조회</a>
                </div>
            </form>
            <div class="search_close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        `;
        return html;
    },
    conConf: function(){
        var html = '';
        html = `
        <div class="search_con search_conf">
            <div class="search_logo">
                <img src="/img/logo_n2.png">
            </div>
            <form class="search_list" method="post">
                <input type="hidden" name="sendtype" value="conf">
                <div class="search_from">

                        <div class="search_from_div">
                            <li class="search_from_div_li sfd_li1">
                                <a class="om_main_fcd_a1 sfd_li_a1" style="color: black; text-align: left;">성</a><a class="sfd_li_a1" style="color: black; text-align: left;">명</a>
                            </li>
                            <li class="search_from_div_li sfd_li2">
                                <input type="text" name="wr1" value="" class="sfd_li2_in shrst_in_wr1">
                            </li>
                        </div>
                        <div class="search_from_div">
                            <li class="search_from_div_li sfd_li1">
                                <a class="sf_a_num sfd_li_a1" style="color: black; text-align: left;">전화번호</a>
                            </li>
                            <li class="search_from_div_li sfd_li2">
                                <input type="text" name="wr5" value="" oninput="numchk(this.value);" class="sfd_li2_in shrst_in_wr2 numvalin">
                            </li>
                        </div>
                </div>
                <div class="search_icon search_enter">
                    <img src="/img/icon_b.png">
                </div>
                <div class="search_bt search_enter">
                    <a style="color: black; text-align: left;">정화조 청소신청확인</a>
                </div>
            </form>
            <div class="search_close">
                <i class="fa fa-times" aria-hidden="true" style="color: black;"></i>
            </div>
        </div>
        `;
        return html;
    },
    conListRst: function(rstSend){
        var html = '';
        var rstCon = '';
        var rstJuso = '';
        if(rstSend.clval){
            rstCon = `<li><a class="main_rst_con_text_blue">마지막청소날짜</a></li><li><a class="main_rst_con_text_black main_rst_conf_text">${rstSend.cl0.wr8}년 ${rstSend.cl0.wr9}월 ${rstSend.cl0.wr10}일</a></li>`;
            rstJuso = rstSend.cl0.wr4;
        }
        else{
            rstCon = `<li><a class="main_rst_con_text_black">죄송합니다.</a></li><li><a class="main_rst_con_text_black">이전청소일을 확인할 수 없습니다.</a></li>`;
        }
        html = `
        <div class="search_con search_rst">
            <div class="search_logo">
                <img src="/img/logo_n2.png">
            </div>

                <div class="search_from">

                        <div class="search_from_div">
                            <li class="search_from_div_li sfd_li1">
                                <a class="om_main_fcd_a1 sfd_li_a1" style="color:#0075a9!important;">성</a><a class="sfd_li_a1" style="color:#0075a9!important;">명</a>
                            </li>
                            <li class="search_from_div_li sfd_li2 search_rst_li1" style="color: black; text-align: left;">
                                ${rstSend.name}
                            </li>
                        </div>
                        <div class="search_from_div">
                            <li class="search_from_div_li sfd_li1">
                                <a class="sf_a_num sfd_li_a1" style="color:#0075a9!important;">전화번호</a>
                            </li>
                            <li class="search_from_div_li sfd_li2 search_rst_li2" style="color: black; text-align: left;">
                                ${rstSend.hp}
                            </li>
                        </div>
                        <div class="search_from_div">
                            <li class="search_from_div_li sfd_li1 main_rst_juso_tit">
                                <a class="om_main_fcd_a1 sfd_li_a1" style="color:#0075a9!important;">주</a><a class="sfd_li_a1" style="color:#0075a9!important;">소</a>
                            </li>
                            <li class="search_from_div_li sfd_li2 search_rst_li3" style="color: black; text-align: left;">
                                ${rstJuso}
                            </li>
                        </div>
                </div>

                <div class="search_rst_content">
                    ${rstCon}
                </div>

                <div class="search_icon search_rst_bt">
                    <img src="/img/icon_b.png">
                </div>

            <div class="search_close">
                <i class="fa fa-times" aria-hidden="true" style="color: black;"></i>
            </div>
        </div>
        `;
        return html;
    },
    conConfRst: function(rstSend){
        var html = '';
        var rstCon = '';
        var rstJuso = '';
        var rstDate = '';
        var rstHope = '';
        if(rstSend.clval){
            rstCon = `<li><a class="main_rst_con_text_blue">다음 청소알림 문자를 수신합니다.</a></li><li><a class="main_rst_con_text_black main_rst_conf_text">정화조 청소 신청완료</a></li>`;
            rstJuso = rstSend.cl0.wr4;
            rstDate = rstSend.cl0.wr2+' '+rstSend.cl0.wr3;
            rstHope = rstSend.cl0.wr6;
        }
        else{
            rstCon = `<li><a class="main_rst_con_text_black">죄송합니다.</a></li><li><a class="main_rst_con_text_black">신청내역을 확인할 수 없습니다.</a></li>`;
        }
        html = `
        <div class="search_con search_rst">
            <div class="search_logo">
                <img src="/img/logo_n2.png">
            </div>

                <div class="search_from">

                        <div class="search_from_div">
                            <li class="search_from_div_li sfd_li1">
                                <a class="om_main_fcd_a1 sfd_li_a1" style="color:#0075a9!important;">성</a><a class="sfd_li_a1" style="color:#0075a9!important;">명</a>
                            </li>
                            <li class="search_from_div_li sfd_li2 search_rst_li1" style="color: black; text-align: left;">
                                ${rstSend.name}
                            </li>
                        </div>
                        <div class="search_from_div">
                            <li class="search_from_div_li sfd_li1">
                                <a class="sf_a_num sfd_li_a1" style="color:#0075a9!important;">전화번호</a>
                            </li>
                            <li class="search_from_div_li sfd_li2 search_rst_li2" style="color: black; text-align: left;">
                                ${rstSend.hp}
                            </li>
                        </div>
                        <div class="search_from_div">
                            <li class="search_from_div_li sfd_li1 main_rst_juso_tit">
                                <a class="om_main_fcd_a1 sfd_li_a1" style="color:#0075a9!important;">주</a><a class="sfd_li_a1" style="color:#0075a9!important;">소</a>
                            </li>
                            <li class="search_from_div_li sfd_li2 search_rst_li3" style="color: black; text-align: left;">
                                ${rstJuso}
                            </li>
                        </div>
                        <div class="search_from_div">
                            <li class="search_from_div_li sfd_li1">
                                <a class="om_main_fcd_a1 sfd_li_a1" style="color:#0075a9!important;">날</a><a class="sfd_li_a1" style="color:#0075a9!important;">짜</a>
                            </li>
                            <li class="search_from_div_li sfd_li2 search_rst_li3" style="color: black; text-align: left;">
                                ${rstDate}
                            </li>
                        </div>
                        <div class="search_from_div">
                            <li class="search_from_div_li sfd_li1">
                                <a class="sf_a_num sfd_li_a1" style="color:#0075a9!important;">요청사항</a>
                            </li>
                            <li class="search_from_div_li sfd_li2 search_rst_li2" style="color: black; text-align: left;">
                                ${rstHope}
                            </li>
                        </div>
                </div>

                <div class="search_rst_content2">
                    ${rstCon}
                </div>

                <div class="search_icon search_rst_bt">
                    <img src="/img/icon_b.png">
                </div>
                <div class="search_confrst_bot_text">
                    곧 연락드리겠습니다.
                </div>

            <div class="search_close">
                <i class="fa fa-times" aria-hidden="true" style="color: black;"></i>
            </div>
        </div>
        `;
        return html;
    }
}
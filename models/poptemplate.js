module.exports = {
    conList: function(){
        var html = '';
        html = `
        <div class="search_con search_basic">
            <div class="search_logo">
                <img src="/img/logo.png">
            </div>
            <form class="search_list" method="post">
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
                <img src="/img/logo_black.png">
            </div>
            <form class="search_list" method="post">
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
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        `;
        return html;
    },
    conListRst: function(rstSend){
        var html = '';
        var rstCon = '';
        if(rstSend.clval){
            rstCon = `<li><a>마지막청소날짜</a></li><li><a>${rstSend.cl0.wr8}년 ${rstSend.cl0.wr9}월 ${rstSend.cl0.wr10}일</a></li>`;
        }
        else{
            rstCon = `<li><a>죄송합니다.</a></li><li><a>이전청소일을 확인할 수 없습니다.</a></li>`;
        }
        html = `
        <div class="search_con search_rst">
            <div class="search_logo">
                <img src="/img/logo_black.png">
            </div>

                <div class="search_from">

                        <div class="search_from_div">
                            <li class="search_from_div_li sfd_li1">
                                <a class="om_main_fcd_a1 sfd_li_a1" style="color:#0075a9!important;">성</a><a class="sfd_li_a1" style="color:#0075a9!important;">명</a>
                            </li>
                            <li class="search_from_div_li sfd_li2 search_rst_li1" style="color: black; text-align: left;">

                            </li>
                        </div>
                        <div class="search_from_div">
                            <li class="search_from_div_li sfd_li1">
                                <a class="sf_a_num sfd_li_a1" style="color:#0075a9!important;">전화번호</a>
                            </li>
                            <li class="search_from_div_li sfd_li2 search_rst_li2" style="color: black; text-align: left;">

                            </li>
                        </div>
                        <div class="search_from_div">
                            <li class="search_from_div_li sfd_li1">
                                <a class="om_main_fcd_a1 sfd_li_a1" style="color:#0075a9!important;">주</a><a class="sfd_li_a1" style="color:#0075a9!important;">소</a>
                            </li>
                            <li class="search_from_div_li sfd_li2 search_rst_li3" style="color: black; text-align: left;">

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
    }
}
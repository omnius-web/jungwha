// Juso_api_JS
// OMNIUS - U01TX0FVVEgyMDIwMTAwMTIxNTQ0NTExMDI0OTE=
// 복사골환경(주) - U01TX0FVVEgyMDIwMTAwMTIxNTgzNzExMDI0OTI=
// 개발 - devU01TX0FVVEgyMDIwMTAwMTIyNDkzNjExMDI0OTM=

  function getAddr(stts){
  	// 적용예 (api 호출 전에 검색어 체크)
    if(stts!==undefined){
      document.form.currentPage.value="1";
    }
  	if (!checkSearchedWord(document.form.keyword)) {
  		return ;
  	}

  	$.ajax({
  		 url :"https://www.juso.go.kr/addrlink/addrLinkApiJsonp.do"  //인터넷망
  		,type:"post"
  		,data:$("#form").serialize()
  		,dataType:"jsonp"
  		,crossDomain:true
  		,success:function(jsonStr){
  			$("#list").html("");
  			var errCode = jsonStr.results.common.errorCode;
  			var errDesc = jsonStr.results.common.errorMessage;
  			if(errCode != "0"){
  				alert(errCode+"="+errDesc);
  			}else{
  				if(jsonStr != null){
  					makeListJson(jsonStr);
			pageMake(jsonStr);
			$('.juso_bot_text').html(`<img src="/img/main/juso_desc3.png">`)
  				}
  			}
        $('.main_n_juso_wr4_1').html('');
  		}
  	    ,error: function(xhr,status, error){
  	    	alert("에러발생");
  	    }
  	});
  }

  function makeListJson(jsonStr){
  	var htmlStr = "";
  	htmlStr += "<table>";
  	$(jsonStr.results.juso).each(function(){
  		htmlStr += "<tr>";
		  htmlStr += "<td class='juso_list_td'><li class='juso_list_li1'><img src='/img/main/juso_doro.png'>"+this.roadAddrPart1+"<a class='juso_list_part2'>"+this.roadAddrPart2+"</a></li><li class='juso_list_li2'><img src='/img/main/juso_jibun.png'>"+this.jibunAddr+"</li></td>"; // 전체 도로명주소
		// 전체 도로명주소 -> this.roadAddr
  		//htmlStr += "<td>"+this.roadAddrPart1+"</td>"; // 도로명주소(참고항목 제외)
  		//htmlStr += "<td>"+this.roadAddrPart2+"</td>"; // 도로명주소 참고항목
  		//htmlStr += "<td>"+this.jibunAddr+"</td>"; // 지번주소
  		// htmlStr += "<td>"+this.engAddr+"</td>"; // 도로명주소(영문)
  		//htmlStr += "<td><li class='juso_list_li1'>"+this.zipNo+"</li></td>"; // 우편번호
  		// htmlStr += "<td>"+this.admCd+"</td>"; // 행정구역코드
  		// htmlStr += "<td>"+this.rnMgtSn+"</td>"; // 도로명코드
  		// htmlStr += "<td>"+this.bdMgtSn+"</td>"; // 건물관리번호
  		// htmlStr += "<td>"+this.detBdNmList+"</td>"; // 상세건물명
  		/** API 서비스 제공항목 확대 (2017.02) **/
  		// htmlStr += "<td>"+this.bdNm+"</td>"; // 건물명
  		// htmlStr += "<td>"+this.bdKdcd+"</td>"; // 공동주택여부(1:공동주택, 0:비공동주택)
  		// htmlStr += "<td>"+this.siNm+"</td>"; // 시도명
  		// htmlStr += "<td><li class='juso_list_li1'>"+this.sggNm+"</li></td>"; // 시군구명
  		// htmlStr += "<td>"+this.emdNm+"</td>"; // 읍면동명
  		// htmlStr += "<td>"+this.liNm+"</td>"; // 법정리명
  		// htmlStr += "<td>"+this.rn+"</td>"; // 도로명
  		// htmlStr += "<td>"+this.udrtYn+"</td>"; // 지하여부(0 : 지상, 1 : 지하)
  		// htmlStr += "<td>"+this.buldMnnm+"</td>"; // 건물본번
  		// htmlStr += "<td>"+this.buldSlno+"</td>"; // 건물부번
  		// htmlStr += "<td>"+this.mtYn+"</td>"; // 산여부(0 : 대지, 1 : 산)
  		// htmlStr += "<td>"+this.lnbrMnnm+"</td>"; // 지번본번(번지)
  		// htmlStr += "<td>"+this.lnbrSlno+"</td>"; // 지번부번(호)
  		// htmlStr += "<td>"+this.emdNo+"</td>"; // 읍면동일련번호
  		htmlStr += "</tr>";
  	});
	  htmlStr += "</table>";
	  $('.main_n_juso_desc2').css('display','none');
  	$("#list").html(htmlStr);
  }

  //특수문자, 특정문자열(sql예약어의 앞뒤공백포함) 제거
  function checkSearchedWord(obj){
  	if(obj.value.length >0){
  		//특수문자 제거
  		var expText = /[%=><]/ ;
  		if(expText.test(obj.value) == true){
  			alert("특수문자를 입력 할수 없습니다.") ;
  			obj.value = obj.value.split(expText).join("");
  			return false;
  		}

  		//특정문자열(sql예약어의 앞뒤공백포함) 제거
  		var sqlArray = new Array(
  			//sql 예약어
  			"OR", "SELECT", "INSERT", "DELETE", "UPDATE", "CREATE", "DROP", "EXEC",
               		 "UNION",  "FETCH", "DECLARE", "TRUNCATE"
  		);

  		var regex;
  		for(var i=0; i<sqlArray.length; i++){
  			regex = new RegExp( sqlArray[i] ,"gi") ;

  			if (regex.test(obj.value) ) {
  			    alert("\"" + sqlArray[i]+"\"와(과) 같은 특정문자로 검색할 수 없습니다.");
  				obj.value =obj.value.replace(regex, "");
  				return false;
  			}
  		}
  	}
  	return true ;
  }

  function enterSearch() {
  	var evt_code = (window.netscape) ? ev.which : event.keyCode;
  	if (evt_code == 13) {
		event.keyCode = 0;
  		getAddr();
  	}
  }
  //페이지 이동
  function goPage(pageNum){
  	document.form.currentPage.value=pageNum;
  	getAddr();
  }

  function pageMake(jsonStr){
  	var total = jsonStr.results.common.totalCount; // 총건수
  	var pageNum = document.form.currentPage.value;// 현재페이지
  	var paggingStr = "";
  	if(total < 1){
  	}else{
  		var PAGEBLOCK=document.form.countPerPage.value;
  		var pageSize=document.form.countPerPage.value;
  		var totalPages = Math.floor((total-1)/pageSize) + 1;
  		var firstPage = Math.floor((pageNum-1)/PAGEBLOCK) * PAGEBLOCK + 1;
  		if( firstPage <= 0 ) firstPage = 1;
  		var lastPage = firstPage-1 + Number(PAGEBLOCK);
  		if( lastPage > totalPages ) lastPage = totalPages;
  		var nextPage = lastPage+1 ;
  		var prePage = firstPage-10 ;
  		if( firstPage > PAGEBLOCK ){
  			paggingStr +=  "<a href='javascript:goPage("+prePage+");'>◁</a>  " ;
  		}
  		for( i=firstPage; i<=lastPage; i++ ){
  			if( pageNum == i )
  				paggingStr += "<a style='font-weight:bold;color:blue;font-size:12px;' href='javascript:goPage("+i+");'>" + i + "</a>  ";
  			else
  				paggingStr += "<a href='javascript:goPage("+i+");'>" + i + "</a>  ";
  		}
  		if( lastPage < totalPages ){
  			paggingStr +=  "<a href='javascript:goPage("+nextPage+");'>▷</a>";
  		}
      // alert(`${total} || ${pageNum} || ${pageSize} || ${totalPages} || ${firstPage} || ${lastPage} || ${nextPage} || ${prePage}`);
  		$("#pageApi").html(paggingStr);
  	}
  }

/*******************************************
** YG 프론트 커스토머 리스트
*******************************************/
var _currentPage	= 1;
var _totalCount=1;
var StartIdx = 0;

jQuery.ajaxSetup({cache:false});

/*

// 베스트10 리스트
function Fn_GetList_CustomerBest(){
	var lang = $("#langdiv").val();
	var strURL = "/customer/CustomerList_Best.asp?LANGDIV="+lang;

	var faqhtml1="";
	var faqhtml2="";
	var i,j;
	var nBestCnt;
	var nCnt = 1;

	$.ajax({
		type: "get",
		url: strURL,
		dataType: "json",
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//alert("메인리스트에러="+XMLHttpRequest.responseText);
			alert("내용이 없습니다.");
		},
		success:function(data){

			i = 0;
			$.each(data, function(index, entry) {
				$("#spanlistTotalCont").text(entry.cnt);

				nBestCnt = entry.cnt;

				faqhtml1 = "";


				faqhtml1 += "<div id='faqList_1'>";
				faqhtml1 += "	<div class='faq_pag'>";
				faqhtml1 += "		<ul>";
				faqhtml1 += "			<li><a href='javascript:faqBest10("+ nBestCnt +",1);'><img src='../../images/contents/btn_faq_pag_1_on.gif' alt='1'></a></li>";

				if (nBestCnt > 5){
					faqhtml1 += "			<li><a href='javascript:faqBest10("+ nBestCnt +",2);'><img src='../../images/contents/btn_faq_pag_2.gif' alt='2'></a></li>";
				}

				faqhtml1 += "		</ul>";
				faqhtml1 += "	</div>";
				faqhtml1 += "	<ul class='faq_list'>";


				faqhtml2 = "";

				faqhtml2 += "<div id='faqList_2' style='display:none;'>";
				faqhtml2 += "	<div class='faq_pag'>";
				faqhtml2 += "		<ul>";
				faqhtml2 += "			<li><a href='javascript:faqBest10("+ nBestCnt +",1);'><img src='../../images/contents/btn_faq_pag_1.gif' alt='1'></a></li>";
				faqhtml2 += "			<li><a href='javascript:faqBest10("+ nBestCnt +",2);'><img src='../../images/contents/btn_faq_pag_2_on.gif' alt='2'></a></li>";
				faqhtml2 += "		</ul>";
				faqhtml2 += "	</div>";
				faqhtml2 += "	<ul class='faq_list'>";
				faqhtml2 += "";
				faqhtml2 += "";
				faqhtml2 += "";
				faqhtml2 += "";

				$.each(entry.list, function(index, entry) {
					if (nCnt < 6){
						faqhtml1 += "		<li>";
						faqhtml1 += "			<img src='../../images/contents/ico_faq_best_"+nCnt+".gif' alt='BEST "+nCnt+"'>";
						faqhtml1 += "			<span><a href='javascript:Fn_ChngContBest("+entry.getidx+")'>"+entry.gettitle+"</a></span>";
						faqhtml1 += "		</li>";
					}else{
						faqhtml2 += "		<li>";
						faqhtml2 += "			<img src='../../images/contents/ico_faq_best_"+nCnt+".gif' alt='BEST "+nCnt+"'>";
						faqhtml2 += "			<span><a href='javascript:Fn_ChngContBest("+entry.getidx+")'>"+entry.gettitle+"</a></span>";
						faqhtml2 += "		</li>";
					}

					nCnt += 1;
				});


				faqhtml1 += "	</ul>";
				faqhtml1 += "</div>";

				for (i=0; i< 10-nBestCnt; i++){
					faqhtml2 += "	<li></li>";
				}

				faqhtml2 += "	</ul>";
				faqhtml2 += "</div>";
			});

			$("#div_faq_cont").append(faqhtml1);
			if (nBestCnt > 6){
				$("#div_faq_cont").append(faqhtml2);
			}
		}
	});
}

Fn_GetList_CustomerBest();

// 리스트
function Fn_GetListCustomer(){
	var lang = $("#langdiv").val();
	var key =  $("#SchKey1 option:selected").val();
	var title =  $("#SchTitle1").val();
	var pg = _currentPage;
	var size = 8;

	var strURL = "/customer/CustomerList_Get.asp?LANGDIV="+lang+"&SchKey="+key+"&SchTitle="+encodeURIComponent(title)+"&Page="+pg+"&n2PageSize="+size;
	var html="";
	var i,j;
	var sNewIcon;
	var nTotalCnt;
	var nCnt = 0;
	var nListCnt;

	$.ajax({
		type: "get",
		url: strURL,
		dataType: "json",
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//alert("메인리스트에러="+XMLHttpRequest.responseText);
			alert("내용이 없습니다.");
		},
		success:function(data){

			i = 0;
			$.each(data, function(index, entry) {
				$("#spanlistTotalCont").text(entry.cnt);

				nTotalCnt = entry.cnt;

				nListCnt = nTotalCnt - (pg -1) * size;

				html = "";
				$.each(entry.list, function(index, entry) {
					if (nCnt == 0){
						html += "<tr class='on'>";
					}else{
						html += "<tr>";
					}

					html += "	<td class='empty'></td>";
					html += "	<td class='tit'>"+nListCnt+"</td>";
					html += "	<td class='txt'>";
					html += "		<a href='#' id='"+ entry.getidx +"'>" + entry.gettitle + "</a>";
//					html += "		<span class='date'>"+entry.getreg_dt+"</span>";

					if (entry.getnewyn == "Y"){
						sNewIcon = " <img src='/images/common/ico_new.gif' alt='new'> ";
					}else{
						sNewIcon = " ";
					}

					html += sNewIcon

					html += "	</td>";
					html += "</tr>";

					if (nCnt == 0){
						StartIdx = entry.getidx;
					}

					nCnt +=1;
					nListCnt = nListCnt - 1;

				});
			});

			if (nTotalCnt == 0){
				html += "<tr><td colspan='3'>등록된 FAQ가 없습니다.</td></tr>";
			}

			$("#customerList").empty();
			$("#customerList").append(html);



			// 초기 정보 보여주기
			if (nTotalCnt != 0){
				Fn_ChngCont(StartIdx);
			}

			//페이징
			Fn_Paging(nTotalCnt,pg);

			selectList();
		}
	});
}


// 페이징
function Fn_Paging(nTotalCnt,pg){

	_totalItemCount = nTotalCnt;
	_recordPerPage = 8;

	$("#pager").pager({
				pager: "#pager",
				pagerMode: "text", //text, image 중 선택
				totalItemCount: _totalItemCount,
				recordPerPage: _recordPerPage,
				currentPage: pg,
				pageIndexChanged: Pager.pageIndexChanged,
				prev10Text: "이전",
				next10Text: "다음",
				prev10ImgSrc: "/images/btn_prev10.gif",
				next10ImgSrc: "/images/btn_next10.gif",
				selectedPageFontColor: "red"
		});

	var pageCount = $("#pager").pager.refresh(_totalItemCount, _recordPerPage);
}

// 페이저의 이벤트와 관련된 콜백 메서드들을 정의한다
var Pager = {
	pageIndexChanged: function(selectedPage) {
		_currentPage = selectedPage;
		Fn_GetListCustomer();
	}
}

// 검색
function Fn_SearchCS(){
	_currentPage	= 1;
	Fn_GetListCustomer();
}

// 공지사항 정보 불러오기
function Fn_ChngCont(idx){
	var strURL = "/customer/Customer_INFO.asp?IDX="+idx;
	$.ajax({
		type: "get",
		url: strURL,
		dataType: "html",
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//alert("메인리스트에러="+XMLHttpRequest.responseText);
			alert("내용이 없습니다.");
		},
		success:function(html, textStatus){
			$("#divConts").empty();
			$("#divConts").append(html);
		}
	});
}

// 공지사항 정보 불러오기
function Fn_ChngContBest(idx){
	var strURL = "/customer/Customer_INFO.asp?IDX="+idx;
	$.ajax({
		type: "get",
		url: strURL,
		dataType: "html",
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//alert("메인리스트에러="+XMLHttpRequest.responseText);
		},
		success:function(html, textStatus){
			$("#divConts").empty();
			$("#divConts").append(html);
			$("#customerList tr").removeClass("on");
		}
	});
}

Fn_GetListCustomer();

function selectList() {
	var $list = $('.list_area table'),
		$itemBox = $('tr', $list),
		$item = $('.txt', $list);

	var clearActive = function() { $itemBox.removeClass('on') };

	$item.bind('click', function() {
		var idx = $(this).find('a').attr('id');
		clearActive();
		$(this).parent('tr').addClass('on');
		Fn_ChngCont(idx);
		return false;
	});
}

//FAQ paginate
function faqBest10(topcnt,idx){

	document.getElementById('faqList_1').style.display="none";

	if (topcnt > 6){
		document.getElementById('faqList_2').style.display="none";
	}

	document.getElementById('faqList_'+idx).style.display="";
}

*/

// 문의 보내기
function Fn_CustomerReg(div){
	var lang = $("#langdiv").val();
	var url = "/customer/Pop_Faq_Reg.asp?QDIV=" + div + "&LANGDIV=" + lang;

	f_openWin(url,"faq", 470, 625);
}


// 스크롤바 없는 POP_UP
function f_openWin(url,div, w, h)
{
	var win = window.open(url, div, 'resizable=no,scrollbars=no,x=100,y=200,width=' + w + ',height=' + h);
	win.focus();
}

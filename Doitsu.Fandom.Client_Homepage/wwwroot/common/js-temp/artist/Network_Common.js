//jQuery.ajaxSetup({cache:false}); 
// 20121213 Weibo
var _weiboPage, _sWEIBO, _me2Page, _sMe2Day;
$(function() { 
	 _weiboPage = 1;
	 _sWEIBO = $("#sWEIBO").val();
	Fn_GetListNetworkWEIBO(_sWEIBO);

	 _me2Page = 1;
	 _sMe2Day = $("#sMe2Day").val();
	Fn_GetListNetworkMe2Day(_sMe2Day)
});

// 미투데이 데이터 
function Fn_GetListNetworkMe2Day(id){
	var strURL = "/artist/Me2Day_Get.asp?ME2DAY=" + id + "&page=" + _me2Page;
	var html="";
	var i,j;
	var nTotalCnt;	
	$.ajax({		
		type: "get",
		url: strURL,
		dataType: "json",
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//alert("메인리스트에러="+XMLHttpRequest.responseText);
			//alert("내용이 없습니다.");
		},
		success:function(data){
			i = 0;		
			$.each(data, function(index, entry) {	
				nTotalCnt = entry.cnt;
				html = "";
				$.each(entry.list, function(index, entry) {
					html += "<li>";
					html += "	<div class='img'><img src='"+entry.getimg+"' alt=''></div>";
					html += "	<p class='txt'>";
					html += "		<a href='http://me2day.net/"+entry.getid+"' target='_blank'>";
					html += "			<strong>"+entry.getid+" <span>("+entry.getnic+")</span></strong><br>";
					html += decodeURIComponent(entry.getCont).replace(/\+/g," ");
					html += "		</a>";
					html += "	</p>";
					html += "</li>";
				});					
			});	
			
			if(_me2Page == 1) $("#ulMe2Day").empty();

			if (html == ""){
				$("#me2daylist").hide();
				$("#me2more").hide();
			}
			$("#ulMe2Day").append(html);		
		}
	});	
}

//Fn_GetListNetworkMe2Day(_sMe2Day);

// 더보기
function Fn_Me2More(){
	_me2Page = _me2Page + 1;
	Fn_GetListNetworkMe2Day(_sMe2Day);
}


// 20121213 Weibo
//var _weiboPage = 1;
//var _sWEIBO = $("#sWEIBO").val();

//  데이터 
function Fn_GetListNetworkWEIBO(id){
	var strURL = "/artist/Weibo_Get.asp?WEIBO=" + id + "&page=" + _weiboPage;
	var html="";
	var i,j;
	var nTotalCnt;	
	$.ajax({		
		type: "get",
		url: strURL,
		dataType: "json",
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//alert("메인리스트에러="+XMLHttpRequest.responseText);
			//alert("내용이 없습니다.");
		},
		success:function(data){
			i = 0;		
			$.each(data, function(index, entry) {	
				nTotalCnt = entry.cnt;
				html = "";
				$.each(entry.list, function(index, entry) {
					html += "<li>";
					html += "	<div class='img'><img src='"+(entry.URL_PROFILE_IMG)+"' alt=''></div>";
					html += "	<p class='txt'>";
					html += "		<a href='http://weibo.com/"+entry.WEIBOID+"' target='_blank'>";
					html += "			<strong>"+(entry.WEIBOID)+"</strong><br>";
					html += (entry.URL_THUMB_IMG != "")?"<img src='"+ (entry.URL_THUMB_IMG) +"'><br>":"";
					html +=  ( decodeURIComponent( (entry.TEXT_POST)  ));
					html += "		</a>";
					html += "	</p>";
					html += "</li>";
				});					
			});	
			
			if(_weiboPage == 1) $("#ulWeibo").empty();

			if (html == ""){
				$("#weibodaylist").hide();
				$("#weibomore").hide();
			}
			$("#ulWeibo").append(html);		
		}
	});	
}

//Fn_GetListNetworkWEIBO(_sWEIBO);

// 더보기
function Fn_WEIBOMore(){
	_weiboPage = _weiboPage + 1;
	Fn_GetListNetworkWEIBO(_sWEIBO);
}

function rawurldecode(str) {
	return decodeURIComponent( str + '');
}

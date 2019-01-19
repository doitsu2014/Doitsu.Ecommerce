jQuery.ajaxSetup({cache:false});
// browser check
var isie6 = (navigator.userAgent.toLowerCase().indexOf('msie 6') != -1);

/* schedule */
function scheduleLayer() {
	var $scheduleChart = $('#scheduleChart'),
		$li = $('a', $scheduleChart),
		$layer = $('#schedule_layer'),
		$layerCont = $('.list', $layer),
		bg_ico = $('.bg_ico', $layer),
		btn_close = $('.btn_close', $layer);

	$li.bind('mouseover', function() {
		var $this = $(this),
			offset = $this.offset(),
			chartOffset = $scheduleChart.offset(),
			cont = $this.find('ul').html();

		if (!cont) return false;

		$layerCont.html(cont);

		$layer.show();

		var	cellPosL = offset.left,
			cellPosT = offset.top,
			tablePosL = chartOffset.left,
			cellRemainder = 970 - (cellPosL - tablePosL),
			layerW = $layerCont.width() + 55,
			remainder = layerW - cellRemainder,
			top = cellPosT - ($layerCont.height() + 50);

		if (cellRemainder > layerW) {
			$layer.css({'left': cellPosL, 'top': top});
			bg_ico.css('left', '15px');
		} else {
			$layer.css({'left': cellPosL - remainder, 'top': top});
			bg_ico.css('left', remainder + 15);
		}

		return false;
	});

	$li.bind('mouseout', function() { $layer.hide() });
}

/* gallery */
function showGalleryLayer() {
	var $galleryList = $('#galleryList'),
		$items = $('a', $galleryList),
		$layer = $('#gallery'),
		$layerCont = $('#gallery .cont'),
		$layerImg = $('#gallery .img'),
		$btnClose = $('.btn_close', $layer),
		opa = 0.6,
		$btnPrev = $('.btn_prev', $layer),
		$btnNext = $('.btn_next', $layer),
		paging = 0,
		$layerItem = $('.cont li', $layer),
		maxPaging = $layerItem.length - 1;
	var select = $('.section_gallery select');

	var setWidthHeight = function() {
		var layerImgW = $layerImg.eq(paging).find('img').width(),
			layerImgH = $layerImg.eq(paging).find('img').height();
		$layer.css({'width':(layerImgW + 96) + 'px'});
		$layerCont.css({'width':(layerImgW) + 'px'});
	};

	var setLeft = function() {
		var posL = $galleryList.offset().left,
			layerImgW = 970 - ($layerImg.eq(paging).find('img').width() + 96);
		$layer.css({'left': (posL + layerImgW / 2) + 'px'});
	};

	var setTop = function() {
		var	layerH = $layer.height(),
			windowH = $(window).height(),
			windowtop = $(window).scrollTop(),
			layertop = ((windowH - layerH) / 2)  + windowtop;

		//console.log(layerH, windowtop, layertop)

		if (windowH > layerH) {
			$layer.css({'top': layertop + 'px'});
		} else {
			$layer.css({'top': windowtop + 'px'});
		}
	};

	var showHideBtn = function() {
		if (paging == 0) {
			$btnPrev.hide();
		} else {
			$btnPrev.show();
		}
		if (paging == maxPaging) {
			$btnNext.hide();
		} else {
			$btnNext.show();
		}
	};

	var setBtnPosition = function() {
			layerImgH = $layerImg.eq(paging).find('img').height() - 24;
		$btnPrev.css({'top': Math.abs(layerImgH / 2) + 'px'});
		$btnNext.css({'top': Math.abs(layerImgH / 2) + 'px'});
	};

	$items.bind('click', function() {
		paging = $(this).parent().index();
		if (isie6) { select.css('visibility', 'hidden') }
		var layerBgW = Math.max($(window).width(), $(document).width());
		var layerBgH = Math.max($(window).height(), $(document).height());
		var bg = $('<div id="layerBg" style="position:absolute; left:0; top:0; z-index:100; width:' + layerBgW + 'px; height:' + layerBgH + 'px; background-color:#000; opacity:' + opa + '; filter:alpha(opacity=' + opa * 100 +')"></div>');
		$('body').append(bg);

		$layerItem.hide().eq(paging).show();
		$layer.show();
		var posL = $galleryList.offset().left,
			layerH = $layer.height(),
			windowH = $(window).height(),
			windowtop = $(window).scrollTop(),
			layertop = ((windowH - layerH) / 2)  + windowtop,
			layerImgW = 970 - ($layerImg.eq(paging).find('img').width() + 96);

		if (windowH > layerH) {
			$layer.css({'left': (posL + layerImgW / 2) + 'px', 'top': layertop + 'px'});
		} else {
			$layer.css({'left': (posL + layerImgW / 2) + 'px', 'top': windowtop + 'px'});
		}

		showHideBtn();
		setWidthHeight();
		setBtnPosition();

		$btnClose.bind('click', function() {
			if (isie6) { select.css('visibility', 'visible') }
			$layer.hide();
			$('#layerBg').remove();
			paging = 0;
		});

		/*$(window).resize(function() {
			var docH = $(document).height();
			var winH = $(window).height();
			var h = Math.max(docH, $(window).height());
			$('#layerBg').css({'width': $(document).width() + 'px', 'height': h + 'px'});
		});*/

		return false;
	});

	$btnPrev.bind('click', function() {
		if (paging == 0) return false;
		paging -= 1;
		showHideBtn();
		$layerItem.hide().eq(paging).fadeIn(200);
		setWidthHeight();
		setTop();
		setLeft();
		setBtnPosition();
		$('#layerBg').css({'height': $(document).height() + 'px'});
	});

	$btnNext.bind('click', function() {
//		console.log(paging+", "+maxPaging);
		if (paging == maxPaging) return false;
		paging += 1;
		showHideBtn();
		$layerItem.hide().eq(paging).fadeIn(200);
		setWidthHeight();
		setTop();
		setLeft();
		setBtnPosition();
		$('#layerBg').css({'height': $(document).height() + 'px'});
	});
}



/* SNS */
$.fn.snsShare = function (option) {
	var opt = $.extend({
			url: '',
			title: ''
		}, option);

	$(this).each(function() {
		var $container = $(this),
			me2day = $('.sns_me2day a', $container),
			facebook = $('.sns_facebook a', $container),
			twitter = $('.sns_twitter a', $container);

		me2day.bind('click', function() {
			$(this).attr({'href': 'http://me2day.net/posts/new?new_post[body]="' + encodeURIComponent(opt.url) + '":' + encodeURIComponent(opt.url) + '&new_post[tags]=' + encodeURIComponent(opt.title), 'target': '_blank'});
		});

		facebook.bind('click', function() {
			$(this).attr({'href': 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(opt.url) + '&t=' + encodeURIComponent(opt.title), 'target': '_blank'});
		});

		twitter.bind('click', function() {
			$(this).attr({'href': 'http://twitter.com/share?url=' + encodeURIComponent(opt.url) + '&text=' + encodeURIComponent(opt.title), 'target': '_blank'});
		});
	});
}

/* photo_nav */
$.fn.thumbSlide = function(num, option) {
	var opt = $.extend({
			delay : 500,
			itemIndex : 0,
			currentPage : 0
		}, option);

	$(this).each(function() {
		var $container = $(this),
			itemNum = num,
			$list = $('ul:eq(0)', $container),
			$item = $('li', $list),
			itemLen = $item.length,
			$itemLink = $('a', $item),

			$btnPrev = $('span.btn_prev', $container),
			$btnNext = $('span.btn_next', $container),

			paging = 0,
			maxPaging = parseInt((itemLen - 1) / itemNum),
			maskW;

		var disableItem = function() { $item.removeClass('on') };

		var setList = function() {
			var itemW = $item.outerWidth(),
				itemH = $item.outerHeight() + 15,
				listW = itemW * itemLen;
			maskW = itemW * itemNum;
			var $mask = $('<div style="overflow:hidden; width:' + maskW + 'px; height:' + itemH + 'px"></div>');
			$list.wrap($mask).css({'width': listW});
		};

		var move = function() {
			$list.animate({'marginLeft': '-' + maskW * paging + 'px'}, opt.delay);
			disablePaginate();
			paginateBtn.eq(paging).addClass('on');
		};

		var setMove = function() {
			$list.css({'marginLeft': '-' + maskW * paging + 'px'});
			disablePaginate();
			paginateBtn.eq(paging).addClass('on');
		};

		var next = function() {
			if (paging === maxPaging) return false;
			paging += 1;
		};

		var prev = function() {
			if (paging === 0) return false;
			paging -= 1;
		}

		var paginate = function() {
			var setPaginate = $('<div class="paginate"></div>');
			if (maxPaging > 0) {
				for (var i = 0 ; i < (maxPaging + 1); i += 1) {
					var btn = $('<button type="button"></button>');
					setPaginate.append(btn);
					if (i === 0) { setPaginate.find('button').eq(opt.currentPage).addClass('on') }
				}
			}
			$container.append(setPaginate);
		};

		var init = function() {
			disableItem();
			$item.eq(opt.itemIndex).addClass('on');
			setList();
			paginate();
		};

		init();

		var paginateBtn = $('.paginate button', $container);
		var disablePaginate = function() { paginateBtn.removeClass('on') };
		var currentPaginate = function() {
			paginateBtn.eq(opt.currentPage).addClass('on');

			if (!(opt.itemIndex === 0)) { paging = parseInt(opt.itemIndex / itemNum) }
			if (!(opt.currentPage === 0)) { paging = opt.currentPage }
			setMove();
		};

		currentPaginate();

		$itemLink.bind('click', function() {
			disableItem();
			$(this).parent().addClass('on');
		});

		$btnPrev.bind('click', function() {
			prev();
			move();
		});

		$btnNext.bind('click', function() {
			next();
			move();
		});

		paginateBtn.bind('click', function() {
			paging = $(this).index();
			move();
		});

	});
}

$.fn.slideBox = function (option) {
	var opt = $.extend({
			animation : 500,
			interval : 5000
		}, option);

	$(this).each(function(){
		var $container = $(this),
			$items = $('.item', $container),
			isImage = $items.is('a'),
			w, h,
			bannerIndex = 0,
			maxPaging = $items.length,
			action = true;

		if (isImage) {
			w = parseInt($items.find('img').width());
			h = parseInt($items.find('img').height());
		} else {
			w = parseInt($items.width());
			h = parseInt($items.height());
		}

		if ($items.length == 0) {return false;}

		var paginate = function() {
			var setPaginate = $('<div class="paginate"></div>');
			if (maxPaging > 0) {
				for (var i = 0 ; i < (maxPaging); i++) {
					var btn = $('<button type="button"></button>');
					setPaginate.append(btn);
					if (i == 0) { setPaginate.find('button').eq(0).addClass('on') }
				}
			}
			$container.append(setPaginate);
		};


		paginate();

		var $animationController = $('.banner', $container);
		var $mask = $('<div style="overflow:hidden; position:relative; width:' + w + 'px; height:' + h + 'px">');
		$animationController.wrap($mask);

		$animationController.css('width', w * maxPaging + 'px');
		$items.css('float','left');

		var autorun = function(){
			if (!action) return;

			$animationController.stop().animate({'marginLeft':'-' + w * bannerIndex + 'px'}, opt.animation);
			$container.find('.paginate button').removeClass('on').eq(bannerIndex).addClass('on');
			(bannerIndex >= (maxPaging - 1)) ? bannerIndex = 0 : bannerIndex += 1;
		};

		if (action) {
			setInterval(function() {autorun()}, opt.interval);
			$animationController.hover(
				function(){action = false;},
				function(){action = true;}
			);
		}

		$container.find('.paginate button').click(function() {
			bannerIndex = $(this).index();
			$animationController.stop().animate({'marginLeft':'-' + w * bannerIndex + 'px'}, opt.animation);
			$container.find('.paginate button').removeClass('on').eq(bannerIndex).addClass('on');
			(bannerIndex >= (maxPaging - 1)) ? bannerIndex = 0 : bannerIndex += 1;
		});

		var iphoneChk = navigator.userAgent.toLowerCase().indexOf('iphone') != -1,
			ipod = navigator.userAgent.toLowerCase().indexOf('ipod') != -1,
			ipad = navigator.userAgent.toLowerCase().indexOf('ipad') != -1;

		var pX = 0;
		var endpX = 0;

	    if (iphoneChk || ipod || ipad){
	    	$animationController[0].ontouchstart = function(event) {
	    		var touch = event.touches[0];
	    		pX = touch.pageX;
	    	};

	    	$animationController[0].ontouchmove = function(event) {
	    		var touch = event.touches[0];
	    		endpX = touch.pageX;
	    	};

	    	$animationController[0].ontouchend = function(event) {
	    		if (Math.abs(pX - endpX) > 50) {
	    			if ((pX - endpX) < 0) {
						bannerIndex == 0 ? bannerIndex = maxPaging - 1 : bannerIndex -= 1;
	    			} else {
	    				(bannerIndex >= (maxPaging - 1)) ? bannerIndex = 0 : bannerIndex += 1;
					}
		    		$animationController.stop().animate({'marginLeft':'-' + w * bannerIndex + 'px'}, opt.animation);
					$container.find('.paginate button').removeClass('on').eq(bannerIndex).addClass('on');
				}
	    	}
	    }
	});
}

$.fn.alibannerSlide = function(option){
		var params = jQuery.extend({
			animation : 500,
			random : true,
			interval : 3000,
			motion : 'horizontal'
		}, option);

		$(this).each(function(){
			var $bannerContainer = $(this);
			var $bannerItem = $('.item',$bannerContainer);
			var motion; (params.animation==false) ? motion=0 : motion=params.animation;
			var amount = $bannerItem.size();
			var isImage = $bannerItem.is('a');
			var bannerIndex = '0';
			if ( isImage ){
				var w = parseInt($bannerItem.find('img').width());
				var h = parseInt($bannerItem.find('img').height());
			} else {
				var w = parseInt($bannerItem.width());
				var h = parseInt($bannerItem.height());
			}

			var setbannerNav = $('<div class="bannerNav"></div>');
			setbannerNav.prependTo($bannerContainer);
			if(amount > 1){
				for(i=0 ; i < amount ; i++){
					$('<button type="button" id="'+$bannerContainer.attr('id')+'Btn'+(i+1)+'"></button>').appendTo(setbannerNav);
					$bannerItem.eq(i).attr('id',$bannerContainer.attr('id')+'Banner'+(i+1));
				}
			}

			var randomset = (params.random) ? Math.floor(Math.random()*amount) : 0;
			var bannerIndex = randomset;
			var action; (params.interval > 0) ? action=true : action=false;

			var $animationController = $('.banners', $bannerContainer);
			var $mask = $('<div style="overflow:hidden;position:relative;width:'+w+'px;height:'+h+'px" />');
			$animationController.wrap($mask);

			if(params.motion == 'horizontal'){ // horizontal
				$animationController.css({'width':w*amount+'px'});
				$bannerItem.css('float','left');
			} else { // vertical
				if (isImage) { $bannerItem.find('img').css('display','block'); }
			}

			var $bannerNav = $('.bannerNav button',$bannerContainer);
			$bannerNav.each(function(n) {
				var $thisNum = $(this);
				function bannerShow(){
					bannerMotion(n,motion);
					on($thisNum);
					action = false;
				}
				$thisNum.bind('click',bannerShow);
			});

			function bannerMotion(num,ani){
				bannerIndex = num;
				if(params.motion == 'horizontal'){
					$animationController.stop().animate({'marginLeft':'-'+w*num+'px'},ani,'swing');
				} else {
					$animationController.stop().animate({'marginTop':'-'+h*num+'px'},ani,'swing');
				}
				resetNum();
			}

			function on(nObj){ nObj.addClass('on'); }
			function off(nObj){ nObj.removeClass('on'); }
			function resetNum(){
				$bannerNav.each(function(){off($(this));});
			}

			function setBanner(setup,ani){
				bannerMotion(setup,ani);
				on($('.bannerNav button:eq('+setup+')',$bannerContainer));
			}
			function nextBanner(){
				(bannerIndex >= (amount-1) ) ? bannerIndex = 0 : bannerIndex++;
				setBanner(bannerIndex,motion);
			}
			setBanner(bannerIndex,0);

			function autorun(){
				if(!action) return;
				nextBanner();
			}
			if(action) {
				setInterval(function(){autorun()}, params.interval);
				$bannerContainer.hover(function(){action = false;},function(){action = true;});
			}
		});
	}

// 스크롤바 없는 팝업
function f_openWin(url,div, w, h)
{
	var win = window.open(url, div, 'resizable=no,scrollbars=no,x=100,y=200,width=' + w + ',height=' + h);
	win.focus();
}

// 네비게이션
$('#btn_lang').bind('mouseover', function() {$('#gnbLang').show()});
$('#gnbLang').hover(function() {$('#gnbLang').show()}, function() {$('#gnbLang').hide()});

// 모바일 네비게이션
$('#nav-icon').click(function(){
	$(this).toggleClass('animate-icon');
	$('#overlay').fadeToggle();
	$('html,#header,#nav,#language').toggleClass('hidden');
});
$('#navbar,#language').click(function(){
	$('html,#header,#nav,#language').toggleClass('hidden');
	$('#overlay').fadeToggle();
	$('#nav-icon').removeClass('animate-icon');
});

// 패밀리사이트 바로가기
$('.family_site').hover(
	function() {$(this).addClass('active')},
	function() {$(this).removeClass('active')}
);

// 어바웃 컨텐츠 토글
// function showHideTxt() {
	// var more = $('.btn_moreview');
	// more.bind('click', function() {
    // //$(document).on("click", ".btn_moreview", function() {
		// var $this = $(this),
		// img = $this.find('img');
		// $this.parents('p').find('.hidden_txt').toggle();
		// if (img.attr('src').indexOf('about_btn_more') != -1) {
			// img.attr('src', img.attr('src').replace('about_btn_more.gif', 'about_btn_hide.gif'));
		// } else {
			// img.attr('src', img.attr('src').replace('about_btn_hide.gif', 'about_btn_more.gif'));
		// }
		// return false;
	// });
// };
// $(document).ready(function() {
	// showHideTxt();
// });
	// more.bind('click', function() {
    // $(document).on("click", ".btn_moreview", function() {	
    $(".btn_moreview").bind('click', function() {	// 버젼이 낮아서
		var $this = $(this),
		img = $this.find('img');
		$this.parents('p').find('.hidden_txt').toggle();
		if (img.attr('src').indexOf('about_btn_more') != -1) {
			img.attr('src', img.attr('src').replace('about_btn_more.gif', 'about_btn_hide.gif'));
		} else {
			img.attr('src', img.attr('src').replace('about_btn_hide.gif', 'about_btn_more.gif'));
		}
		return false;
	});

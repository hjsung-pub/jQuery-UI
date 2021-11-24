
$(window).ready(function(event){
	
	//popup show
	popupShow();
	popupClose();
	
	//accordion
	accordianList();
	
	//라인이 따라다니는 tab animaiton
	tabAnimation();
	//tabAnimation02();

	//tab
	tabMenu();

	//Rolling Notice
	rollingNotice();

	//Rolling Notice02
	rollingNotice02();

});

// 클래스를 사용하여 애니메이션 주는 경우 
//function popupShow(){
//	//popup oepn
//	$('.btn-pop').on('click',function(){
//		$('.popup-wrap').addClass('show');
//	});
//	//popup close
//	$('.btn-pop-close').on('click',function(){
//		$('.popup-wrap').addClass('close');
//		$('.popup-wrap.close').find('.popup-btm').one('webkitAnimationEnd animationend',function(){
//			$('.popup-wrap').removeClass('close');
//			$('.popup-wrap').removeClass('show');
//		
//		});
//	});
//}

var tagId; 
// 제이쿼리를 사용하여 애니메이션 주는 경우
 function popupShow(){
 	//popup oepn
	 $('.btn-pop').on('click',function(){
		 tagId = $(this).attr('id'); 
		 console.log(tagId);
		$('.popup-wrap').fadeIn().addClass('show').removeClass('close');
		//팝업에 포커스
		$('.popup-wrap').attr("tabindex", 0).show().focus();
 	});
	
// 	if($('.popup-wrap').hasClass('show')){
// 		$('.popup-wrap').fadeIn();
// 	}else{
// 		$('.popup-wrap').fadeOut();
// 	}
 }

function popupClose(){
	//popup close
	$('.btn-pop-close').on('click',function(){
		$(this).parents('.popup-wrap').fadeOut().addClass('close').removeClass('show');
		//팝업 포커스 지우기
		$(this).parents('.popup-wrap').removeAttr("tabindex");
		//기존 버튼에 포커스주기
		$('#'+tagId).focus();
	});
}

// popup bg click시 close
$('.popup-wrap').on("touchstart mouseup", function (e){
	console.log("Dddddd");
	var popBgClose = $(".popup-btm .popup");

	// tooltip
	if (!popBgClose.is(e.target) && popBgClose.has(e.target).length == 0) {
		popBgClose.parents().find(".popup-wrap").fadeOut().addClass("close").removeClass("show");
		//팝업 포커스 지우기
		popBgClose.parents().find(".popup-wrap").removeAttr("tabindex");
	}

	return false;
});

//말줄임이 있는 경우
function accordianList(){
	$('.acdn-list .title button').click(function() {
		$(this).toggleClass('ellipsis').toggleClass('selected');
		//클릭된 나 자신을 제외한 나머리 링크들은 slected 클래스를 무조건 제거
		$('.acdn-list .title button').not(this).removeClass('selected');
		//클릭된 나 자신을 제외한 나머리 링크들은 ellipsis 클래스를 무조건 추가(말줄임)
		$('.acdn-list .title button').not(this).addClass('ellipsis');


		// 펼칠 내용 영역 선택
		var target = $(this).parents('li').find('.cont');

		// 나머지 내용 영역을 선택
		var other = $('.acdn-list .title button').not(this).parents('li').find('.cont');

		// 애니메이션으로 열고 닫기 처리
		target.slideToggle(300);
		other.slideUp(300);

		// 링크 페이지 이동 중지
		return false;
	});
}

//말줄임이 없는 경우 
function accordianList02(){
	$('.acdn-list .title button').click(function() {
		$(this).toggleClass('selected');
		//클릭된 나 자신을 제외한 나머리 링크들은 slected 클래스를 무조건 제거
		$('.acdn-list .title button').not(this).removeClass('selected');

		// 펼칠 내용 영역 선택
		var target = $(this).parents('li').find('.cont');

		// 나머지 내용 영역을 선택
		var other = $('.acdn-list .title button').not(this)
		.parents('li').find('.cont');

		// 애니메이션으로 열고 닫기 처리
		target.slideToggle(300);
		other.slideUp(300);

		// 링크 페이지 이동 중지
		return false;
	});
}

function tabAnimation(){
	var nav = $('.tab-menu');
	var line = $('<div />').addClass('line');

	line.appendTo(nav);

	var active = nav.find('.on');
	var pos = 0;
	var wid = 0;

	if(active.length) {
		pos = active.position().left;
		wid = active.outerWidth();
		line.css({
			left: pos,
			width: wid
		});
	}

	nav.find('li button').click(function(e) {
		e.preventDefault();
		if(!$(this).parent().hasClass('on') && !nav.hasClass('animate')) {

			nav.addClass('animate');

			var _this = $(this);

			nav.find('li').removeClass('on');

			var position = _this.parent().position();
			var width = _this.parent().outerWidth();

			if(position.left >= pos) {
				line.animate( 300, function() {
					line.animate({
						width: width,
						left: position.left
					}, 300, function() {
						nav.removeClass('animate');
					});
					_this.parent().addClass('on');
				});
			} else {
				line.animate({
					left: position.left,

				}, 300, function() {
					line.animate({
						width: width
					}, 150, function() {
						nav.removeClass('animate');
					});
					_this.parent().addClass('on');
				});
			}

			pos = position.left;
			wid = width;
		}
	});
}


function tabAnimation02(){
	var nav = $('.tab-menu');
	var line = $('<div />').addClass('line');

	line.appendTo(nav);

	var active = nav.find('.on');
	var pos = 0;
	var wid = 0;

	if(active.length) {
		pos = active.position().left;
		wid = active.width();
		line.css({
			left: pos,
			width: wid
		});
	}

	nav.find('li button').click(function(e) {
		e.preventDefault();
		if(!$(this).parent().hasClass('on') && !nav.hasClass('animate')) {

			nav.addClass('animate');

			var _this = $(this);

			nav.find('li').removeClass('on');

			var position = _this.parent().position();
			var width = _this.parent().width();

			if(position.left >= pos) {
				line.animate({
					width: ((position.left - pos) + width)
				}, 300, function() {
					line.animate({
						width: width,
						left: position.left
					}, 150, function() {
						nav.removeClass('animate');
					});
					_this.parent().addClass('on');
				});
			} else {
				line.animate({
					left: position.left,
					width: ((pos - position.left) + wid)
				}, 300, function() {
					line.animate({
						width: width
					}, 150, function() {
						nav.removeClass('animate');
					});
					_this.parent().addClass('on');
				});
			}

			pos = position.left;
			wid = width;
		}
	});
}



function tabMenu(){
	$('.tab-cont').hide();
	$('.tab-cont:first').show();
	$('.tab-menu button').on('click',function(){
		$('.tab-menu li').removeClass('on');
		$(this).parent().addClass('on');

		$('.tab-cont').hide().removeClass('animate');
		var activeTab = $(this).attr('data-tab');
		//fadeIn
		$('#'+activeTab).fadeIn(1000);
		
		//fadeInUp
		//$('#'+activeTab).show().addClass('animate');

		return false;
	});
}



//Rolling Notice (미완성)
function rollingNotice(){
	var count = $('.notic-list li').length;
	var height = $('.notic-list li').height();
	function step(index) {
		$('.notic-list ul').delay(2000).animate({
			top: - height * index,
		}, 500, function() {
			step((index + 1) % count);
		});
	}
	step(1);
	
	$('.notic-list li').on('focusin mouseover',function(){
		var posUL = -$(this).parent().position().top;
		var posLi = $(this).position().top;
		var posTop2 = ($(this).index()) *height;
		
		console.log(posUL +'======'+posLi+'======'+ posTop2)
		if(posLi == posTop2){
			console.log("d");
			$('.notic-list ul').stop(true).animate({top:-posLi});
		}
	});
//	$('.notic-list li').on('focusout mouseout',function(){
//		var idx = $(this).index();
//		step(idx);
//	});
}

//Rolling Notice02 (미완성)
function rollingNotice02(){
	var noti_h = $(".rolling-wrap").height();
	var noti_num = $(".rolling-box li").length;
	var max = noti_h * noti_num;
	var move = 0;
	
	function noticeRolling(){
		move += noti_h;
		$(".rolling-box").animate({"top":-move},600,function(){
			if(move >= max){
				$(this).css("top",0);
				move = 0;
			}
		});
	};
	noticeRollingOff = setInterval(noticeRolling,2000);
	$(".rolling-box").append($(".rolling-box li").first().clone());


	$('.rolling-box li ').on('focusin mouseover',function(){
		clearInterval(noticeRollingOff);
	});

	$('.rolling-box li ').on('focusout mouseout',function(){
		noticeRollingOff = setInterval(noticeRolling,2000);
	});
}


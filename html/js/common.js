$(document).ready(function(){
	/* ==========================================================================
		GNB
	========================================================================== */
	resizeGnb();// GNB
	resizeMid();// 웹/모바일 리사이징
	// gnb 버튼
	$('.btn-gnb').click(function(){
		$('.gnb-utill').show();
		$('.gnb-utill').animate({right:0}, 300);
	});
	$('.gnb-utill .btn-close').click(function(){
		$('.gnb-utill').animate({right:'-100%'}, 300, function(){
			$('.gnb-utill').hide();
		});
	});

	// 하위 리스크 있을경우 버튼생성
	$('.depth2-list').each(function(){
		$(this).closest('.depth1-item').addClass('inList').find('.d-title').append('<em class="icon">아이콘영역</em>');
	});
	// 하위 리스트 있을경우 링크 막음
	$('.inList .d-title').click(function(e){
		e.preventDefault();
		if($(this).closest('.depth1-item').hasClass('on')){
			$(this).closest('.depth1-item').removeClass('on')
				.find('.depth2-list').slideUp(100)
				.siblings('.d-title').removeClass('fColor')
				.find('.icon').removeClass('bgColor');
		}else{
			$('.depth1-item').removeClass('on')
				.find('.depth2-list').slideUp(100)
				.siblings('.d-title').removeClass('fColor')
				.find('.icon').removeClass('bgColor');
			$(this).closest('.depth1-item').addClass('on')
				.find('.depth2-list').slideDown(200)
				.siblings('.d-title').addClass('fColor')
				.find('.icon').addClass('bgColor');
		}
	});

	// 원뎁스 스크롤
	$('.web .gnb-menu-box').each(function(){
		$(this).enscroll({
			verticalTrackClass: 'track',
			verticalHandleClass: 'handle',
			minScrollbarLength: 28
		});
	});
	// 투뎁스 스크롤
	$('.web .depth1 .depth1-list').each(function(){
		$(this).enscroll({
			verticalTrackClass: 'track',
			verticalHandleClass: 'handle',
			minScrollbarLength: 28
		});
	});

	// 모바일
	$(document).on('click', '.mobile .gnb-item .gnb-title', function(e){
		e.preventDefault();
		if($(this).closest('.gnb-item').hasClass('on')){
			$(this).closest('.gnb-item').removeClass('on').find('.depth1').slideUp(200);
		}else{
			$('.mobile .gnb-item').removeClass('on').find('.depth1').slideUp(200);
			$(this).closest('.gnb-item').addClass('on').find('.depth1').slideDown(200);
		}
	});

	// 서브 gnb 토클버튼
	$('.btn-gnb-toggle').click(function(){
		if($(this).hasClass('on')){
			$('.gnb-menu-box').animate({top:'-100%'}, 300, function(){
				$(this).hide();
			});
			$(this).removeClass('on').animate({top:50}, 300);
		}else{
			$('.gnb-menu-box').show().animate({top:0}, 300);
			$(this).addClass('on').animate({top:'100%'}, 300);
		}
	});

	// 페이지 로드시 현재메뉴 표시
	$('.sub-gnb .depth1-item').each(function(){
		if($(this).hasClass('on')){
			$(this).find('.depth2-list').show()
				.siblings('.d-title').find('.icon').addClass('bgColor');
		}
	});

	/* ===================================================================================
		폼요소
	=================================================================================== */
	/* 체크박스 */
	$('input[type=checkbox].styled1').each(function(){
		$(this).wrap('<span class="checkWrap">');
		if(this.checked){
			$(this).closest('.checkWrap').addClass('checked');
		}
		$(this).change(function(){
			if(this.checked){
				$(this).closest('.checkWrap').addClass('checked');
			}else{
				$(this).closest('.checkWrap').removeClass('checked');
			}
		});
	});
	/* 라디오 */
	$('input[type=radio].styled1').each(function(){
		$(this).wrap('<span class="radioWrap">');
		if(this.checked){
			$(this).closest('.radioWrap').addClass('checked');
		}
		$(this).change(function(){
			var name = $(this).attr('name');
			if(this.checked){
				$('input[name="'+ name +'"]').closest('.radioWrap').removeClass('checked');
				$(this).closest('.radioWrap').addClass('checked');
			}
		});
	});
	/* 셀렉트박스 */
	$('select.styled1').each(function(){
		var val = $(this).val();
		$(this).wrap('<span class="selectWrap">');
		$(this).closest('.selectWrap').prepend('<span class="selTitle">'+val+'</span>');
		$(this).change(function(){
			var cVal = $(this).val();
			$(this).closest('.selectWrap').find('.selTitle').html(cVal).removeClass('bdColor');
			$(this).blur();
		});
		$(this).focus(function(){
			$(this).closest('.selectWrap').find('.selTitle').addClass('bdColor');
		});
		$(this).blur(function(){
			$(this).closest('.selectWrap').find('.selTitle').removeClass('bdColor');
		});
	});
	selectWid();// 셀렉트 박스넓이 설정

	/* ===================================================================================
		버튼
	=================================================================================== */
	// 스킨 컬러 버튼 오버
	$('.btn-text.fColor').mouseenter(function(){
		$(this).addClass('bgColor');
	}).mouseleave(function(){
		$(this).removeClass('bgColor');
	});
	// 안 읽은 게시물 보기
	$('.btn-icon-text.icon01').click(function(){
		$(this).toggleClass('on');
	});
	// 게시판 리스트 보기방식 설정
	$('.align-btns button').click(function(){
		$(this).closest('.align-btns').find('button').removeClass('on');
		$(this).addClass('on');
	});
	// 게시판 리스트 레이아웃 설정
	$('.layout-btns button').click(function(){
		$(this).closest('.layout-btns').find('button').removeClass('on');
		$(this).addClass('on');
	});

	/* ===================================================================================
		탭
	=================================================================================== */
	// 탭 (오버) : class="tab-wrap-over"
	$('.tab-wrap-over').each(function(){
		$(this).find('.tab-list .item').mouseenter(function(){
			$(this).closest('.tab-list').find('.item').removeClass('on');
			$(this).addClass('on');
			var idx = $(this).index();
			$(this).closest('.tab-wrap-over').find('.tab-cont').removeClass('on').eq(idx).addClass('on');
		});
	});

	// 탭 (클릭) : class="tab-wrap-click"
	$('.tab-wrap-click').each(function(){
		$(this).find('.tab-list .item').click(function(){
			$(this).closest('.tab-list').find('.item').removeClass('on');
			$(this).addClass('on');
			var idx = $(this).index();
			$(this).closest('.tab-wrap-click').find('.tab-cont').removeClass('on').eq(idx).addClass('on');
		});
	});

	/* ===================================================================================
		말줄임
	=================================================================================== */
	$('.dotLine2').dotdotdot();// 2 줄
	$('.dotLine3').dotdotdot();// 3 줄
	$('.dotLine4').dotdotdot();// 4 줄
	$('.dotLine5').dotdotdot();// 5 줄

	/* ===================================================================================
		기타
	=================================================================================== */
	/* 공유범위 박스 오버 */
	$('.share-box .scroll-area .user-box').mouseenter(function(){
		$(this).find('.text').addClass('fColor');
	}).mouseleave(function(){
		$(this).find('.text').removeClass('fColor');
	});
});


$(window).load(function(){

});

$(window).resize(function(){
	resizeGnb();// GNB
	resizeMid();// 웹/모바일 리사이징
	selectWid();// 셀렉트 박스넓이 설정
});


/* GNB 해상도에 따른 분기처리 */
function resizeGnb(){
	var winW = $(window).width();
	if(winW > 1100){
		$('.header').attr('class', 'header web');
		$('.depth1, .gnb-utill').removeAttr('style');

		$('.gnb-wrap .gnb-list .gnb-item').mouseenter(function(){
			$(this).find('.gnb-title').addClass('bgColor');
		}).mouseleave(function(){
			$(this).find('.gnb-title').removeClass('bgColor');
		});
	}else{
		$('.header').attr('class', 'header mobile');
		$('.gnb-menu-box').removeAttr('style');
	}
}


/* 셀렉트박스 넓이 */
function selectWid(){
	$('select.styled1').each(function(){
		var wid = $(this).outerWidth();
		$(this).closest('.selectWrap').css({'width':wid});
	});
}


/* ==========================================================================
	웹/모바일 해상도 대응
========================================================================== */
function resizeMid(){
	var winW = $(window).width();
	if(winW > 800){
		/* 웹 =================================================================== */
		/* 버튼 정렬 */
		$('.btn-item').removeAttr('style');

		/* 탭 리스트 넓이 초기화 */
		$('.tab-list1 .item').removeAttr('style');
	}else{
		/* 모바일 ================================================================= */
		/* 버튼 정렬 */
		$('.btn-align').each(function(){
			var boxW = $(this).outerWidth();
			var len = $(this).find('.btn-item').length;
			var minus = $(this).find('.btn-item.mHide').length;
			var btnW = boxW/(len - minus);
			$(this).find('.btn-item').css({'width':btnW});
		});

		/* 탭 넓이 자동조절 */
		$('.tab-list1').each(function(){
			var tabWid = $(this).outerWidth();
			var len = $(this).closest('.tab-list1').find('.item').length;
			var wid = tabWid/len;
			$(this).closest('.tab-list1').find('.item').css({'width':wid});
		});
	}
}

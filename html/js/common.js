$(document).ready(function(){
	/* ==========================================================================
		GNB
	========================================================================== */
	resizeGnb();// GNB
	resizeMid();// 웹/모바일 리사이징
	dotdotdot();// 말줄임
	// gnb 버튼
	$('.btn-gnb').click(function(){
		var winW = $(window).width();
		$('.header').css({'z-index':'200'});
		if(winW > 800){
			if($(this).hasClass('on')){
				$(this).removeClass('on');
				$('.gnb-wrap').animate({left:-220}, 300, function(){
					$(this).hide();
					$('.header').css({'z-index':'100'});
				});
			}else{
				$(this).addClass('on');
				$('.gnb-wrap').show().animate({left:0}, 300);
			}
		}else{
			$('.gnb-utill').show();
			$('.gnb-utill').animate({right:0}, 300);
		}
	});
	$('.gnb-utill .btn-close').click(function(){
		$('.gnb-utill').animate({right:'-100%'}, 300, function(){
			$('.gnb-utill').hide();
			$('.header').css({'z-index':'100'});
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

	/* 서브 gnb : 트리메뉴 */
	$('.tree-menu .tree-list .list .item').each(function(){
		var len = $(this).find('ul li').length;
		if(len > 0){
			$(this).find('.link').prepend('<button type="button" class="icon bgColor"></button>');
		}
	});
	$(document).on('click', '.tree-menu .link .icon', function(){
		if($(this).closest('.item').hasClass('on')){
			$('.item').removeClass('on').find('ul').slideUp(100);
		}else{
			$(this).closest('.item').addClass('on').find('ul').slideDown(200);
		}
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
			$('.gnb-wrap .enscroll-track').parent('div').remove();
		}else{
			$('.gnb-menu-box').show().animate({top:0}, 300);
			$(this).addClass('on').animate({top:'100%'}, 300);
			// 원뎁스 스크롤
			$('.web .gnb-menu-box').each(function(){
				$(this).enscroll({
					verticalTrackClass: 'track',
					verticalHandleClass: 'handle',
					minScrollbarLength: 28
				});
			});
			// 투뎁스 스크롤
			$('.web .depth1').each(function(){
				$(this).enscroll({
					verticalTrackClass: 'track',
					verticalHandleClass: 'handle',
					minScrollbarLength: 28
				});
			});
		}
	});

	// 페이지 로드시 현재메뉴 표시
	$('.sub-gnb .depth1-item').each(function(){
		if($(this).hasClass('on')){
			$(this).find('.depth2-list').show()
				.siblings('.d-title').addClass('fColor').find('.icon').addClass('bgColor');
		}
	});

	/* ===================================================================================
		폼요소
	=================================================================================== */
	/* 입력박스 */
	//오버/아웃
	$('input[type=text], input[type=number], textarea').focus(function(){
		$(this).addClass('bdColor').closest('.search-text').find('.btn-search').addClass('bgColor');
	}).blur(function(){
		$(this).removeClass('bdColor').closest('.search-text').find('.btn-search').removeClass('bgColor');
	});
	// 필수체크 인풋
	$('input.required').each(function(){
		$(this).wrap('<span class="required-box"></span>');
		$(this).parent('.required-box').append('<span class="message fColor">필수 항목입니다.</span>');
	});
	$('input.required').blur(function(){
		var len = $(this).val().length;
		if(len == 0){
			$(this).parent('.required-box').find('.message').fadeIn();
		}else{
			$(this).parent('.required-box').find('.message').hide();
		}
	});
	// 검색박스 필수 체크
	$('.search-text .btn-search').click(function(){
		var len = $(this).closest('.search-text').find('input.required').val().length;
		if(len ==0 ){
			$(this).parent('.search-text').find('.message').fadeIn();
		}else{
			$(this).parent('.search-text').find('.message').hide();
		}
	});
	$(document).mouseup(function (e) {
		var msg = $('.search-text .message');
		if (!msg.is(e.target) && msg.has(e.target).length === 0){
			msg.hide();
		}
	});

	/* 체크박스 */
	$('input[type=checkbox].styled1').each(function(){
		$(this).wrap('<span class="checkWrap">');
		if(this.checked){
			$(this).closest('.checkWrap').addClass('checked');
		}
		if(this.disabled){
			$(this).closest('.checkWrap').addClass('disabled');
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
		if(this.disabled){
			$(this).closest('.radioWrap').addClass('disabled');
		}
		$(this).change(function(){
			var name = $(this).attr('name');
			if(this.checked){
				$('input[name="'+ name +'"]').closest('.radioWrap').removeClass('checked');
				$(this).closest('.radioWrap').addClass('checked');
			}
		});
	});
	/* 셀렉트박스
	$('select.styled1').each(function(){
		var val = $(this).val();
		$(this).wrap('<span class="selectWrap">');
		$(this).closest('.selectWrap').prepend('<span class="selTitle">'+val+'</span>');
		if(this.disabled){
			$(this).closest('.selectWrap').addClass('disabled');
		}
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
	*/
	selectStyled();
	selectWid();// 셀렉트 박스넓이 설정

	/*
		데이트피커
	*/
	// 기본설정
	$('.datepicker').each(function(){
		var alt = $(this).closest('.date-text').find('.btn-calendar input');
		$(this).datepicker({ 
			changeMonth: true,
			changeYear: true,
			altFormat: "yy.mm.dd",
			monthNamesShort: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ],
			dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
			altField: alt,
			onSelect: function(dateText, inst) {
				$('.dimmed').remove();
				$('.btn-calendar input').removeClass('bdColor')
					.closest('.date-text').css({'z-index':'1'}).removeClass('on')
					.find('.calendar-layer').hide();
				$('.week-setting-box .btn-calendar').removeClass('bdColor')
					.closest('.week-setting-box').css({'z-index':'1'}).removeClass('on')
					.find('.calendar-layer').hide();
			}
		});
	});
	// 달력레이어 열기
	$('.date-text .btn-calendar').click(function(){
		if($(this).closest('.date-text').hasClass('on')){
			$('.btn-calendar input').removeClass('bdColor')
				.closest('.date-text').css({'z-index':'1'}).removeClass('on')
				.find('.calendar-layer').hide();
			$('.dimmed').remove();
		}else{
			$(this).find('input').addClass('bdColor')
				.closest('.date-text').css({'z-index':'100'}).addClass('on')
				.find('.calendar-layer').fadeIn();
			$(this).append('<div class="dimmed opacity"></div>');
		}
	});
	$('.btn-calendar input').blur(function(){
		if($(this).closest('.date-text').hasClass('on')){
			$(this).addClass('bdColor');
		}
	});
	$('.week-setting-box .btn-calendar').click(function(){
		$(this).addClass('bdColor')
			.closest('.week-setting-box').css({'z-index':'100'}).addClass('on').append('<div class="dimmed opacity"></div>')
			.find('.calendar-layer').fadeIn();
	});
	// 달력레이어 닫기
	$(document).on('click', '.dimmed', function(){
		$('.dimmed').remove();
		$('.btn-calendar input').removeClass('bdColor')
			.closest('.date-text').css({'z-index':'1'}).removeClass('on')
			.find('.calendar-layer').hide();
		$('.week-setting-box .btn-calendar').removeClass('bdColor')
			.closest('.week-setting-box').css({'z-index':'1'}).removeClass('on')
			.find('.calendar-layer').hide();
	});

	$(document).on('mouseenter', '.weekType .ui-state-default', function(){
		$(this).parents('tr').addClass('over').next('tr').addClass('overNext');
	});
	$(document).on('mouseleave', '.weekType .ui-state-default', function(){
		$('tr').removeClass('over').next('tr').removeClass('overNext');
	});

	/* ===================================================================================
		버튼
	=================================================================================== */
	// 아이콘 on/off
	$('.btn-icon-text, .btn-icon').click(function(){
		$(this).toggleClass('on');
	});

	$('.btn-attach').click(function(){
		$(this).toggleClass('on');
	});


	// 게시판 리스트 보기방식 설정
	$('.align-btns button').click(function(){
		$(this).closest('.align-btns').find('button').removeClass('on');
		$(this).addClass('on');
		if($(this).hasClass('btn-align1')){
			$('.list-type').show();
			$('.thumb-type').hide();
		}else{
			$('.list-type').hide();
			$('.thumb-type').show();
		}
		dotdotdot();// 말줄임
	});

	// 게시판 리스트 레이아웃 설정
	$('.layout-btns button').click(function(){
		$(this).closest('.layout-btns').find('button').removeClass('on');
		$(this).addClass('on');

		if($(this).hasClass('btn-layout1')){
			$('.list-view').attr('class', 'list-view');
		}
		if($(this).hasClass('btn-layout2')){
			$('.list-view').attr('class', 'list-view layoyt2');
		}
		if($(this).hasClass('btn-layout3')){
			$('.list-view').attr('class', 'list-view layoyt3');
		}
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

	//
	$('.tab-list1 .item').click(function(){
		var idx = $(this).index();
		$(this).parents('.tab-list1').find('.item').removeClass('fColor');
		$(this).addClass('fColor');
		$(this).closest('.tabArea').find('.tabCont').removeClass('on').eq(idx).addClass('on');
	});

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

/* 셀렉트박스 디자인 */
function selectStyled(){
	$('select.styled1').each(function(){
		var val = $(this).val();
		$(this).wrap('<span class="selectWrap">');
		$(this).closest('.selectWrap').prepend('<span class="selTitle">'+val+'</span>');
		if(this.disabled){
			$(this).closest('.selectWrap').addClass('disabled');
		}
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
}
/* 셀렉트박스 넓이 */
function selectWid(){
	$('select.styled1').each(function(){
		if($(this).closest('.selectWrap').outerWidth() < 70){
			var wid = $(this).outerWidth();
			$(this).closest('.selectWrap').css({'width': wid});
		}else{
			var wid = $(this).attr('style');
			$(this).closest('.selectWrap').attr('style', wid);
		}
	});
}

/* 말줄임 */
function dotdotdot(){
	$('.dotLine2').dotdotdot();// 2 줄
	$('.dotLine3').dotdotdot();// 3 줄
	$('.dotLine4').dotdotdot();// 4 줄
	$('.dotLine5').dotdotdot();// 5 줄
}

/* ==========================================================================
	웹/모바일 해상도 대응
========================================================================== */
function resizeMid(){
	$('.gnb-wrap').removeAttr('style');
	$('.btn-gnb').removeClass('on');
	var winW = $(window).width();
	if(winW > 800){
		/* 웹 =================================================================== */
		/* 모바일 전용 gnb 메뉴 복사 제거 */
		$('.gnb-select').remove();

		/* 버튼 정렬 */
		$('.btn-item').removeAttr('style');

		/* 아이콘 버튼 오버 */
		$('.btn-icon-text.icon03').mouseenter(function(){
			$(this).addClass('bgColor');
		}).mouseleave(function(){
			$(this).removeClass('bgColor');
		});

		// 스킨 컬러 버튼 오버
		$('.btn-text.fColor').mouseenter(function(){
			$(this).addClass('bgColor');
		}).mouseleave(function(){
			$(this).removeClass('bgColor');
		});

		/* 탭 리스트 넓이 초기화 */
		$('.tab-list1 .item').removeAttr('style');

		/* 태깅 */
		$('#js-tagBox').each(function(){
			$(this).tagging();
			$(this).find('.type-zone').focus(function(){
				$(this).closest('.tagging-box').find('.fake-placeholder').hide();
			});
			$(this).find('.type-zone').blur(function(){
				var len = $(this).closest('.tagging').find('.tag').length;
				if(len > 0){
					$(this).closest('.tagging-box').find('.fake-placeholder').hide();
				}else{
					$(this).closest('.tagging-box').find('.fake-placeholder').show();
				}
			});
		});

		/* 검색박스 셀렉트 text(년/월) 제거 */
		textRemove();
	}else{
		/* 모바일 ================================================================= */
		/*
			gnb 영역 컨텐츠로 이동
		*/
		/* 상단 트리메뉴 */
		$('.depth-top .tree-menu').each(function(){
			$('.content .title-wrap').prepend('<div class=""></div>');
		});

		/* 하단메뉴 */
		$('.gnb-select').remove();
		$('.sub-gnb .bottom-menu').each(function(){
			var html = $(this).html();
			var title = $(this).find('.menu-title').text();
			$('.content .title-wrap').prepend('<div class="gnb-select"><select class="styled1" style="width:100%;"></select></div>');
			$('.gnb-select select').prepend('<option>' + title + '</option>');
		});
		$('.sub-gnb .bottom-menu .menu-item a').each(function(){
			var text = $(this).text();
			var url = $(this).attr('href');
			$('.gnb-select select').append('<option data="' + url + '">' + text + '</option>');
		});
		// 현재 선택되어 있는 메뉴
		var gnbSel = $('.sub-gnb .menu-item.on a').text();
		$('.gnb-select select').val(gnbSel);
		//selectStyled();
		// 링크 이동
		$('.gnb-select select').change(function(){
			var url = $(this).find('option:selected').attr('data');
			if(! $(this).find('option:selected').attr('data') == false) window.location.href=url;
		});


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

		/* 검색박스 셀렉트 text(년/월) 추가 */
		textRemove();
		$('select.year option').each(function(){
			var text = $(this).text();
			var value = $(this).closest('select').val();
			$(this).text(text + '년').closest('.selectWrap').find('.selTitle').text(value);
		});
		$('select.month option').each(function(){
			var text = $(this).text();
			var value = $(this).closest('select').val();
			$(this).text(text + '월').closest('.selectWrap').find('.selTitle').text(value);
		});
	}
}


/* 검색박스 셀렉트 text(년/월) 제거 */
function textRemove(){
	$('select.year option').each(function(){
		var text = $(this).text();
		var textReplace = text.replace('년', '');
		var value = $(this).closest('select').val();
		$(this).text(textReplace).closest('.selectWrap').find('.selTitle').text(value);
	});
	$('select.month option').each(function(){
		var text = $(this).text();
		var textReplace = text.replace('월', '');
		var value = $(this).closest('select').val();
		$(this).text(textReplace).closest('.selectWrap').find('.selTitle').text(value);
	});
}
(function($) {
	$(document).ready(function(){
		/* ==========================================================================
			GNB
		========================================================================== */
		//resizeGnb();// GNB
		resizeMid();// 웹/모바일 리사이징
		dotdotdot();// 말줄임
		iframeHeight(); //아이프레임높이

		//상단 사용자 레이어팝업
		$('.header .user-box').click(function(){
			$('.btn-naver').removeClass('on').closest('.header').find('.naver-list').removeClass('on');
			if($(this).hasClass('on')){
				$(this).removeClass('on').next('.user-menu').removeClass('on');
			}else{
				$(this).addClass('on').next('.user-menu').addClass('on');
			}
		});
		$('.user-menu .btn-close2').click(function(){
			$('.header .user-box').removeClass('on').next('.user-menu').removeClass('on');
		});
		// 모바일
		$(document).bind('touchend', function(e){
			var menu = $('.mobile .user-menu .inner');
			if (!menu.is(e.target) && menu.has(e.target).length === 0){
				$('.header .user-box').removeClass('on').next('.user-menu').removeClass('on');
			}
		});

		//상단 네이버웍스 레이어팝업(태블릿)
		$('.btn-naver').click(function(){
			$('.header .user-box').removeClass('on').closest('.header').find('.user-menu').removeClass('on');
			if($(this).hasClass('on')){
				$(this).removeClass('on').closest('.header').find('.naver-list').removeClass('on');
			}else{
				$(this).addClass('on').closest('.header').find('.naver-list').addClass('on');
			}
		});
		$('.naver-list .btn-close2').click(function(){
			$('.btn-naver').removeClass('on').closest('.header').find('.naver-list').removeClass('on');
		});
		// 모바일
		$(document).bind('touchend', function(e){
			var menu = $('.mobile .naver-list .inner');
			if (!menu.is(e.target) && menu.has(e.target).length === 0){
				$('.btn-naver').removeClass('on').closest('.header').find('.naver-list').removeClass('on');
			}
		});

		// gnb 버튼
		$('.btn-gnb').click(function(){
			var winW = $(window).width();
			if(winW > 800){
				if($(this).hasClass('on')){
					$(this).removeClass('on');
					$('.gnb-sliding').animate({left:-220}, 300, function(){
						$(this).hide();
						$('.header').css({'z-index':'100'});
					});
				}else{
					$(this).addClass('on');
					$('.gnb-sliding').show().animate({left:0}, 300);
				}
			}else{
				$('#cont-iframe').contents().find('.gnb-utill, .gnb-sliding').show();
				$('#cont-iframe').contents().find('.gnb-utill').animate({right:0}, 300, function(){
					$('.btn-close-box').fadeIn(200);
				});
			}
		});
		$('.btn-close-box .btn-close').click(function(){
			$('.btn-close-box').fadeOut(100);
			$('#cont-iframe').contents().find('.gnb-utill').animate({right:'-100%'}, 300, function(){
				$('.gnb-utill').hide();
			});
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

		// 하위 리스트 있을경우 버튼생성
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
		// 2뎁스 하위 리스트 있을경우
		$('.depth3-list').each(function(){
			$(this).closest('.depth2-item').addClass('inList').find('.title2').append('<em class="icon">아이콘영역</em>');
		});
		$('.inList .title2').click(function(e){
			e.preventDefault();
			if($(this).closest('.depth2-item').hasClass('on')){
				$(this).closest('.depth2-item').removeClass('on')
					.find('.depth3-list').slideUp(100)
					.siblings('.title2').removeClass('fColor')
					.find('.icon').removeClass('bgColor');
			}else{
				$('.depth2-item').removeClass('on').find('.depth3-list').slideUp(100);
				$(this).closest('.depth2-item').addClass('on').find('.depth3-list').slideDown(200);
			}
		});
		// 3뎁스 하위 리스트 있을경우
		$('.depth4-list').each(function(){
			$(this).closest('.depth3-item').addClass('inList').find('.title3').append('<em class="icon">아이콘영역</em>');
		});
		$('.inList .title3').click(function(e){
			e.preventDefault();
			if($(this).closest('.depth3-item').hasClass('on')){
				$(this).closest('.depth3-item').removeClass('on').find('.depth4-list').slideUp(100);
			}else{
				$('.depth3-item').removeClass('on').find('.depth4-list').slideUp(100);
				$(this).closest('.depth3-item').addClass('on').find('.depth4-list').slideDown(200);
			}
		});
		// 4뎁스 하위 리스트 있을경우
		$('.depth5-layer').each(function(){
			$(this).closest('.depth4-item').addClass('inList').find('.title4').append('<em class="arrow">아이콘영역</em>');
		});
		$('.web .inList .title4').click(function(e){
			e.preventDefault();
			if($(this).closest('.inList').hasClass('on')){
				$(this).closest('.depth4-list').find('.inList').removeClass('on').find('.depth5-layer').hide();
			}else{
				var winTop = $(window).scrollTop();
				var menuT = $(this).offset().top;
				$(this).closest('.depth4-list').removeClass('on')
				$(this).closest('.inList').addClass('on').find('.depth5-layer').show();
				var hei = ($(this).closest('.inList').find('.depth5-layer').outerHeight()-32)/2;
				var left = $(this).closest('.inList').offset().left + 184;
				$(this).closest('.inList').find('.depth5-layer').css({'left':left, 'top':menuT - winTop, 'margin-top':-hei});
			}
		});
		$(document).mouseup(function (e) {
			var layer5 = $('.web .depth5-layer');
			if(!layer5.is(e.target) && layer5.has(e.target).length === 0){
				layer5.hide().closest('.inList').removeClass('on');
			}
		});
		/* 웹에서 gnb넓이 설정 */
		$('.gnb-utill').click(function(){
			setTimeout(function(){
				var $link = $('.web .depth1-list a');
				var boxArray = $link.map(function(){
					return $(this).outerWidth();
				});
				var linkW = Math.max.apply(Math , boxArray);
				$link.closest('.web .gnb-utill').find('.depth-top, .depth1-list').css('width', linkW);
			}, 200);
		});

		/* 검색 포커스 */
		$('.search-box1 input[type=text], .search-box3 input[type=text]').focus(function(){
			$(this).next('.btn-srch').addClass('bgColor');
		}).blur(function(){
			$(this).next('.btn-srch').removeClass('bgColor');
		});

		$('.search-box2 input[type=text]').focus(function(){
			$(this).next('.btn-text').addClass('bdColor bgColor').css({'color':'#fff'});
		}).blur(function(){
			$(this).next('.btn-text').removeClass('bdColor bgColor').css({'color':'#666'});
		});

		/* 트리메뉴 */
		// 현재 선택된 메뉴 표시
		$('.tree-menu .tree-list li li .link .text.fColor').each(function(){
			$(this).parents('li').addClass('on');
		});
		$('.tree-list li').each(function(){
			var len = $(this).children('ul').length;
			if(len > 0){
				$(this).children('.link').prepend('<button type="button" class="icon bgColor"></button>');
			}
			if($(this).hasClass('on')){
				$(this).children('ul').show();
			}
		});
		// 열려있는경우
		// $('.tree-menu.open').each(function(){
		// 	$(this).find('li, .link').addClass('on');
		// 	$(this).find('ul').show();
		// });
		// 레이어 열고 닫기
		$(document).on('click', '.tree-menu .link .icon', function(){
			if($(this).closest('li').hasClass('on')){
				$(this).closest('.link').removeClass('on')
					.closest('li').removeClass('on')
					.children('ul').slideUp(100);
			}else{
				$(this).closest('.link').addClass('on')
					.closest('li').addClass('on')
					.children('ul').slideDown(200);
			}
		});

		// 우클릭 방지
		$('.content .tree-menu .link .text').on('contextmenu', function() {
			return false;
		});
		// 컨텍스트 메뉴 노출
		$('.tree-menu .link .text').mousedown(function(e){
			if(e.which == 3){
				var boxT = $(this).closest('.tree-menu').offset().top;
				var linkT = $(this).closest('.link').offset().top;
				var top = linkT - boxT + 30;

				var boxL = $(this).closest('.tree-menu').offset().left;
				var linkL = $(this).closest('.link').find('.text').offset().left;
				var ico = $(this).closest('.link').find('.icon').outerWidth();
				var left = linkL - boxL + ico;
				console.log(top);

				$(this).closest('.tree-menu').find('.contextmenu').hide().fadeIn(200).css({'left':left, 'top':top});
				if($(this).closest('.link').hasClass('noDel')){
					$(this).closest('.tree-menu').find('.del').hide();
				}else{
					$(this).closest('.tree-menu').find('.del').show();
				}
			}
		});
		// 컨텍스트메뉴 닫기
		$(document).mouseup(function (e) {
			var conMunu = $('.tree-menu .link .text');
			if (!conMunu.is(e.target) && conMunu.has(e.target).length === 0){
				$('.contextmenu').hide();
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
		$('.mobile .gnb-list .depth4-item .title4').click(function(){
			if($(this).closest('.depth4-item').hasClass('on')){
				$('.mobile .depth4-item').removeClass('on').find('.depth5-layer').slideUp(100);
			}else{
				$('.mobile .depth4-item').removeClass('on').find('.depth5-layer').slideUp(100);
				$(this).closest('.depth4-item').addClass('on').find('.depth5-layer').slideDown(100);
			}
		});

		// 페이지 로드시 현재메뉴 표시
		$('.sub-gnb .depth1-item.on').each(function(){
			$(this).children('.d-title').addClass('fColor');
		});
		$('.sub-gnb .depth2-item').each(function(){
			if($(this).hasClass('on')){
				$(this).parents('li').addClass('on').find('.depth2-list').show()
					.siblings('.d-title').addClass('fColor').find('.icon').addClass('bgColor');
			}
		});
		// 서브 gnb 스크롤 제어
		if($('.depth1-item.on').length > 0){
			$('.sub-gnb').each(function(){
				var itemT = $(this).find('.depth1-item.on').offset().top;
				var itemH = $(this).find('.depth1-item.on').outerHeight();
				var winH = $(window).height();
				if(winH < itemT + itemH) $(this).find('.scroll-area').scrollTop(itemT);
			});
		}

		/* ===================================================================================
			폼요소
		=================================================================================== */
		/* 입력박스 */
		//오버/아웃
		$('input[type=text], input[type=number], input[type=password], textarea').focus(function(){
			$(this).addClass('bdColor').closest('.search-text').find('.btn-search').addClass('bgColor');
		}).blur(function(){
			$(this).removeClass('bdColor').closest('.search-text').find('.btn-search').removeClass('bgColor');
		});
		// 텍스트아레아 자동 높이조절
		$('.autoHei').each(function(){
			$(this).autosize();
		});
		// 필수체크 인풋
		$('input.required').each(function(){
			$(this).wrap('<span class="required-box"></span>');
			$(this).closest('.required-box').append('<span class="message fColor">필수 항목입니다.</span>');
			if($(this).attr('style') == 'width:100%;'){
				$(this).closest('.required-box').css('width', '100%');
			}
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

		rdoChk();// 체크박스/라디오
		/* 체크박스 */
		$(document).on('change', 'input[type=checkbox].styled1', function(){
			if(this.checked){
				$(this).closest('.checkWrap').addClass('checked');
			}else{
				$(this).closest('.checkWrap').removeClass('checked');
			}
		});
		/* 라디오 */
		$(document).on('change', 'input[type=radio].styled1', function(){
			var name = $(this).attr('name');
			if(this.checked){
				$('input[name="'+ name +'"]').closest('.radioWrap').removeClass('checked');
				$(this).closest('.radioWrap').addClass('checked');
			}
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

		/* 검색 영역 */
		$('.search-area input[type=text]').focus(function(){
			$(this).next('.btn-text').addClass('bdColor bgColor').css({'color':'#fff'});
		}).blur(function(){
			$(this).next('.btn-text').removeClass('bdColor bgColor').css({'color':'#666'});
		});

		selectStyled();
		selectWid();// 셀렉트 박스넓이 설정

		/*
			데이트피커
		*/
		// 기본설정
		$('.datepicker').each(function(){
			if($(this).closest('.date-text').hasClass('weekType')){
				// 주단위 날짜설정
			}else{
				var alt = $(this).closest('.date-text').find('.btn-calendar input');
			}
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
			$(this).find('.ui-state-default').removeClass('ui-state-active');

			calendarLayer();// 오른쪽 화면에서 달력 레이어 잘림방지
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
					.closest('.date-text').css({'z-index':'105'}).addClass('on')
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

		// 주단위 선택
		$(document).on('mouseenter', '.weekType .ui-state-default', function(){
			$(this).closest('tr').addClass('over').next('tr').addClass('overNext');
		});
		$(document).on('mouseleave', '.weekType .ui-state-default', function(){
			$('tr').removeClass('over').next('tr').removeClass('overNext');
		});

		/* 파일첨부 */
		$('.input-file2 input[type=file]').change(function(){
			var file = $(this).val();
			$(this).closest('.input-file2').find('input[type=text]').val(file);
		});

		/* 라디오 선택시 컨텐츠 영역 노출 : 다수*/
		$('.formChange').each(function(){
			var idx = $(this).find('.form-list input[type=radio]:checked').index();
			$(this).find('.formItem').eq(idx).show();

			$(this).find('.form-list input[type=radio]').change(function(){
				var on = $(this).closest('.form-list').find('input[type=radio]:checked').closest('.item').index();
				$(this).closest('.formChange').find('.formItem').hide().eq(on).show();
			});
		});

		/* 라디오 선택시 컨텐츠 영역 노출 : 단독*/
		$('.formSingle').each(function(){
			var id = $(this).attr('id');
			if(this.checked){
				$('.' + id).show();
			}
			var name = $(this).attr('name');
			$('input[name=' + name + ']').change(function(){
				if($('.formSingle').is(':checked')){
					$('.' + id).show();
				}else{
					$('.' + id).hide();
				}
			});
		});

		/* ===================================================================================
			버튼
		=================================================================================== */
		// 스크롤 탑 버튼
		$('.btn-scroll-top').click(function(){
			$('html, body').stop().animate({scrollTop:0}, 200);
		});

		/* 하단에 버튼 고정영역이 있을경우 */
		$('.m-fixed-btn').each(function(){
			$('.content').addClass('fixed-btn-type');
		});

		// 아이콘 on/off
		$('.btn-icon-text, .btn-icon.icon02').click(function(){
			$(this).toggleClass('on');
		});

		// 아이콘 on
		$('.btn-icon.icon06').click(function(){
			$(this).addClass('on');
		});

		$('.btn-attach').click(function(){
			$(this).toggleClass('on');
		});

		// 토글버튼 on/off
		$('.btn-toggle').click(function(){
			if($(this).hasClass('fColor')){
				$(this).removeClass('fColor bdColor');
			}else{
				$('.btn-toggle').removeClass('fColor bdColor');
				$(this).addClass('fColor bdColor');
			}
		});

		// 상단 검색 모바일에서 접기
		$('.btn-search-toggle').click(function(){
			if($(this).hasClass('close')){
				$(this).find('.text').text('검색');
				$(this).removeClass('close').addClass('open').prev('.top-search-box').slideUp();
			}else{
			$(this).find('.text').text('접기');
				$(this).removeClass('open').addClass('close').prev('.top-search-box').slideDown();
			}
		});

		// 모바일에서 컨텐츠 접기
		$('.btn-m-toggle').click(function(){
			if($(this).hasClass('on')){
				$(this).removeClass('on').prev('.toggle-cont').slideUp(200);
			}else{
				$(this).addClass('on').prev('.toggle-cont').slideDown(300);
			}
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

		//게시판 소팅
		$('.btn-sorting').click(function(){
			if($(this).hasClass('fColor')){
				if($(this).hasClass('up')){
					$(this).removeClass('up').addClass('down');
				}else{
					$(this).removeClass('down').removeClass('fColor').children('.icon').removeClass('bgColor');
				}
			}else{
				$(this).closest('tr').find('.btn-sorting').removeClass('fColor').removeClass('up').removeClass('down').find('.icon').removeClass('bgColor');
				$(this).addClass('up').addClass('fColor').children('.icon').addClass('bgColor');
			}
		});

		// 프레스버튼
		$('.btn-press').mousedown(function(){
			$(this).css({'background-color':'#d2eaff'});
		}).mouseup(function(){
			$(this).css({'background-color':'#fff'});
		}).mouseleave(function(){
			$(this).css({'background-color':'#fff'});
		});

		// 결재선표시 버튼
		$('.btn-app-tog').click(function(){
			$('.app-list-wrap').slideToggle(100);
		});

		/* 태그 수정 */
		// 웹
		$('.mHide .btn-tagModi').click(function(){
			$(this).closest('.tag-wrap').addClass('modify');
			var ea = $(this).closest('.tag-list').find('.tag').length;
			if(ea > 0){
				$(this).closest('.tag-wrap').find('.fake-placeholder').hide();
				$(this).closest('.tag-list').find('.tag').each(function(){
					var text = $(this).text();
					$(this).closest('.tag-wrap').find('.tagging .type-zone').before('<div class="tag"><span>#</span> ' + text + '<input type="hidden" name="tag[]" value="' + text + '"><a role="button" class="tag-i">x</a></div>');
				});
			}
		});
		$(document).on('keydown', '.tagging', function(e){
			if(e.keyCode == 8 || e.keyCode == 46){
				var ea = $(this).find('.type-zone').val().length;
				if(ea == 0){
					$(this).find('.type-zone').prev('.tag').remove();
				}
			}
		});
		$(document).on('click', '.tag-i', function(){
			$(this).closest('.tag').remove();
		});
		$('.mHide .btnCancel').click(function(){
			$(this).closest('.tag-wrap').removeClass('modify').find('.tag-modify .tagging .tag').remove();
		});
		$('.mHide .btnStorage').click(function(){
			var tag = $(this).closest('.tag-wrap');
			$(tag).find('.tag-list .tag').remove();
			$(tag).find('.tag-modify .tagging .tag').each(function(){
				var text = $(this).find('input[type=hidden]').val();
				$(tag).find('.tag-list .tag-group').append('<a href="#" class="tag">' + text + '</a>');
			});
			$(tag).removeClass('modify').find('.tag-modify .tagging .tag').remove();
		});

		// 모바일
		$('.wHide .btn-tagModi').click(function(){
			$(this).closest('.tag-wrap').addClass('modify');
		});
		$('.wHide .btnCancel').click(function(){
			$(this).closest('.tag-wrap').removeClass('modify');
		});
		$('.wHide .btnStorage').click(function(){
			$(this).closest('.tag-wrap').removeClass('modify');
		});

		/* 댓글달기 */
		$('.btn-reply').click(function(){
			if($(this).hasClass('on')){
				$(this).removeClass('on').closest('.reply-wrap').find('.reply-inupt').hide();
			}else{
				$(this).addClass('on').closest('.reply-wrap').find('.reply-inupt').show();
			}
		});
		/* 댓글 수정 */
		$(document).on('click', '.btn-re-modify', function(){
			$(this).removeClass('on').closest('.reply-wrap').find('.input-area').hide();
			$(this).removeClass('on').closest('.reply-wrap').find('.text-area').show();
			var text = $(this).closest('.reply-item').find('.text-area').html().replace(/<br>/g, '\n');
			$(this).closest('.reply-item').find('.text-area').hide().siblings('.rereply-inupt').show().find('textarea').val(text);
		});
		/* 댓글 저장 */
		$('.reply-item .btn-save').click(function(){
			var text = $(this).closest('.input-area').find('textarea').val().replace(/\n/g, '<br>');
			$(this).closest('.reply-item').find('.text-area').html(text).show().siblings('.rereply-inupt').hide();
		});
		/* 댓글 수정 취소 */
		$('.reply-item .btn-cancel').click(function(){
			$(this).closest('.reply-item').find('.text-area').show().siblings('.rereply-inupt').hide();
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
			기타
		=================================================================================== */
		/* 공유범위 박스 오버 */
		$('.share-box .scroll-area .user-box').mouseenter(function(){
			$(this).find('.text').addClass('fColor');
		}).mouseleave(function(){
			$(this).find('.text').removeClass('fColor');
		});

		//주소록팝업 선택 스타일
		$('.group-info .scroll-area .user-box').click(function(){
				$(this).find('.text').toggleClass('fColor');
		});

		/* 전결리스트 박스 오버 */
		$('.select-box .scroll-area .item-box').click(function(){
			//$(this).click(function(){
				$(this).closest('.select-box').find('.item-box').removeClass('on');
				$(this).closest('.select-box').find('.text').removeClass('fColor');
				$(this).toggleClass('on');
				$(this).find('.text').toggleClass('fColor');
		//	});
		});

		/* 테이블 토글 */
		$('.btn-type .status').click(function(){
			if($(this).closest('.btn-type').hasClass('on')){
				$(this).closest('table').find('.btn-type').removeClass('on').next('.layer-type').find('.layer-box').slideUp(100);
			}else{
				$(this).closest('table').find('.btn-type').removeClass('on').next('.layer-type').find('.layer-box').slideUp(100);
				$(this).closest('.btn-type').addClass('on').next('.layer-type').find('.layer-box').slideDown(200);
			}
		});

		/* ===================================================================================
			레이어 팝업
		=================================================================================== */
		/* 열기 */
		$('.btn-popup').click(function(){
			$('body').append('<div class="pop-dimmed"></div>');
			popResize();// 팝업 리사이징
		});

		/* 닫기 */
		$(document).on('click', '.pop-dimmed, .layer-popup .btn-close', function(){
			$('.layer-popup, .layer-popup-wrap').fadeOut(100);
			$('.pop-dimmed').remove();
			$('.db-dimmed').attr('class', 'pop-dimmed');
		});

		/* 인물정보 팝업 */
		// 열기
		$('.btn-user').click(function(){
			$('body').append('<div class="layer-popup-wrap"></div>');
			$('.layer-popup-wrap').load('../popup/layer_popup.html .user-popup', function(){
				$('.layer-popup-wrap').fadeIn(300);
				var wid = $('.layer-popup').outerWidth();
				var hei = $('.layer-popup').outerHeight();
				$('.layer-popup').css({
					'left':'50%',
					'top':'50%',
					'margin-left':-wid/2,
					'margin-top':-hei/2
				});
			});
		});
		// 닫기
		$(document).on('click', '.user-popup .btn-close', function(){
			$('.layer-popup-wrap').fadeOut(100, function(){
				$('.layer-popup-wrap').remove();
			});
		});
		$(document).mouseup(function(e){
			var layer = $('.user-popup');
			if(!layer.is(e.target) && layer.has(e.target).length === 0){
				$('.layer-popup-wrap').remove();
			}
		});

		// 팝업내 팝업 호출
		$('.btn-dbpop').click(function(){
			$('.pop-dimmed').attr('class', 'db-dimmed');
		});
	});


	$(window).load(function(){
		resizeMid();
		tabClick();
		/* 전저결제 결제선 */
		$('.app-list .line > p span').each(function(){
			var hei = $(this).outerHeight()
			$(this).css({'margin-top':-hei/2});
		});
	});

	$(window).resize(function(){
		//resizeGnb();// GNB
		resizeMid();// 웹/모바일 리사이징
		selectWid();// 셀렉트 박스넓이 설정
		calendarLayer();// 오른쪽 화면에서 달력 레이어 잘림방지
		popResize();// 팝업 리사이징
		iframeHeight(); //아이프레임 높이
		tabClick(); // 탭 tab-list1 웹, 모바일 클릭
	});

	$(window).scroll(function(){
		// 스크롤 탑 버튼
		winTop = $(window).scrollTop();
		if(winTop > 100){
			$('.btn-scroll-top').fadeIn();
		}else{
			$('.btn-scroll-top').fadeOut(300);
		}
	});
})(jQuery);


/* GNB 해상도에 따른 분기처리
function resizeGnb(){
	(function($) {
		var winW = $(window).width();
		if(winW > 800){
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
	})(jQuery);
}
*/

/* 탭 .tab-list1 스크립트 변경 */
function tabClick(){
	(function($) {		
		$('.tab-list1 .item').click(function(){
			if($('.content').hasClass('web')){
				if($(this).closest('.table-area').hasClass('anniversary')){
					$(this).off('click');
				}else{
					var idx = $(this).index();
					$(this).parents('.tab-list1').find('.item').removeClass('fColor');
					$(this).addClass('fColor');
					$(this).closest('.tabArea').find('.tabCont').removeClass('on').eq(idx).addClass('on');
				}
			}else{
				var idx = $(this).index();
				$(this).parents('.tab-list1').find('.item').removeClass('fColor');
				$(this).addClass('fColor');
				$(this).closest('.tabArea').find('.tabCont').removeClass('on').eq(idx).addClass('on');
			}
		});
	})(jQuery);
}

/* 셀렉트박스 디자인 */
function selectStyled(){
	(function($) {
		var sDesign = $('select.styled1').each(function(){
			if(!$(this).parents('span').hasClass('selectWrap')){
				var val = $(this).find('option:selected').text();
				$(this).wrap('<span class="selectWrap">');
				$(this).closest('.selectWrap').prepend('<span class="selTitle">'+val+'</span>');
				if(this.disabled){
					$(this).closest('.selectWrap').addClass('disabled');
				}
				$(this).change(function(){
					var cVal = $(this).find('option:selected').text();
					$(this).closest('.selectWrap').find('.selTitle').html(cVal).removeClass('bdColor');
					$(this).blur();
				});
				$(this).focus(function(){
					$(this).closest('.selectWrap').find('.selTitle').addClass('bdColor');
				});
				$(this).blur(function(){
					$(this).closest('.selectWrap').find('.selTitle').removeClass('bdColor');
				});
			}
		});
	})(jQuery);
}
/* 셀렉트박스 넓이 */
function selectWid(){
	(function($) {
		$('select.styled1').each(function(){
			//var wid = $(this).outerWidth();
			var wid = $(this).attr('style');
			$(this).closest('.selectWrap').attr('style', wid);
		});
	})(jQuery);
}

/* 말줄임 */
function dotdotdot(){
	(function($) {
		$('.dotLine2').dotdotdot();// 2 줄
		$('.dotLine3').dotdotdot();// 3 줄
		$('.dotLine4').dotdotdot();// 4 줄
		$('.dotLine5').dotdotdot();// 5 줄
	})(jQuery);
}

// 오른쪽 화면에서 달력 레이어 잘림방지
function calendarLayer(){
	(function($) {
		$('.date-text').each(function(){
			var dateL = $(this).offset().left;
			var winW = $(window).width();
			var calW = $(this).find('.calendar-layer').outerWidth();
			if(calW > winW - dateL){
				$(this).addClass('right');
			}else{
				$(this).removeClass('right');
			}
		});
	})(jQuery);
}

// iframe 높이값
function iframeHeight(){
	(function($) {
		var winH = $(window).height();
		var headerH = $('.wrapper .header').outerHeight();
		var footerH = $('.footer').outerHeight();
		var contH = winH -  headerH - footerH;

		// console.log('브라우저높이' + winH);
		// console.log('헤더' + headerH);
		// console.log('푸터' + footerH);
		// console.log('아이프레임높이' + contH);

		$('.wrapper').find('iframe').css('height',contH);
	})(jQuery);
}

/* ==========================================================================
	웹/모바일 해상도 대응
========================================================================== */
function resizeMid(){
	(function($) {
		$('.gnb-wrap').removeAttr('style');
		$('.btn-gnb').removeClass('on');

		var winW = $(window).width();
		if(winW > 800){
			/* 웹 =================================================================== */

			//웹일경우 이미지 src
			if($('.container').hasClass('main')){
				$('.header .logo img').attr('src','./images2.0/layout/site_logo.png');
				$('.header .m-logo img').attr('src','./images2.0/layout/site_logo.png');
			}else{
				$('.header .logo img').attr('src','../images2.0/layout/site_logo.png');
				$('.header .m-logo img').attr('src','images2.0/layout/site_logo.png');
			}

			/* gnb */
			$('.gnb-menu-box').enscroll({
				verticalTrackClass: 'track',
				verticalHandleClass: 'handle',
				minScrollbarLength: 28
			});

			$('.gnb-sliding').removeAttr('style');
			$('.wrapper').addClass('web').removeClass('mobile');
			$('.container').addClass('web').removeClass('mobile');
			$('.depth1, .gnb-utill').removeAttr('style');

			$('.gnb-wrap .gnb-list .gnb-item').mouseenter(function(){
				$(this).find('.gnb-title').addClass('bgColor');
			}).mouseleave(function(){
				$(this).find('.gnb-title').removeClass('bgColor');
				$('.depth5-layer').hide().closest('.inList').removeClass('on');;
			});

			/* 모바일 전용 gnb 메뉴 복사 제거 */
			$('.gnb-select').remove();

			/* 버튼 정렬 */
			$('.btn-item').removeAttr('style');

			/* 아이콘 버튼 오버 */
			$('.btn-icon-text.icon03, .btn-icon-text.icon06').mouseenter(function(){
				$(this).addClass('bgColor');
			}).mouseleave(function(){
				$(this).removeClass('bgColor');
			});

			// 스킨 컬러 버튼 오버
			$(document).on('mouseenter', '.btn-text.fColor', function(){
				$(this).addClass('bgColor');
			});
			$(document).on('mouseleave', '.btn-text.fColor', function(){
				$(this).removeClass('bgColor');
			});

			/* 탭 리스트 넓이 초기화 */
			$('.tab-list1 .item').removeAttr('style');

			/* 상단 검색 영역 초기화 */
			$('.top-search-box').show();
			$('.btn-search-toggle').removeClass('open').addClass('close').find('.text').text('접기');

			/* 태깅 */
			$('.js-tagBox').each(function(){
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

			/* 전저결제 결제선 */
			$('.app-list .line').removeClass('mgT').find('.item.new').remove();
			$('.app-list .line').each(function(){
				var ea = $(this).find('.item').length;
				if(ea < 5){
					$(this).append('<div class="item new"></div><div class="item new"></div><div class="item new"></div><div class="item new"></div><div class="item new"></div>');
					$(this).find('.item').eq(4).nextAll('.item').remove();
				}
				if(ea > 5 && ea < 10){
					$(this).append('<div class="item new"></div><div class="item new"></div><div class="item new"></div><div class="item new"></div><div class="item new"></div>');
					$(this).find('.item').eq(9).nextAll('.item').remove();
				}

				var idx = $(this).index();
				if(idx%2 == 1){
					var tHei = $(this).outerHeight();
					var pHei = $(this).prev('.line').outerHeight();
					if(tHei > pHei){
						$(this).next('.line').addClass('mgT');
					}
				}
			});
		}else{
			/* 모바일 ================================================================= */
			//모바일일경우 이미지 src
			if($('.container').hasClass('main')){
				$('.header .logo img').attr('src','./images2.0/layout/site_logo.png');
				$('.header .m-logo img').attr('src','./images2.0/layout/site_logo.png');
			}else{
				$('.header .logo img').attr('src','../images2.0/mobile/layout/site_logo.png');
				$('.header .m-logo img').attr('src','images2.0/mobile/layout/site_logo.png');
			}

			/* gnb */
			$('.wrapper').addClass('mobile').removeClass('web');
			$('.container').addClass('mobile').removeClass('web'); // 추가
			$('.gnb-sliding, .gnb-menu-box').removeAttr('style');
			$('.btn-gnb-toggle').removeClass('on').removeAttr('style');

			/*
				gnb 영역 컨텐츠로 이동
			*/

			/* 하단메뉴 */
			$('.gnb-select').remove();
			$('.sub-gnb .bottom-menu').each(function(){
				var html = $(this).html();
				var title = $(this).find('.menu-title').text();
				$('.content .title-wrap').prepend('<div class="gnb-select"><select class="styled1" style="width:100%;"></select></div>');
				$('.gnb-select select').prepend('<option>' + title + '</option>');
				//selectStyled();
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

			/* 조직도 탭 셀렉트로 변경*/
			$('.tab-select').remove();
			$('.organization-wrap .tab-list1').each(function(){
				var html = $(this).html();
				var title = $(this).find('.fColor').find('a').text();
				$('.organization-wrap .organization-box').prepend('<div class="tab-select wHide"><select class="styled1" style="width:100%;"></select></div>');
			});

			$('.organization-wrap .tab-list1 .item a').each(function(){
				var text = $(this).text();
				var url = $(this).attr('href');
				if($(this).hasClass('fColor')){
					$('.tab-select select').append('<option selected  data="' + url + '">' + text + '</option>');
				}else{
					$('.tab-select select').append('<option data="' + url + '">' + text + '</option>');
				}

				(function($) {
					var sDesign = $('select.styled1').each(function(){
						if(!$(this).parents('a').hasClass('selectWrap')){
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
						}
					});
				})(jQuery);

			});
			// 링크 이동
			$('.tab-select select').change(function(){
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

			tabSize()/* 탭 넓이 자동조절 */

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


			/* 테이블토글(모바일용) 페이지내로 옮김 */

			/* 전저결제 결제선 */
			$('.app-list .line').removeClass('mgT').find('.item.new').remove();
			$('.app-list .line').each(function(){
				var ea = $(this).find('.item').length;
				if(ea < 3){
					$(this).append('<div class="item new"></div><div class="item new"></div><div class="item new"></div><div class="item new"></div><div class="item new"></div>');
					$(this).find('.item').eq(2).nextAll('.item').remove();
				}
				if(ea > 3 && ea < 6){
					$(this).append('<div class="item new"></div><div class="item new"></div><div class="item new"></div><div class="item new"></div><div class="item new"></div>');
					$(this).find('.item').eq(5).nextAll('.item').remove();
				}
				if(ea > 6 && ea < 10){
					$(this).append('<div class="item new"></div><div class="item new"></div><div class="item new"></div><div class="item new"></div><div class="item new"></div>');
					$(this).find('.item').eq(8).nextAll('.item').remove();
				}
			});
		}
	})(jQuery);
}

function rdoChk(){
	(function($) {
		// 체크박스
		$('input[type=checkbox].styled1').each(function(){
			$(this).wrap('<span class="checkWrap">');
			if(this.checked){
				$(this).closest('.checkWrap').addClass('checked');
			}
			if(this.disabled){
				$(this).closest('.checkWrap').addClass('disabled');
			}
		});
		// 라디오
		$('input[type=radio].styled1').each(function(){
			$(this).wrap('<span class="radioWrap">');
			if(this.checked){
				$(this).closest('.radioWrap').addClass('checked');
			}
			if(this.disabled){
				$(this).closest('.radioWrap').addClass('disabled');
			}
		});
	})(jQuery);
}

function rdoChkState(){
	(function($) {
		$('.checkWrap, .radioWrap').removeClass('checked');
		// 체크박스
		$('input[type=checkbox].styled1').each(function(){
			if(this.checked){
				$(this).closest('.checkWrap').addClass('checked');
			}
			if(this.disabled){
				$(this).closest('.checkWrap').addClass('disabled');
			}
		});
		// 라디오
		$('input[type=radio].styled1').each(function(){
			if(this.checked){
				$(this).closest('.radioWrap').addClass('checked');
			}
			if(this.disabled){
				$(this).closest('.radioWrap').addClass('disabled');
			}
		});
	})(jQuery);
}


/* 검색박스 셀렉트 text(년/월) 제거 */
function textRemove(){
	(function($) {
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
	})(jQuery);
}

/* 탭 넓이 자동조절 */
function tabSize(){
	(function($) {
		$('.tab-list1').each(function(){
			var tabWid = $(this).outerWidth();
			var len = $(this).closest('.tab-list1').find('.item').length;
			var wid = tabWid/len;
			$(this).closest('.tab-list1').find('.item').css({'width':wid});
		});
	})(jQuery);
}

/* 팝업 리사이징 */
function popResize(){
	(function($) {
		$('.layer-popup').each(function(){
			var winH = $(window).height();
			var wid = $(this).outerWidth();
			var hei = $(this).outerHeight();
			var contH = $(this).find('.pop-content').outerHeight();
			var headH = $(this).find('.pop-head').outerHeight();

			if(contH > winH - (headH + 40)){
				$(this).css({
					'left':'50%',
					'top':'20px',
					'bottom':'20px',
					'margin-left':-wid/2,
					'margin-top':'0'
				});
			}else{
				$(this).css({
					'left':'50%',
					'top':'50%',
					'bottom':'inherit',
					'margin-left':-wid/2,
					'margin-top':-(contH + headH)/2
				});
			}
		});
	})(jQuery);
}

function gnbLayer(){
	(function($) {
		$('#cont-iframe').contents().find('.gnb-utill, .gnb-sliding').show();
		$('#cont-iframe').contents().find('.gnb-utill').animate({right:0}, 300, function(){
			$('.btn-close-box').fadeIn(200);
		});
	})(jQuery);
}
$(window).load(function(){
	/* 오른쪽 고정영역 */
	// 버튼 오버
	$('.btn-group').mouseenter(function(){
		$(this).addClass('bgColor').addClass('bdColor').find('.text').removeClass('fColor');
	}).mouseleave(function(){
		$(this).removeClass('bgColor').removeClass('bdColor').find('.text').addClass('fColor');
	});

	$('.btn-addlist').mouseenter(function(){
		$(this).addClass('bgColor').find('.text').removeClass('fColor');
	}).mouseleave(function(){
		$(this).removeClass('bgColor').find('.text').addClass('fColor');
	});

	/* 설문수정 */
	// 리스트 열고 닫기


	// 항목 선택
	$(document).on('click', '.survey-item .inner', function(){
		$('.survey-item').removeClass('active');
		$(this).closest('.survey-item').addClass('active');
	});

	// 위아래 이동 버튼
	$(document).on('click', '.btn-up-down .btn-icon', function(){
		var clon = $(this).closest('.survey-item').clone();
		var idx = $(this).closest('.survey-item').index();
		var len = $(this).closest('.survey-list').find('.survey-item').length - 1;

		if($(this).hasClass('btn-up')){
			if(idx > 0){
				$(this).closest('.survey-item').prev('.survey-item').before(clon);
				$(this).closest('.survey-item').remove();
			}
		}else{
			if(idx < len){
				$(this).closest('.survey-item').next('.survey-item').after(clon);
				$(this).closest('.survey-item').remove();
			}
		}
		numbering();//리스트 넘버링
	});

	// 항목 추가
	$(document).on('click', '.survey-item .btn-add-del .btn-add', function(){
		
	});

	// 항목삭제
	$(document).on('click', '.survey-item .btn-add-del .btn-del', function(){
		$(this).closest('.survey-item').remove();
		numbering();//리스트 넘버링
	});

	// 편집
	$(document).on('click', '.btn-modify', function(){
		var sItem = $(this).closest('.survey-item');
		var title = $(sItem).find('.question .text').text();
		$(sItem).addClass('editing').find('.question').prepend('<input type="text" class="editArea" placeholder="내용을 입력해주세요." value="' + title + '">');
		$(sItem).append('<div class="btn-area" class="editArea"><button type="button" class="btn-text btn-cencel">취소</button><button type="button" class="btn-text bdColor fColor">저장</button></div>');

		if($(sItem).hasClass('type1')){
			$(sItem).find('.item-list .item').each(function(){
				var text = $(this).find('label').text();
				console.log(text);
				$(this).append('<div class="editArea textarea"><input type="text" placeholder="내용을 입력해주세요." value="' + text + '"></div');
			});
		}
	});
	$(document).on('click', '.btn-cencel', function(){
		
	});



	// 칼럼 테스트
	var clearIdx = 2;
	var columnItem = '.column' + clearIdx + ' .item';
	$(columnItem).each(function(i){
		var idx = i * 2;
		$('.column2 .item').eq(idx).css({'clear':'both'});
	});

	$(window).resize();
});


$(window).scroll(function(){
	/* 오른쪽 고정영역 스크롤시 위치 */
	var winT = $(window).scrollTop();
	var modiT = $('.survey-modify').offset().top;
	var headH = $('.header').outerHeight();
	if(winT >= modiT - headH){
		$('.modify-wrap').css({'top':winT - 20});
	}else{
		$('.modify-wrap').css({'top':'0'});
	}
});


$(window).resize(function(){
	/* 오른쪽 고정영역 해상도에 따른 스크롤 생성 */
	var winH = $(window).height();
	var wrapT = $('.wrapper').offset().top;
	var conT = $('.content').offset().top;
	var titleH = $('.title-wrap:visible').outerHeight();
	var footH = $('.footer').outerHeight();
	var boxH = winH - (conT - wrapT + titleH + footH + 20);
	$('.modify-wrap').css({'height':boxH});

	$('.modify-wrap').each(function(){
		var wrapH = $(this).outerHeight();
		var boxH = $(this).find('.modify-box').outerHeight();
		if(boxH > wrapH){
			$(this).addClass('scroll');
		}else{
			$(this).removeClass('scroll');
		}
	});

	/* 텍스트 옆 텍스트필드 크기조정*/
	$('.survey-list-item .survey-list .survey-item .item-list.max').each(function(){
		var labelW = $(this).find('label').outerWidth();
		var labelArray = $(this).find('label').map(function(){
			return $(this).outerWidth();
		});
		var moreW = Math.max.apply(Math , labelArray);
		$(this).find('label').css({'width':moreW});
	});
	$('.survey-list-item .survey-list .survey-item .item-list .item .field').each(function(){
		$(this).closest('.item').addClass('textfield');

		var itemW = $(this).closest('.item').outerWidth();
		var laW = $(this).prev('label').outerWidth();
		var chRaW = $(this).closest('.item').find('input.styled1').outerWidth();
		var inW = itemW - (laW+ chRaW + 34);
		$(this).css({'width':inW});
	});
});


/* 리스트 넘버링 */
function numbering(){
	$('.survey-item').each(function(){
		var numIdx = $(this).index() + 1;
		$(this).find('.question-area .number .num').text(numIdx);
	});
}
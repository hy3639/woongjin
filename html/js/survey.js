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

	/* ==================================================================================================
		설문수정
	================================================================================================== */
	// 리스트 열고 닫기
	$(document).on('click', '.survey-list-item .survey-title', function(){
		var len = $('.survey-wrap .survey-list-item.on').length;

		if($(this).closest('.survey-list-item').hasClass('on')){
			$('.survey-list-item').removeClass('on');
		}else{
			$('.survey-list-item').removeClass('on');
			$(this).closest('.survey-list-item').addClass('on');
		}
	});


	/* 항목 선택 */
	$(document).on('click', '.survey-item .inner', function(){
		if(!$(this).closest('.survey-item').hasClass('editing')){
			$('.survey-item').removeClass('active').removeClass('editing');
			$('.survey-item').removeClass('editing').find('.editArea').remove();
			$(this).closest('.survey-item').addClass('active');
		}
	});

	/* 위아래 이동 버튼 */
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

	/* 항목 추가 */
	$(document).on('click', '.survey-item .btn-add-del .btn-add', function(){
		
	});

	/* 항목삭제 */
	$(document).on('click', '.survey-item .btn-add-del .btn-del', function(){
		$(this).closest('.survey-item').remove();
		numbering();//리스트 넘버링
	});

	/* 편집 */
	$(document).on('click', '.btn-modify', function(){
		var sItem = $(this).closest('.survey-item');
		var title = $(sItem).find('.question .text').text();
		$(sItem).addClass('editing').find('.question').prepend('<input type="text" class="editArea" placeholder="내용을 입력해주세요." value="' + title + '">');
		if(title == '설문 문항'){
			$(sItem).addClass('editing').find('.question .editArea').val('');
		}
		$(sItem).append('<div class="btn-area editArea"><button type="button" class="btn-text btn-cancel">취소</button><button type="button" class="btn-text bdColor fColor btn-save">저장</button></div>');

		$(sItem).find('.item .field').prop('disabled', true);

		// type1
		if($(sItem).hasClass('type1')){
			$(sItem).find('.item-list .item').each(function(){
				var text = $(this).find('label').text();
				$(this).append('<div class="editArea textarea"><input type="text" placeholder="내용을 입력해주세요." value="' + text + '"></div');
				if(text == '설문 문항 답변'){
					$(this).find('.editArea input[type=text]').val('');
				}
			});
		}

		// type2
		if($(sItem).hasClass('type2')){
			$(sItem).find('.item-list .item').each(function(){
				var text = $(this).find('label').text();
				$(this).append('<span class="editArea left-box"><input type="text" value="' + text + '"></span>');
			});
		}

		// type3
		if($(sItem).hasClass('type3')){
			$(sItem).find('.board-write2 td.edit').each(function(){
				var text = $(this).find('.text').text();
				$(this).append('<input type="text" class="editArea" value="' + text + '">');
			});
		}

		// image
		if($(sItem).hasClass('image')){
			$(sItem).find('.item-list .item').each(function(){
				var name = $(this).find('.name').text();
				$(this).append('<div class="editArea modify-area"><input type="text" value="' + name + '"><div class="input-file"><em class="text">이미지 올리기</em><input type="file" class="styled1"></div></div>');
			});
		}

		textWid()//텍스트 옆 텍스트필드 크기조정
	});

	/* 작성취소 */
	$(document).on('click', '.btn-cancel', function(){
		var sItem = $(this).closest('.survey-item')
		$(sItem).removeClass('editing').find('.editArea').remove();
		textWid()//텍스트 옆 텍스트필드 크기조정
		$(sItem).find('.item .field').prop('disabled', false);
	});
	/* 저장 */
	$(document).on('click', '.btn-save', function(){
		var sItem = $(this).closest('.survey-item');
		var title = $(this).closest('.survey-item').find('.question .editArea').val();

		$(this).closest('.survey-item').find('.question .text').text(title);
		if(title == ''){
			$(this).closest('.survey-item').find('.question .text').text('설문 문항');
		}

		// type1
		if($(sItem).hasClass('type1')){
			$(this).closest('.survey-item').find('.item-list .item').each(function(){
				var text = $(this).find('.editArea input[type=text]').val();
				$(this).find('label').text(text);
				if(text == ''){
					$(this).find('label').text('설문 문항 답변');
				}
			});
		}

		// type2
		if($(sItem).hasClass('type2')){
			$(this).closest('.survey-item').find('.item-list .item').each(function(){
				var text = $(this).find('.editArea input[type=text]').val();
				$(this).find('label').text(text);
				if(text == ''){
					$(this).find('label').text('설문 문항 답변');
				}
			});
		}

		// type3
		if($(sItem).hasClass('type3')){
			$(sItem).find('.board-write2 td.edit').each(function(){
				var text = $(this).find('input[type=text]').val();
				$(this).find('.text').text(text);
			});
		}

		// image
		if($(sItem).hasClass('image')){
			$(this).closest('.survey-item').find('.item-list .item').each(function(){
				var name = $(this).find('.modify-area input[type=text]').val();
				console.log(name);
				$(this).find('label .name').text(name);
			});
		}

		$(this).closest('.survey-item').removeClass('editing').find('.editArea').remove();
		$(sItem).find('.item .field').prop('disabled', false);
		textWid()//텍스트 옆 텍스트필드 크기조정
	});
	/* ================================================================================================ */





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

	textWid()//텍스트 옆 텍스트필드 크기조정
});


/* 리스트 넘버링 */
function numbering(){
	$('.survey-item').each(function(){
		var numIdx = $(this).index() + 1;
		$(this).find('.question-area .number .num').text(numIdx);
	});
}



/* 텍스트 옆 텍스트필드 크기조정*/
function textWid(){
	$('.survey-list-item .survey-list .survey-item .item-list.max label').css({'width':'auto'});
	$('.survey-list-item .survey-list .survey-item .item-list.max').each(function(){
		var labelW = $(this).find('label').outerWidth();
		var labelArray = $(this).find('label').map(function(){
			return $(this).outerWidth();
		});
		var moreW = Math.max.apply(Math , labelArray);
		$(this).find('label').css({'width':moreW});
	});
	$('.survey-list-item .survey-list .survey-item .item-list .item .field-box').each(function(){
		$(this).closest('.item').addClass('textfield');

		var itemW = $(this).closest('.item').outerWidth();
		var laW = $(this).prev('label').outerWidth();
		var chRaW = $(this).closest('.item').find('input.styled1').outerWidth();
		var inW = itemW - (laW+ chRaW + 34);
		$(this).css({'width':inW});
	});
}
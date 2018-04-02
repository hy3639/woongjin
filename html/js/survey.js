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
	/* 폼요소 */
	/* 설문테이블 안 라디오 */
	surForm();

	/* 설문텍스트 영역 열고닫기 버튼생성 */
	$('.survey-list-item .survey-title').prepend('<div class="btn-list-tog"></div>')
	$('.btn-list-tog').css({
		'position':'absolute',
		'left':'0',
		'right':'0',
		'top':'0',
		'bottom':'0',
	});

	// 리스트 열고 닫기
	$(document).on('click', '.survey-list-item .survey-title .btn-list-tog', function(){
		if($(this).closest('.survey-list-item').hasClass('on')){
			$('.survey-list-item').removeClass('on');
		}else{
			$('.survey-list-item').removeClass('on');
			$(this).closest('.survey-list-item').addClass('on');
		}
	});

	/* 설문 그룹 타이틀 수정 */
	$(document).on('click', '.survey-title .btn-modify', function(){

	});

	/* 설문 문항 그룹 삭제 */
	$(document).on('click', '.btn-all-del', function(){
		$(this).closest('.survey-list-item').remove();
		setTimeout(function(){
			//$('.survey-list-item:first-child .survey-title .btn-list-tog').trigger('click');
			$('.survey-list-item:first-child').addClass('on');
		}, 100);
	});


	/* 항목 선택 */
	$(document).on('click', '.survey-modify .survey-wrap .survey-item .inner', function(){
		if(!$(this).closest('.survey-item').hasClass('editing')){
			$('.survey-item').removeClass('active').removeClass('editing');
			$('.survey-item').removeClass('editing').find('.editArea').remove();
			$(this).closest('.survey-item').addClass('active');
		}

		if(!$(this).closest('.survey-item').find('.item-list').hasClass('column')){
			if(!$('.set-item.item05').hasClass('on')){
				var itemIen = $(this).closest('.survey-item').find('.item-list .item').length;
				$(this).closest('.survey-item').find('.item-list').attr('data', itemIen);
			}
		}
		$('.item-list .item .field').removeAttr('disabled');

		//텍스트형
		if($(this).closest('.survey-item').hasClass('textType')){
			$('.modify-box .set-list .set-item').hide();
			$('.set-item.item03').show();
		}else if($(this).closest('.survey-item').hasClass('rankType')){//순위형
			$('.modify-box .set-list .set-item').hide();
			$('.set-item.item03, .set-item.item01').show();
		}else{
			$('.modify-box .set-list .set-item').show();
		}

		// 답변갯수
		if($(this).find('.board-write2').length > 0){
			var len = $(this).find('.board-write2 tbody tr').length;
		}else{
			var len = $(this).find('.item').length;
		}
		$('.set-item.item01 input[type=text]').val(len);

		// 답변타입
		var rdoLen = $(this).find('input[type=radio]').length;
		$('.set-item.item02 .radioWrap').removeClass('checked').find('input[type=radio]').prop('checked', false);
		if(rdoLen > 0){
			$('.set-item.item02 .ra01 .radioWrap').addClass('checked').find('input[type=radio]').prop('checked', true);
		}else{
			$('.set-item.item02 .ra02 .radioWrap').addClass('checked').find('input[type=radio]').prop('checked', true);
		}

		// 필수답변여부
		$('.set-item.item03 .radioWrap').removeClass('checked').find('input[type=radio]').prop('checked', false);
		if($(this).find('.required').length == 0){
			$('.set-item.item03 .ra02 .radioWrap').addClass('checked').find('input[type=radio]').prop('checked', true);
		}else{
			$('.set-item.item03 .ra01 .radioWrap').addClass('checked').find('input[type=radio]').prop('checked', true);
		}

		// 문항표시방법
		$('.set-item.item04 .radioWrap').removeClass('checked').find('input[type=radio]').prop('checked', false);
		if($(this).find('.item-list').hasClass('column')){
			var data = $(this).find('.item-list.column').attr('data');
			$('.set-item.item05 input[type=text]').val(data);

			$('.set-item.item04 p .radioWrap').removeClass('checked').find('input[type=radio]').prop('checked', false);
			$('.set-item.item04 .ra03 .radioWrap').addClass('checked').find('input[type=radio]').prop('checked', true);
			$('.set-item.item05').show().addClass('on');
		}else if($(this).find('.item-list').hasClass('inline')){
			$('.set-item.item04 p .radioWrap').removeClass('checked').find('input[type=radio]').prop('checked', false);
			$('.set-item.item04 .ra02 .radioWrap').addClass('checked').find('input[type=radio]').prop('checked', true);
			$('.set-item.item05').hide().removeClass('on');
		}else{
			$('.set-item.item04 p .radioWrap').removeClass('checked').find('input[type=radio]').prop('checked', false);
			$('.set-item.item04 .ra01 .radioWrap').addClass('checked').find('input[type=radio]').prop('checked', true);
			$('.set-item.item05').hide().removeClass('on');
		}
	});

	$('.survey-item .item-list br').each(function(){
		var idx = $(this).index();
		$(this).closest('.item-list.column').attr('data', idx);
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
		var clon = $('.preview-item:first-child .survey-item:first-child').clone();
		$(this).closest('.survey-item').before(clon);
		$('.survey-item.active').removeClass('active').prev('.survey-item').addClass('active');
		$('.survey-item.active').find('.question .text').text('설문 문항');
		$('.survey-item.active').find('.item-list').removeClass('inline').find('.item .text').text('설문 문항 답변');
		$('.survey-item.active .item-list .item:last-child').remove();
		$('.set-item.item05').hide().removeClass('on');
		numbering();// 리스트 넘버링
		surForm();// 폼요소
		rdoChkState();// 체크박스/라디오
	});
	$(document).on('click', '.btn-addlist', function(){
		var clon = $('.preview-item:first-child .survey-item:first-child').clone();
		$(this).closest('.survey-list-item').find('.survey-list').append(clon);
		$('.survey-item.active').removeClass('active');
		$('.survey-item:last-child').addClass('active').find('.item-list').attr('data', '4');
		$('.survey-item.active .item-list .item:last-child').remove();
		$('.survey-item.active').find('.question .text').text('설문 문항');
		$('.survey-item.active').find('.item-list').removeClass('inline').find('.item .text').text('설문 문항 답변');
		$('.set-item.item05').hide().removeClass('on');

		var sBtm = $(document).height();
		$('html, body').animate({scrollTop:sBtm});

		numbering();// 리스트 넘버링
		surForm();// 폼요소
		rdoChkState();// 체크박스/라디오
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
				var text = $(this).find('label .text').text();
				$(this).append('<div class="editArea textarea"><input type="text" placeholder="내용을 입력해주세요." value="' + text + '"></div');
				if(text == '설문 문항 답변'){
					$(this).find('.editArea input[type=text]').val('');
				}
			});
		}

		// type2
		if($(sItem).hasClass('type2')){
			$(sItem).find('.item-list .item').each(function(){
				var text = $(this).find('label .text').text();
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

	$(document).mouseup(function(e){
		var layer = $('.survey-list');
		if(!layer.is(e.target) && layer.has(e.target).length === 0){
			$('.survey-item .btn-cancel').trigger('click');
		}
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
				$(this).find('label .text').text(text);
				if(text == ''){
					$(this).find('label .text').text('설문 문항 답변');
				}
			});
		}

		// type2
		if($(sItem).hasClass('type2')){
			$(this).closest('.survey-item').find('.item-list .item').each(function(){
				var text = $(this).find('.editArea input[type=text]').val();
				$(this).find('label .text').text(text);
				if(text == ''){
					$(this).find('label .text').text('설문 문항 답변');
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
				$(this).find('label .name').text(name);
			});
		}

		$(this).closest('.survey-item').removeClass('editing').find('.editArea').remove();
		$(sItem).find('.item .field').prop('disabled', false);
		textWid()//텍스트 옆 텍스트필드 크기조정
	});
	/* ================================================================================================ */
	/* 레이어타입1 */
	//레이어 열기
	$(document).on('click', '.btn-layer', function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on').next('.layer-type1').fadeOut(200);
		}else{
			$(this).addClass('on').next('.layer-type1').fadeIn(300);
		}
	});
	$(document).on('click', '.layer-type1 .btn-close', function(){
		$(this).closest('.layer-type1').fadeOut(200);
		$('.btn-layer').removeClass('on')
	});

	/*
	$(document).mouseup(function (e){
		var layer = $('.layer-type1');
		if(!layer.is(e.target) && layer.has(e.target).length === 0){
			layer.fadeOut(200);
			$('.btn-layer').removeClass('on')
		}
	});
	*/

	/* 설문그룹수정 */
	$(document).on('click', '.survey-title .btn-layer', function(){
		var surTit = $(this).closest('.survey-title');
		var title = $(surTit).find('.title .tit').html().replace(/<br>/g, '\n');
		var text = $(surTit).find('.text').html().replace(/<br>/g, '\n');
		$(surTit).find('.groupTitle').val(title);
		$(surTit).find('.groupText').val(text);
		if(title == '설문 그룹명') $(surTit).find('.groupTitle').val('');
		if(text == '설문 그룹설명') $(surTit).find('.groupText').val('');
	});
	$(document).on('click', '.modify-layer .btn-save', function(){
		var title = $(this).closest('.modify-layer').find('.groupTitle').val().replace(/\n/g, '<br>');
		var text = $(this).closest('.modify-layer').find('.groupText').val().replace(/\n/g, '<br>');
		$(this).closest('.survey-title').find('.title .tit').html(title);
		$(this).closest('.survey-title').find('.text').html(text);
		$('.modify-layer').hide();
		$('.btn-layer').removeClass('on')
	});

	/* 오른쪽 수정박스 영역 */
	$('.modify-wrap .btn-layer').click(function(){
		if($(this).hasClass('on')){
			$(this).closest('.modify-wrap').css({'overflow-y':'auto'});
		}else{
			$(this).closest('.modify-wrap').css({'overflow-y':'inherit'});
		}
	});

	$('.menu-item.on').each(function(){
		$(this).find('.list').show();
	});
	$('.menu-item .menu-title').click(function(){
		var item = $(this).closest('.menu-item');
		if(!$(item).hasClass('on')){
			$('.menu-item').removeClass('on').find('.menu-title').removeClass('fColor').find('.icon').removeClass('bgColor');
			$('.menu-item').find('.list').slideUp(100);
			$(item).addClass('on').find('.menu-title').addClass('fColor').find('.icon').addClass('bgColor');
			$(item).find('.list').slideDown(200);
		}
	});
	$('.menu-item .list .item').mouseenter(function(){
		var boxIdx = $(this).closest('.menu-item').index();
		var idx = $(this).index();
		$('.menu-item .list .item').removeClass('on');
		$(this).addClass('on');
		$('.preview-item').hide().eq(boxIdx).show().find('.survey-item').hide().eq(idx).show();
		textWid()//텍스트 옆 텍스트필드 크기조정
	});

	/* 설문문항타입수정 */
	/*
	$('.type-layer .menu-item .item').click(function(){
		var idx = $(this).index();
		var boxIdx = $(this).closest('.menu-item').index();
		var addItem = $('.preview-item').eq(boxIdx).find('.survey-item').eq(idx).clone();
		$('.survey-wrap .survey-item.active').before(addItem);

		var title = $('.survey-wrap .survey-item.active .question-area').html();
		var cls = $('.survey-wrap .survey-item.active').attr('class');
		$('.survey-wrap .survey-item.active').prev('.survey-item').find('.question-area').html(title);

		var surItem = $('.survey-wrap .survey-item.active');
		var prevItem = $('.survey-wrap .survey-item.active').prev('.survey-item');

		var cls = $(surItem).find('.item-list').attr('class');
		$(prevItem).find('.item-list').attr('class', cls)
		if($(surItem).hasClass('type1')){
			if($(prevItem).hasClass('type1')){
				var list = $(surItem).find('.item-list').html();
				$(prevItem).find('.item-list').html(list);
			}
			if($(prevItem).hasClass('image')){
				$(surItem).find('.item-list .item label .text').each(function(i){
					var text = $(this).text();
					$(prevItem).find('.item-list').find('.item label .name').eq(i).text(text);
				});
			}
		}
		/*
		var surItem = $('.survey-wrap .survey-item.active').prev('.survey-item');
		if($(surItem).hasClass('type1')){
			var list = $('.survey-wrap .survey-item.active .item-list').html();
			var cls = $('.survey-wrap .survey-item.active .item-list').attr('class');
			$(surItem).find('.item-list').attr('class', cls).html(list);
		}
		*/
	//});


	// 답변갯수
	$('.set-item.item01 .plus-minus .btn').click(function(){
		var text = $(this).closest('.plus-minus').find('input[type=text]');
		var nember = $(text).val();
		if($(this).hasClass('minus')){
			if(nember > 1){
				$(text).val(nember - 1);
				$('.survey-item.active .item-list .item:last-child').remove();

				$('.survey-item.active .board-write2').each(function(){
					$(this).find('table tbody tr:last-child').remove();
				});
			}
		}else{
			$(text).val((nember * 1) + 1);
			var item = $('.survey-item.active .item-list .item:last-child').html();
			$('.survey-item.active .item-list').append('<li class="item">' + item + '</li>');
			if($('.survey-item.active').hasClass('image')){
				$('.survey-item.active .item-list .item:last-child label img').attr('src', '../images2.0/img/no_image02.jpg');
				$('.survey-item.active .item-list .item:last-child label .name').text('설문 문항 답변');
			}else{
				$('.survey-item.active .item-list .item:last-child label .text').text('설문 문항 답변');
			}
			$('.survey-item.active .board-write2').each(function(){
				var tr = $(this).find('tbody tr:last-child').clone();
				$(this).find('table tbody').append(tr);
				$(this).find('table tbody tr:last-child td:first-child .text').text('설문 문항 답변');
			});
		}

		textWid()//텍스트 옆 텍스트필드 크기조정
		surForm();// 폼요소
		rdoChkState();// 체크박스/라디오
	});
	// 답변타입
	$('.set-item.item02 p.ra01 input[type=radio]').change(function(){
		if(this.checked){
			$('.survey-item.active input[type=checkbox]').attr('type', 'radio')
				.closest('.checkWrap').addClass('radioWrap').removeClass('checkWrap');
		}
	});
	$('.set-item.item02 p.ra02 input[type=radio]').change(function(){
		if(this.checked){
			$('.survey-item.active input[type=radio]').attr('type', 'checkbox')
				.closest('.radioWrap').addClass('checkWrap').removeClass('radioWrap');
		}
	});
	// 필수답변여부
	$('.set-item.item03 p.ra01 input[type=radio]').change(function(){
		if(this.checked){
			$('.survey-item.active .question-area .number').append('<span class="required">*</span>');
		}
	});
	$('.set-item.item03 p.ra02 input[type=radio]').change(function(){
		if(this.checked){
			$('.survey-item.active .question-area .required').remove();
		}
	});
	// 문항표시방법
	$('.set-item.item04 p.ra01 input[type=radio]').change(function(){
		if(this.checked){
			$('.set-item.item05').hide().removeClass('on');
			$('.survey-item.active .item-list').removeClass('inline').removeClass('column');
		}
	});
	$('.set-item.item04 p.ra02 input[type=radio]').change(function(){
		if(this.checked){
			$('.set-item.item05').hide().removeClass('on');
			$('.survey-item.active .item-list').removeClass('column').addClass('inline').find('br').remove();
		}
	});
	$('.set-item.item04 p.ra03 input[type=radio]').change(function(){
		if(this.checked){
			$('.set-item.item05').show().addClass('on');
			$('.survey-item.active .item-list').removeClass('inline').addClass('column');
			var len = $('.survey-item.active .item-list').attr('data');
			$('.set-item.item05 input[type=text]').val(len);
		}
	});
	$('.set-item.item05 .plus-minus .btn').click(function(){
		var text = $(this).closest('.plus-minus').find('input[type=text]');
		var nember = $(text).val();
		var len = $('.survey-item.active .item-list.column .item').length;
		if($(this).hasClass('minus')){
			if(nember > 1){
				if(nember > '1'){
					$(text).val(nember - 1);
					$('.survey-item.active .item-list.column').find('br').remove();
					$('.survey-item.active .item-list.column .item:nth-child(' + (nember - 1) + 'n)').after('<br>');
					$('.survey-item.active .item-list.column').attr('data', (nember - 1));
				}
			}
		}else{
			if(nember < len){
				$(text).val((nember * 1) + 1);
				$('.survey-item.active .item-list.column').find('br').remove();
				$('.survey-item.active .item-list.column .item:nth-child(' + (nember * 1 + 1) + 'n)').after('<br>');
				$('.survey-item.active .item-list.column').attr('data', (nember * 1 + 1));
			}
		}
		textWid()//텍스트 옆 텍스트필드 크기조정
	});

	/* 설문그룹추가 */
	$('.btn-group').click(function(){
		var group = $('.group-add-area').html();
		$('.survey-wrap').append(group);
		$('.survey-list-item').removeClass('on');
		$('.survey-list-item:last-child').addClass('on');
	});

	reColumn();

	$(window).resize();
});


$(window).scroll(function(){
	/* 오른쪽 고정영역 스크롤시 위치 */
	$('.modify-wrap').each(function(){
		var winT = $(window).scrollTop();
		var modiT = $('.survey-modify').offset().top;
		var headH = $('.header').outerHeight();
		if(winT >= modiT - headH){
			$('.modify-wrap').css({'top':winT - 90});
		}else{
			$('.modify-wrap').css({'top':'0'});
		}
	});
});


$(window).resize(function(){
	/* 오른쪽 고정영역 해상도에 따른 스크롤 생성 */
	var winH = $(window).height();
	var wrapT = $('.content').offset().top;
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
	$('.survey-item .item-list.max label').css({'width':'auto'});
	$('.survey-item .item-list.max').each(function(){
		var labelW = $(this).find('label').outerWidth();
		var labelArray = $(this).find('label').map(function(){
			return $(this).outerWidth();
		});
		var moreW = Math.max.apply(Math , labelArray);
		$(this).find('label').css({'width':moreW});
	});
	$('.survey-item .item-list .item .field-box').each(function(){
		$(this).closest('.item').addClass('textfield');

		var itemW = $(this).closest('.item').outerWidth();
		var laW = $(this).prev('label').outerWidth();
		var chRaW = $(this).closest('.item').find('input.styled1').outerWidth();
		var inW = itemW - (laW+ chRaW + 34);
		$(this).css({'width':inW});
	});
}


/* 폼 */
function surForm(){
	// 라디오
	$('.survey-wrap input[type=radio]').each(function(){
		var box = $(this).closest('.survey-list-item').index();
		var idx = $(this).closest('.survey-item').index();
		var item = $(this).closest('.item').index();
		$(this).attr('name', 'Item' + box + idx).attr('id', 'Item' + box + idx + item)
			.closest('.radioWrap').next('label').attr('for', 'Item' + box + idx + item);
	});
	//체크
	$('.survey-wrap input[type=checkbox]').each(function(){
		var box = $(this).closest('.survey-list-item').index();
		var idx = $(this).closest('.survey-item').index();
		var item = $(this).closest('.item').index();
		$(this).attr('id', 'ItemCh' + box + idx + item)
			.closest('.checkWrap').next('label').attr('for', 'ItemCh' + box + idx + item);
	});
	//설문테이블 안 라디오
	$('.survey-wrap .board-write2 tr').each(function(){
		var box = $(this).closest('.survey-list-item').index() + 1;
		var idx = $(this).closest('.survey-item').index();
		var tr = $(this).index();
		$(this).find('input[type=radio]').attr('name', 'Radio' + box + idx + tr).removeAttr('id');
		$(this).find('.ox input[type=radio]').attr('name', 'RadioOx' + box + idx +tr).removeAttr('id');
		$('.radioWrap.checked input[type=radio]').prop('checked', true);
	});
}


/* 컬럼수 */
function reColumn(){
	$('.item-list').each(function(){
		if(!$(this).hasClass('column')){
			var len = $(this).find('.item').length;
			$(this).attr('data', len);
		}
	});
}

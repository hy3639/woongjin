$(window).load(function(){
	/* 오른쪽 고정영역 */
	// 버튼 오버
	$('.btn-group').mouseenter(function(){
		$(this).addClass('bgColor').addClass('bdColor').find('.text').removeClass('fColor');
	}).mouseleave(function(){
		$(this).removeClass('bgColor').removeClass('bdColor').find('.text').addClass('fColor');
	});


	/* 텍스트 옆 텍스트필드 크기조정*/
	$('.survey-list-item .survey-list .survey-item .item-list.max').each(function(){
		var labelW = $(this).find('label').outerWidth();
		var labelArray = $(this).find('label').map(function(){
			return $(this).outerWidth() +2;
		});
		var moreW = Math.max.apply(Math , labelArray);
		$(this).find('label').css({'width':moreW});
	});
	$('.survey-list-item .survey-list .survey-item .item-list .item .field').each(function(){
		$(this).closest('.item').addClass('textfield');

		var itemW = $(this).closest('.item').outerWidth();
		var laW = $(this).closest('.item').find('label').outerWidth();
		var chRaW = $(this).closest('.item').find('input.styled1').outerWidth();
		var inW = itemW - (laW+ chRaW +34);
		$(this).css({'width':inW});
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
});
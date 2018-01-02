$(document).ready(function(){
	resizeMid();

	// 탭 (오버)
	$('.tab-wrap-over').each(function(){
		$(this).find('.tab-list .item').mouseenter(function(){
			$(this).closest('.tab-list').find('.item').removeClass('on');
			$(this).addClass('on');
			var idx = $(this).index();
			$(this).closest('.tab-wrap-over').find('.tab-cont').removeClass('on').eq(idx).addClass('on');
		});
	});

	// 탭 (클릭)
	$('.tab-wrap-click').each(function(){
		$(this).find('.tab-list .item').click(function(){
			$(this).closest('.tab-list').find('.item').removeClass('on');
			$(this).addClass('on');
			var idx = $(this).index();
			$(this).closest('.tab-wrap-click').find('.tab-cont').removeClass('on').eq(idx).addClass('on');
		});
	});
});

$(window).load(function(){
	resizeMid();
});

$(window).resize(function(){
	resizeMid();
});

// 화면 리사이징
function resizeMid(){
	var winW = $(window).width();

	// width 1100 이상
	if(winW > 1100){
		$('.wrapper').attr('class', 'wrapper');
	}

	// width 1100 이하
	if(winW < 1100){
		$('.wrapper').attr('class', 'wrapper win1100');
	}

	// 모바일 전용
	if(winW < 800){
		$('.wrapper').attr('class', 'wrapper mobile');
	}
}
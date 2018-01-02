$(document).ready(function(){
	//resizeMid();

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

	/* 체크박스 */
	$('input[type=checkbox].styled1').each(function(){
		$(this).parents('label').addClass('check-radio');
		$(this).wrap('<span class="checkbox">');
		if(this.checked){
			$(this).parents('.checkbox').addClass('checked');
		}
		if(this.disabled){
			$(this).parents('.checkbox').addClass('disabled');
		}
	});
	$('input[type=checkbox].styled1').change(function(){
		if(this.checked){
			$(this).parents('.checkbox').addClass('checked');
		}else{
			$(this).parents('.checkbox').removeClass('checked');
		}
	});

	/* 버튼 */
	// 안읽은 게시물 보기
	$('.btn-catch').click(function(){
		$(this).toggleClass('on');
	});

	// 게시판 레이아웃
	$('.top-menu .menu-list .btn-list .btn').click(function(){
		$(this).closest('.btn-list').find('.btn').removeClass('on');
		$(this).addClass('on');
	});
	$('.top-menu .menu-list .right-menu .btn').click(function(){
		$(this).closest('.right-menu').find('.btn').removeClass('on');
		$(this).addClass('on');
	});

	// gnb 임시 버튼
	$('.btn-gnb').click(function(){
		$('.gnb-utill').show();
		$('.gnb-utill').animate({right:0}, 300);
	});
	$('.gnb-utill .btn-close').click(function(){
		$('.gnb-utill').animate({right:'-100%'}, 300, function(){
			$('.gnb-utill').hide();
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
		$('.wrapper').attr('class', 'wrapper winM');
	}

	// 모바일 전용
	if(winW < 800){
		$('.wrapper').attr('class', 'wrapper mobile');

		// 탭 (모든 탭 클릭으로)
		$('.tab-wrap-over').each(function(){
			$(this).find('.tab-list .item').click(function(){
				$(this).closest('.tab-list').find('.item').removeClass('on');
				$(this).addClass('on');
				var idx = $(this).index();
				$(this).closest('.tab-wrap-over').find('.tab-cont').removeClass('on').eq(idx).addClass('on');
			});
		});
	}
}

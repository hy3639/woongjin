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
		var wid = $(this).outerWidth();
		$(this).wrap('<span class="selectWrap">');
		$(this).closest('.selectWrap').css({'width':wid}).prepend('<span class="selTitle">'+val+'</span>');
		$(this).change(function(){
			var cVal = $(this).val();
			$(this).closest('.selectWrap').find('.selTitle').html(cVal);
		});
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

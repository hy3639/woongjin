$(document).ready(function(){
	resizeMid();
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

	// width 1100 = wid1100
	if(winW <= 1100){
		$('.wrapper').attr('class', 'wrapper win1100');
	}else{
		$('.wrapper').attr('class', 'wrapper');
	}
}
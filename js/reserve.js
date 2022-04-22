$(function(){
	$('.se_tag').click(function(){
		let that=$(this);
		let ul=that.siblings('ul');
		if(ul.css('display')=='none'){
			ul.slideDown(500);
			that.css('transform','rotate(-90deg)');
		}else{
			ul.slideUp(500);
			that.css('transform','rotate(90deg)');
		}
	})
	$('.check').click(function(){
		$(this).find('img').toggleClass('check_none');
	})
})
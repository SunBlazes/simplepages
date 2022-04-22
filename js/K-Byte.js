$(function(){
	$(window).unbind('');
	$(window).scroll(function(){
		let header=$("#header");
		let search_btn=$('#search_btn');
		if($(this).scrollTop()!=0){
			header.css('backgroundColor','rgb(255,255,255)');
			header.find('span').css('color','#383736');
			header.find('.zl').attr({
				src:'./src/imgs/logo.png'
			});
			search_btn.css('border','1px solid #383736');
			search_btn.css('color','#383736');
		}else{
			header.css('backgroundColor','rgba(0,0,0,.1)');
			header.find('span').css('color','white');
			header.find('.zl').attr({
				src:'./src/imgs/logo1.png'
			});
			search_btn.css('border','1px solid white');
			search_btn.css('color','white');
		}
		let height=parseInt($('#main').css('height'));
	});
	$('#display_hint').click(function(){
		$(window).scrollTop($('#main_display').innerHeight()+
				1/2*($('#main_next').innerHeight()-$('#main_next').height()));
	})
})
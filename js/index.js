$(function(){
	window.ii=1;
	$(window).resize(function(){
		$('#container').css({
			backgroundSize:document.body.scrollWidth+"px "
			+document.body.scrollHeight+"px"
		});
		if($(this).innerWidth()<=1000){
			$('#container').css('zoom',0.7);
			$('#header_tags').css('display','none');
		}else{
			$('#container').css('zoom',1);
			$('#header_tags').css('display','block');
		}
		if($('#panel_top')!=null){
			let that=$('#panel_top');
			$('#panel_top').find('img').css('height',that.height());
			$('#panel_bottom').find('img').css('height',that.height());
		}
	});
	function loadImage(){
		setInterval(()=>{
			$('#main').css('backgroundImage',`url(${window.images[window.ii].loca})`);
			console.log('backgroundImage',`url:(${window.images[window.ii].loca})`)
			window.ii=window.ii==1?0:1;
		},5000)
	}
	var timer;
	window.loadImage=loadImage;
	$('#header').hover(function(){
		clearTimeout(timer);
		$(this).find('.zl').attr({
			src:'./src/imgs/logo.png'
		});
		$('#header_supp').find('li').stop(true,true);
		$('#header_supp').stop(true,true).animate({
			height:70
		},500).find('li').eq(0).show(600,function(){
				$(this).animate({
					top:0
				},300)
			}).next().delay(100).show(600,function(){
				$(this).animate({
					top:0
				},300)
			}).next().delay(200).show(600,function(){
				$(this).animate({
					top:0
				},300)
			}).next().delay(300).show(600,function(){
				$(this).animate({
					top:0
				},300)
			})
	},function(){
		clearTimeout(timer);
		if($(window).scrollTop()==0){
			$(this).find('.zl').attr({
				src:'./src/imgs/logo1.png'
			});
		}
		timer=setTimeout(()=>{
			$('#header_supp').find('li').stop(true,true).css({
				top:-45,
				display:'none'
			});
			$('#header_supp').stop(true,true).css({
				height:0,
			});
		},1000);
	});
	// $('#header_supp').hover(function(){
	// 	$(this).stop();
	// 	$(this).find('li').stop();
	// },function(){
	// 	$(this).stop().animate({
	// 		height:0
	// 	},1000);
	// 	$(this).find('li').stop().hide(1000,function(){
	// 		$(this).stop().animate({
	// 			top:-45
	// 		},300);
	// 	})
	// })
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
		if($(this).scrollTop()>=1/16*document.body.scrollHeight){
			$('#panel-main').stop().animate({
				top:10,
				opacity:1
			},400)
		}else{
			$('#panel-main').stop().css('top','5.2%');
			$('#panel-main').stop().css('opacity','0');
		}
		if($(this).scrollTop()>=1/5*document.body.scrollHeight){
			$('#panel_bottom').stop().animate({
				top:10,
				opacity:1
			},400);
		}else{
			$('#panel_bottom').stop().css('top','5.2%');
			$('#panel_bottom').stop().css('opacity','0');
		}
		if($(this).scrollTop()>=0.6*$('#panel_final').offset().top){
			$('#panel_final').stop().animate({
				top:20,
				opacity:1
			},400);
		}else{
			$('#panel_final').stop().css({
				top:'5.2%',
				opacity:0
			});
		}
	});
	$('#search_btn').click(function(){
		window.open("reserve.html")
	});
})
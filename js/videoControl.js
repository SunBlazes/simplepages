$(function(){
	class Player{
		constructor(v,c,p) {
		    this.video=v;
				this.play=p;
				this.close=c;
		}
		static video;
		static close;
		static play;
		minutes=null;
		seconds=null;
		timer=null;
		videoH=null;
		videoT=null;
		clearData(){
			clearTimeout(this.timer);
			this.minutes.text('0');
			this.seconds.text('00');
			this.video.currentTime=0;
			this.video.pause();
			this.play.css('display','block');
		}
		fullScreen(event){
			let $this=$('.video');
			let that=event.data;
			if($this.position().top!=0){
				$this.css({
					top:0,
					height:'100%'
				});
			}else{
				$this.css({
					top:that.videoT,
					height:that.videoH
				});
			}
		}
		init(){
			let that=this;
			$('.start_btn').click(()=>{
				$('.video').css('display','block');
			});
			this.videoH=$('.video').height();
			this.videoT=parseInt($('.video').css('top'));
			this.close.click(()=>{
				$('.video').css('display','none');
				this.clearData();
				$('.video').css({
					top:that.videoT,
					height:that.videoH
				});
			});
			this.play.click(()=>{
				this.video.play();
				this.play.css('display','none');
			});
			$(this.video).dblclick(that,this.fullScreen);
			// this.video.onclick=()=>{
			// 	this.video.pause();
			// 	this.play.css('display','block');
			// }
		}
	}
	window.player=new Player($('video').get(0),
													 $('.close'),
													 $('.play'));
	player.init();
})
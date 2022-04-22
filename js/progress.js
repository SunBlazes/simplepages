$(function(){
	class Progress{
		constructor(pc,m,s,v) {
			this.progress_cling=pc;
			this.minutes=m;
			this.seconds=s;
			this.volume_progress_wrapper=v;
		}
		static progress_cling;
		static minutes;
		static seconds;
		static volume_progress_wrapper;
		curr=null;
		timer=null;
		dura=null;
		setTime(mini,seco){
			let sec=parseInt(seco);
			if(sec<10){
				sec="0"+sec;
			}
			this.minutes.text(parseInt(mini));
			this.seconds.text(sec);
		}
		changeLoca(event){
			console.log(player.video.currentTime)
			if(player.video.currentTime!=0){
				$('.progress_cling').stop().css('width',event.offsetX+"px");
				player.video.currentTime=
					event.offsetX/$('.progress').innerWidth()*player.video.duration;
			}
		}
		changeProgress(le){
			let width=(le/this.dura)*$('.progress').innerWidth();
			this.progress_cling.css('width',parseInt(width)+"px");
		}
		changeVolume(event){
			if(player.video.currentTime!=0){
				$('.volume_progress_wrapper').css('width',event.offsetX+"px");
				player.video.volume=event.offsetX/$('.enlarge').innerWidth();
			}
		}
		changeDisplay(that,video){
			that.timer=setTimeout(()=>{
				player.timer=that.timer;
				that.curr=video.currentTime;
				let mini = that.curr<60?0:60;
				let seco = that.curr-mini;
				that.setTime(mini/60,seco);
				that.changeProgress(that.curr);
				that.changeDisplay(that,video);
			},1);
		}
		init(){
			player.minutes=this.minutes;
			player.seconds=this.seconds;
			let that=this;
			player.video.onplay=function(){
				that.volume_progress_wrapper.css('width',
							player.video.volume*$('.volume_progress').innerWidth()+"px");
				let video=this;
				that.dura=this.duration;
				that.changeDisplay(that,video);
			}
			$('.enlarge').click(this.changeVolume);
			$('video').click(function(){
				if(this.paused){
					this.play();
					player.play.css('display','none');
				}else{
					this.pause();
					player.play.css('display','block');
				}
			})
			$('.enlarge_p').click(this.changeLoca);
			player.video.onended=function(){
				this.play();
			}
		}
	}
	window.progress=new Progress(
	$('.progress_cling'),
	$('.minutes'),
	$('.seconds'),
	$('.volume_progress_wrapper'));
	progress.init();
})
$(function(){
	class Slideshow{
		constructor() {
		}
		static larrow=null;
		rarrow=null;
		sele_tags=null;
		roll=null;
		span=null;
		seClass="unsele";
		timer=null;
		currLeft=0;
		slideWidth=null;
		currIndex=0;
		animated=false;
		rollCh=null;
		init(){
			this.larrow=$('.left-arrow');
			this.rarrow=$('.right-arrow');
			this.sele_tags=$('.sele_tags').find('a');
			this.roll=$('#roll');
			this.rollCh=this.roll.children().length;
			this.span=this.roll.innerWidth()/this.rollCh;
			this.slideWidth=-(this.roll.innerWidth()-this.span);
			this.sele_tags.eq(this.currIndex).toggleClass(this.seClass);
		}
		back(){
			$(this).css('left',0);
		}
		forward(){
			this.roll.css('left',this.slideWidth+"px");
			this.currLeft=this.slideWidth;
		}
		updateSele(that,before){
			that.sele_tags.eq(that.currIndex).toggleClass(that.seClass);
			that.sele_tags.eq(before).removeClass(that.seClass);
		}
		binda(event){
			let that=$(event.target);
			let before=event.data.currIndex;
			let index=that.parent('li').index();
			if(index==before){
				return;
			}
			let flag=before-index<0?-1:1;
			let distance=flag*Math.abs(before-index)*event.data.span;
			event.data.currIndex=index;
			event.data.roll.css('left',event.data.currLeft+distance);
			event.data.currLeft=event.data.currLeft+distance;
			event.data.updateSele(event.data,before);
		}
		move(flag){
			let that=this;
			if(flag==1){
				if(that.currIndex==0){
					that.forward();
					that.roll.stop().animate({
						left:that.currLeft+that.span*flag
					},500);
					that.currLeft=that.slideWidth+that.span;
					that.currIndex=that.rollCh-2;
					that.updateSele(that,0);
				}else{
					that.roll.stop().animate({
						left:that.currLeft+that.span*flag
					},500);
					that.currLeft=that.currLeft+that.span*flag;
					that.currIndex--;
					that.updateSele(that,that.currIndex+1);
				}
				return;
			}
			if(that.currIndex==that.rollCh-2){
				that.roll.stop(true,true).animate({
					left:that.currLeft+that.span*flag
				},500,that.back);
				that.currLeft=0;
				that.currIndex=0;
				that.updateSele(that,that.rollCh-2);
			}else{
				that.roll.stop(true,true).animate({
					left:that.currLeft+that.span*flag
				},500);
				that.currLeft=that.currLeft+that.span*flag;
				that.currIndex++;
				that.updateSele(that,that.currIndex-1);
			}
		}
		left_arrow(event){
			let that=event.data;
			if(!that.roll.is(':animated')){
				clearTimeout(that.timer);
				that.play();
				that.move(1);
			}
		}
		right_arrow(event){
			let that=event.data;
			if(!that.roll.is(':animated')){
				clearTimeout(that.timer);
				that.play();
				that.move(-1);
			}
		}
		bindbtn(){
			this.larrow.click(this,this.left_arrow);
			this.rarrow.click(this,this.right_arrow);
		}
		play(t){
			let that=t || this;
			that.bindbtn();
			that.sele_tags.click(this,that.binda);
			that.timer=setTimeout(()=>{
				that.move(-1);
				that.play();
			},6000)
		}
	}
	window.slide=new Slideshow();
	slide.init();
	slide.play();
})
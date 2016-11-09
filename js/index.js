$(document).ready(function(){
	var audio=$('audio').get(0);
	var play=$('.play');
	var duration=$('.duration');
	var current=$('.current-time');
	var progress=$('.progress');
	var width=progress.width();
	var p_i=$('.pI');
	var vol=$('.volume');
	var v_i=$('.vI');
	var no=$('.no');
	var lists=$('.lists');
	var pre=$('.pre');
	var next=$('.next');
	var n=0;
	var currentIndex=0;
	var bg=$('.bg');
	var dian=$('.dian');
	var pic=$('.pic');
	var musics=[
		{
			name:'沉眠',
			src:'song/沉眠.mp3',
			author:'杨荣/白宇',
			background:'img/c.jpg'
		},
		{
			name:'一起老去',
			src:'song/一起老去.mp3',
			author:'薛凯琪',
			background:'img/y.jpg'
		},
		{
			name:'雪人',
			src:'song/雪人.mp3',
			author:'范晓萱',
			background:'img/f.jpg'
		},
		{
			name:'我的天空',
			src:'song/我的天空.mp3',
			author:'南征北战',
			background:'img/n.jpg'
		},
		{
			name:'红颜旧',
			src:'song/红颜旧.mp3',
			author:'刘涛',
			background:'img/timg.jpg'
		}
		
	];
	//渲染
	function render(){
		$('.lists').empty();
		$.each(musics,function(i,v){
			$('<li><span>'+musics[i].name+'</span><span>'+musics[i].author+"</span><img src='img/wave.gif' alt='' class='wave'/></li>").appendTo($('.lists'))
		})
	}
	//把时间由秒转换为分
	function Time(a){
		var time=Math.floor(a);
		var n=time%60;
		var s=(n<10)?'0'+n:n;
		var m=Math.floor(time/60);
		return m+':'+s;
	}


	//列表，图片转换
	var startPos
	$(".pic").on("touchstart",function(e){
		startPos=e.originalEvent.changedTouches[0].clientX;
	})
	$(".pic").on("touchend",function(e){
		var endPos=e.originalEvent.changedTouches[0].clientX;
		if(endPos-startPos<-50){
			$('.lists').removeClass('active1');
			$('.lists').addClass('active2');
			$('.pic').addClass('active1');
		}
	})
	var startPos1
	$(".lists").on("touchstart",function(e){
		startPos1=e.originalEvent.changedTouches[0].clientX;
	})
	$(".lists").on("touchend",function(e){
		var endPos1=e.originalEvent.changedTouches[0].clientX;
		if(endPos1-startPos1>50){
			$('.lists').removeClass('active2');
			$('.lists').addClass('active1');
			$('.pic').removeClass('active1');
		}
	})
	
	
	//播放和暂停
	play.on('touchend',function(){
		if(audio.paused){
			audio.play();
			play.html('&#xe696;');
		}else{
			audio.pause();
			play.html('&#xe649;');
		}
	});
	
	//点击改变进度
	progress.on("touchend",function(e){
		audio.currentTime=e.clientX/$(this).width()* audio.duration;
	})

	
	//进度拖拽
	p_i.on("touchend",function(e){
		e.stopPropagation();
	})
	p_i.on('touchend',function(e){
		alert(1)
		e.preventDefault();
		var r=p_i.width()/2;
		var start=r-e.offsetX;
		$(document).on('mousemove',function(e){
			var left=e.clientX - progress.position().left + start;
			var c=left/width * audio.duration;
			if(c>=audio.duration||c<=0){
				return;
			}
			audio.currentTime=c;
		})
	});
	$(document).on('touchend',function(){
		$(document).off('touchmove');
	})

	bg.on('touchend',function(){
		vol.css('display','block');
	})
	//点击改变音量
	vol.on('touchend',function(e){
		audio.volume=e.offsetX/vol.width();
		this.removeAttr('data-v')
	});

	
	//静音
	no.on('touchend',function(){
		if($(this).attr('data-v')){
			$(this).removeAttr('data-v')
			audio.volume=this.attr('data-v');	
		}else{
			$(this).attr('data-v',audio.volume);
			audio.volume=0;
		}
		no.html('&#xe61d;')
	});

	
	
	//音量拖拽
	//阻止冒泡事件
	v_i.on("touchend",false)
	v_i.on('touchend',function(e){
		e.preventDefault();
		var r=v_i.width()/2;
		var start=r-e.offsetX;
		$(document).on('mousemove',function(e){
			var m=e.clientX;
			var left=m-vol.position().left+start;
			var v=left/vol.width();
			if(v>1||v<0){
				return;
			}
			v_i.css('left',left)
			audio.volume=v;	
		})
	})
	$(document).on('mouseup',function(){
		$(document).off('mousemove');
	});
	
	//收藏
	var like=$('.like')
	$('.like').on('touchend',function(){
		$('.like').html('&#xe628;')
	})
	//播放列表
	$(".lists").on("touchend","li",function(){
	 	currentIndex=$(this).index();
	 	$('.lists li').removeClass('active')
    	$(".lists li").eq(currentIndex).addClass("active");	
    	audio.src=musics[currentIndex].src;
    	audio.play();
   	});
	pre.on('touchend',function(){
		currentIndex=currentIndex-1;
		if(currentIndex<0){
			currentIndex=musics.length-1;
		}
		$('.lists li').removeClass('active')
		$(".lists li").eq(n).addClass("active");	
		audio.src=musics[currentIndex].src;
		audio.play();
		
		
	})
	next.on('touchend',function(){
		currentIndex=currentIndex+1;
		if(currentIndex>musics.length-1){
			currentIndex=0;
		}
		$('.lists li').removeClass('active')
		$('.lists li').eq(currentIndex).addClass("active");	
		audio.src=musics[currentIndex].src;
		audio.play();
	})
	
	render();
	//事件
	$(audio).on("volumechange",function(){
        //拖拽事件
        v_i.css('left',audio.volume*vol.width()-v_i.width()/2);
        console.log('volumechange')
    })
    $(audio).on("loadstart",function(){
		$('h1').html(musics[currentIndex].name);
		$('h2').html(musics[currentIndex].author);
		$('.wave').css('display','none')
		$('.wave').eq(currentIndex).css('display','block');
		$('.circle4 img').attr({src:musics[currentIndex].background})
        console.log('loadstart');
    })
    $(audio).on("progress",function(){
        console.log('progress') 
    })
    $(audio).on("canplay",function(){
        audio.play();
        console.log('canplay')
        duration.html(Time(audio.duration));
    })
    $(audio).on("play",function(){
        current.html(Time(audio.currentTime));
		console.log(Time(audio.currentTime))
		var left=progress.width() * audio.currentTime / audio.duration - p_i.width() / 2;
		p_i.css('left',left)
        //最終時間
        console.log('play')
    })
    $(audio).on("pause",function(){
        console.log('pause')
    })
    $(audio).on("ended",function(){
        next();
        console.log('ended')
    })
    $(audio).on("timeupdate",function(){
        console.log('timeupdate');
        current.html(Time(audio.currentTime));
		a=audio.currentTime/audio.duration*width-p_i.width()/2;
		p_i.css('left',a);
            
    })
	
})

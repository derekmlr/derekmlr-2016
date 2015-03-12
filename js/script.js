var DMLR = DMLR || {};


/**
 * Parallax
 * =================
 */
DMLR.parallaxScroll = function() {
	this.bg = $("#background");
	this.contents = $("#logo");

	this.init();
}

DMLR.parallaxScroll.prototype = {
	init : function() {
		// something
	},

	scroll : function() {
		// something
	}
}



/**
 * Video background
 * =================
 */
DMLR.backgroundVideo = function() {
	this.bg = $('#background');
	this.video = document.getElementById("background-video");
	this.video_container = $('#video-container');
	this.timer = 10000;
	
	this.init();
}

DMLR.backgroundVideo.prototype = {
	init : function() {
		var that = this;

		this.showVideo();
		setTimeout(function() {
			that.hideVideo();
			that.videoInterval();
		},9500);
	},

	videoInterval : function() {
		var that = this;
		setTimeout(function() {
			that.timer = that.changeTimer(); // Randomize intervals
			that.showVideo();
			setTimeout(function() {
				that.hideVideo();
				that.videoInterval();
			},9500);
		}, this.timer);
	},

	showVideo : function() {
		this.resetVideo();
		this.bg.addClass('show');
		this.video_container.addClass('show');
		this.playVideo();
	},

	hideVideo : function() {
		this.video_container.removeClass('show');
		this.bg.removeClass('show');
	},

	playVideo : function() {
		var that = this;
		that.video.play();
	},

	resetVideo : function() {
		this.video.pause();
		this.video.currentTime = 0;
		this.video.load();
	},

	changeTimer : function() {
		return Math.floor(Math.random()*(20000-10000+1)+10000);
	}
}


/**
 * Overlay
 * =================
 */
DMLR.overlay = function() {
	this.$overlay = $('#overlay');
	this.$content = $('#overlay-content');
	this.$close = '#overlay-close';

	this.trigger = '.overlay';

	this.init();
}

DMLR.overlay.prototype = {
	init : function() {
		var that = this;

		// Overlay is triggered
		$('body').on('click', this.trigger, function(e) {
			e.preventDefault();

			var url = $(this).attr('href');
			that.showOverlay();
			// Next, show spinner...?
			that.loadContent(url);
		});

		// Close requested
		$('#overlay').on('click', '#logo, '+this.$close, function(e) {
			e.preventDefault();
			if (that.$overlay.hasClass('show')) {
				that.hideOverlay();
				that.hideContent();
				setTimeout(function() {
					that.$content.html('&nbsp;');
				},1000);
			}
		});
	},

	showOverlay : function() {
		$('body').addClass('overlay-open');
		this.$overlay.addClass('show');
	},

	hideOverlay : function() {
		$('body').removeClass('overlay-open');
		this.$overlay.removeClass('show');
	},

	showContent : function() {
		this.$content.addClass('show');
	},

	hideContent : function() {
		this.$content.removeClass('show');
	},

	loadContent : function(url) {
		var that = this;
		var url = url + ' #article';
		this.$content.load(url, function() {
			that.showContent();
		});
	},

	unloadContent : function() {
		// Maybe remove content and bring back spinner?
	}
}


/**
 * Retrieve Dribbble shots for work area
 * =================
 */
DMLR.dribbbleShots = function() {
	this.url = 'http://api.dribbble.com/derekmlr/shots';
	this.init();
}

DMLR.dribbbleShots.prototype = {
	init : function() {
		var that = this;
		this.getShots(1,function(){
			setTimeout(function() {
				that.renderShots(that.shots);
			},100);
		});
	},
	getShots : function(page,callback) {
		var that = this;
		if (typeof page != 'undefined') {
			that.url += '?page='+page;
		}
		$.ajax({
			url:that.url,
			type:'GET',
			dataType:'jsonp',
			crossDomain:true,

			success: function(data) {
				that.shots = data.shots;
				callback();
			}
		});
	},
	renderShots: function(data,limit) {
		var limit = limit || 9;
		limit = (limit > data.length) ? data.length : limit;
		for(i=0;i < limit;i++) {
			var html = '<li class="work">'+
			               '<a href="/wepay" class="overlay">'+
			               '<img src="'+data[i].image_url+'" class="thumb">'+
			               '<span class="meta" data-full="'+data[i].image_url+'">'+
			                   '<h2>'+data[i].title+'</h2>'+
			                   jQuery(data[i].description).text()+
			               '</span>'+
			               '</a>'+
			           '</li>';
			
			var item = $(html).appendTo('.other-list');
		}
		$('.other-list .work').each(function(i) {
			var that = this;
			setTimeout(function() {
				$(that).addClass('show');
			},i*100);

			$(this).find('.meta')
				.on('mousemove', function(e){
					var that = this;
					var xPos = ((e.pageX+620) > $(window).width()) ? (e.pageX-620) : e.pageX+20;
					var yPos = ((e.pageY+450) > $(window).height()) ? (e.pageY-470) : e.pageY+20;
					$('#work-preview').addClass('show').css({
					   left:  xPos,
					   top:   yPos,
					   'background-image': 'url('+$(that).attr('data-full')+')'
					});
				}).on('mouseout', function(){
					$('#work-preview').removeClass('show');
				});
		})
	}
}

/**
 * Temporary calls during testing
 * =================
 */
setTimeout(function() {
	var bg_video = new DMLR.backgroundVideo();
},2000);
var shots = new DMLR.dribbbleShots();
var overlay = new DMLR.overlay();
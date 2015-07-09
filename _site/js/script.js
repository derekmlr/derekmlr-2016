var DMLR = DMLR || {};


/**
 * Parallax
 * =================
 */
DMLR.parallaxScroll = function() {
	this.bg = $('#hero-background');
	this.header = $('#header');
	this.contents = $('#content');

	this.init();
}

DMLR.parallaxScroll.prototype = {
	init : function() {
		var that = this;

		// Scrolling trigger
		$(window).scroll(function() {
			that.doParallax();
		});

		// Resize trigger
		$(window).resize(function() {
			that.doParallax();
		});

		// Resize trigger
		$(document).ready(function() {
			that.doParallax();
		});
	},

	doParallax : function() {
		/*
			Runs required functionality for parallax effect
		*/
		if (this.contents.offset().top > $(window).scrollTop()) {
			this.updateValues();
		}
	},

	scrollPos : function(scroll, speed, direction) {
		/*
			Find appropriate value based on direction
		*/
		var direction = (direction == 'up') ? -1 : 1;
		var result = (scroll / speed * direction);
		
		return result;
	},

	updateValues : function() {
		/*
			Updates CSS values of elements
		*/
		var that = this;
		var amount = $(window).scrollTop();

		this.bg.css('top',that.scrollPos(amount, 4,'down'));
		this.header.css('margin-top',that.scrollPos(amount, 2,'down'));
		this.header.css('opacity',(100-amount/6)/100);
	}
}



/**
 * Video background
 * =================
 */
DMLR.backgroundVideo = function() {
	this.bg = $('#hero-background');
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
		},10000);
	},

	videoInterval : function() {
		var that = this;
		setTimeout(function() {
			that.timer = that.changeTimer(); // Randomize intervals
			that.showVideo();
			setTimeout(function() {
				that.hideVideo();
				that.videoInterval();
			},10000);
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
 * Temporary calls during testing
 * =================
 */
$(document).ready(function() {
	var bg_video;
	var overlay;
	var parallaxScroll;
	
	overlay = new DMLR.overlay();
	
	// Background load
	setTimeout(function() {
		bg_video = new DMLR.backgroundVideo();
	},6000);
	
	setTimeout(function() {
		$('body').addClass('loaded');
		parallaxScroll = new DMLR.parallaxScroll();
	},2000);
});
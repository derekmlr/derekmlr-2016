var DMLR = DMLR || {};


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
		var self = this;

		// Overlay is triggered
		$('body').on('click', self.trigger, function(e) {
			e.preventDefault();

			var url = $(this).attr('href');
			self.showOverlay();
			// Next, show spinner...?
			self.loadContent(url);
		});

		// Close requested
		$('#overlay').on('click', '#logo, '+self.$close, function(e) {
			e.preventDefault();
			if (self.$overlay.hasClass('show')) {
				self.hideOverlay();
				self.hideContent();
				setTimeout(function() {
					self.$content.html('&nbsp;');
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
		var self = this;
		var url = url + ' #article';
		this.$content.load(url, function() {
			self.showContent();
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
	var overlay;
	
	overlay = new DMLR.overlay();

	setTimeout(function() {
		$('body').addClass('loaded');
	},1000);
});
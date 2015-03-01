var DMLR = DMLR || {};

// Retrieve Dribbble shots for work area
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
		var limit = limit || 12;
		limit = (limit > data.length) ? data.length : limit;
		for(i=0;i < limit;i++) {
			var html = '<li class="item">'+
			           '<img src="'+data[i].image_teaser_url+'" class="thumb">'+
			           '<span class="meta" data-full="'+data[i].image_url+'">'+
			           '<h2>'+data[i].title+'</h2>'+
			           //jQuery(data[i].description).text()+
			           '</span>'+
			           '</li>';
			
			var item = $(html).appendTo('#work-list');
		}
		$('#work-list .item').each(function(i) {
			var that = this;
			setTimeout(function() {
				$(that).addClass('show');
			},i*100);

			$(this).find('.meta')
				.on('mousemove', function(e){
					var that = this;
					var xPos = ((e.pageX+420) > $(window).width()) ? (e.pageX-420) : e.pageX+20;
					var yPos = ((e.pageY+300) > $(window).height()) ? (e.pageY-320) : e.pageY+20;
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

var shots = new DMLR.dribbbleShots();
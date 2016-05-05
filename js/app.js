var App = function() {

	this.init();
};

App.prototype.init = function() {
	
	this.$ = {};
	this.$.body = $('body');

	this.$.loader = this.$.body.find('.loader');
	this.$.loaded = this.$.body.find('.loader .loaded');

	this.load();

	this.templates = window.templates;



};

App.prototype.load = function() {

	var that = this;

	var img_to_load = [ '/img/explore.jpg', '/img/layer.jpg',  '/img/masterpiece.jpg',  '/img/tesla.jpg',   '/img/louis.jpg'];
	var loaded_images = 0;

	for (var i=0; i<img_to_load.length; i++) {
	    var img = document.createElement('img');
	    img.src = img_to_load[i];
	    img.style.display = 'hidden'; // don't display preloaded images
	    img.onload = function () {
	        loaded_images++;

	        if (loaded_images == img_to_load.length-1) {
	        	var percent = 100*loaded_images/(img_to_load.length-1);
	        	that.$.loaded.width(percent+'%');
	            that.$.loader.fadeOut('slow');
	            that.setRouting();
				that.initProjectEvents();
	        }
	        else {
	        	var percent = 100*loaded_images/(img_to_load.length-1);
	        	that.$.loaded.width(percent+'%');
	        }
	    }
	    document.body.appendChild(img);
	}

}

App.prototype.initPage = function() {
	var view = $('.view');
	if (view.hasClass('project')) {
		this.page = new Project();
	}
	else {
		console.log('no controller');
	}
};

App.prototype.initProjectEvents = function() {
	$(window).on('mousewheel', _.throttle(function(e) {
		console.log('first');
		if ($('.view').hasClass('project')) {
		    if(e.originalEvent.wheelDelta / 120 > 0) {
		    	app.changeProject('previous');
		    } else {
		        app.changeProject('next');
		    }
		}
	}, 1800, {trailing: false}));
};

App.prototype.setRouting = function() {

	this.router = new Navigo(null,false);
	var that = this;

	this.router.on('/contact', function() {
		that.loadView('contact',{});
	},true);

	this.router.on('/project/:id', function(params) {
			that.getParams(params.id).then(function(params){
			that.currentProject = params;
			that.loadView('project',params);
		});
	},true);

	this.router.on('*', function() {
		that.loadView('home',{});
	});

};

App.prototype.loadView = function(view,params) {
	var oldView = $('.view');

	if (oldView.length > 0) {
		this.animateOut(oldView,view,params);
		this.animateIn($('.view:nth-child(2)'),true,oldView);
	}
	else {
		$('#app').html(this.getTemplate(view,params));
		this.animateIn($('.view'),false);
	}
	this.initPage();
};

App.prototype.loadProject = function() {
	
};

App.prototype.getTemplate = function(view,data) {

	return this.templates[view](data);
	
};

App.prototype.getParams = function(id) {
	return $.getJSON('../json/projects.json').then(function(data) {
		data = data[id];
		return data;
	});
};

App.prototype.changeProject = function(direction) {

	if (direction == 'previous') {
		this.router.navigate('project/'+this.currentProject.previousProject);
	}
	else {
		this.router.navigate('project/'+this.currentProject.nextProject);
	}
};

App.prototype.animateIn = function(elem,wait,oldView) {

	var newView = elem;
	if (oldView.hasClass('project')) {
		newView.addClass('from-project');
	}
	newView.addClass('animate-in');
	
	if (wait) {
		setTimeout(function() {
			newView.find('.top, .bottom').fadeIn('slow');
			setTimeout(function() {
				newView.removeClass('animate-in');
			},50);
			setTimeout(function() {
				newView.addClass('view-loaded');
			},900);
		},1200);
	}
	else {
		setTimeout(function() {
			newView.find('.top, .bottom').fadeIn('slow');
			newView.removeClass('animate-in');
		},50);
		setTimeout(function() {
			newView.addClass('view-loaded');
		},900);
	}

	this.router.updatePageLinks();

};

App.prototype.animateOut = function(elem,view,params) {

	var oldView = elem;

	oldView.find('.top, .bottom').fadeOut();
	oldView.find('.content-centered').addClass('scale-out');
	oldView.css('zIndex', '7');
	oldView.after(this.getTemplate(view,params));
	oldView.addClass('fade-out');
	setTimeout(function() {
		oldView.remove();
	},1200);

};
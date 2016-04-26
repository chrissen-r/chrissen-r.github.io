var App = function() {
	this.init();
};

App.prototype.init = function() {
	
	this.$ = {};
	this.$.body = $('body');

	this.templates = window.templates;

	console.log(this.templates);

	this.setRouting();
	this.initProjectEvents();

};

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

	this.router = new Navigo();
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
		this.animateIn($('.view:nth-child(2)'),true);
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

App.prototype.animateIn = function(elem,wait) {

	var newView = elem;
	newView.addClass('animate-in');
	
	if (wait) {
		setTimeout(function() {
			setTimeout(function() {
				newView.removeClass('animate-in');
			},50);
			setTimeout(function() {
				newView.addClass('view-loaded');
			},900);
		},1200);
	}
	else {
		console.log('animate directly');
		setTimeout(function() {
			newView.removeClass('animate-in');
		},50);
		setTimeout(function() {
			newView.addClass('view-loaded');
		},900);
	}
};

App.prototype.animateOut = function(elem,view,params) {
	var oldView = elem;
	oldView.find('.content-centered').addClass('scale-out');
	oldView.css('zIndex', '7');
	oldView.after(this.getTemplate(view,params));
	oldView.addClass('fade-out');
	setTimeout(function() {
		oldView.remove();
	},1200);
};
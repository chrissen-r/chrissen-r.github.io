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
		oldView.find('.content-centered').addClass('scale-out');
		oldView.css('zIndex', '7');
		oldView.after(this.getTemplate(view,params));
		var newView = $('.view:nth-child(2)');
		newView.addClass('animate-in');
		oldView.addClass('fade-out');
		setTimeout(function() {
			newView.removeClass('animate-in').css('zIndex', 'initial');
			oldView.remove();
		},1200);
	}
	else {
		$('#app').html(this.getTemplate(view,params));
		if ($('.view').hasClass('project')) {
			var newView = $('.view');
			newView.addClass('animate-in');
			oldView.addClass('fade-out');
			setTimeout(function() {
				newView.removeClass('animate-in').css('zIndex', 'initial');
			},1200);
		}
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
	console.log(direction);
	if (direction == 'previous') {
		this.router.navigate('project/'+this.currentProject.previousProject);
	}
	else {
		this.router.navigate('project/'+this.currentProject.nextProject);
	}
};

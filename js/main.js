(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.router = require('./partials/router.js');
window.about  = require('./partials/about.js');
window.home   = require('./partials/home.js');
window.project   = require('./partials/project.js');
window.mobile   = require('./partials/mobile.js');

(function() {

	window.loadScripts = function() {
		home.init();
		project.init();
	};

	about.init();
	router.init();
	
})();
},{"./partials/about.js":2,"./partials/home.js":3,"./partials/mobile.js":4,"./partials/project.js":5,"./partials/router.js":6}],2:[function(require,module,exports){
module.exports = (function () {

	'use strict'

	let $about = document.querySelectorAll('.about')[0]
	let $aboutToggler = document.querySelectorAll('.header a.cta')[0]

	let VISIBLE_CLASS = 'about--visible'
	let MORE_TEXT = 'more about me'
	let LESS_TEXT = 'less about me'

	var init = () => {

		_initEvents()

	};

	var _initEvents = () => {

		$aboutToggler.addEventListener('click', _toggleAbout)

	}

	var _toggleAbout = () => {

		if ($about.classList.contains(VISIBLE_CLASS)) {
			$about.classList.remove(VISIBLE_CLASS)
			$aboutToggler.innerHTML = MORE_TEXT
		}
		else {
			$about.classList.add(VISIBLE_CLASS)
			$aboutToggler.innerHTML = LESS_TEXT
		}
		
	}



	return {
		init: init
	};

})();
},{}],3:[function(require,module,exports){
module.exports = (function () {

	'use strict'

	var $home
	var $textFields = {}
	var $slider = {}

	const ANIMATION_DURATION = 1500
	let CURRENT_PROJECT = 1
	let THUMBNAIL_HEIGHT = 0
	let PREV_CLASS = 'teaser__thumbnail--prev'
	let CURRENT_CLASS = 'teaser__thumbnail--current'
	let NEXT_CLASS = 'teaser__thumbnail--next'

	let PROJECT_COUNT
	let projects

	var init = () => {

		$home = document.querySelectorAll('.view-home')[0]

		if ($home != null) {
			CURRENT_PROJECT = 1
			_setGallery()
		}

	}

	var _setGallery = () => {

		projects = content.views.project //get projects
		projects = Object.keys(projects).map((k) => projects[k]) //convert object to array
		
		PROJECT_COUNT = projects.length

		$textFields.title = document.querySelectorAll('.teaser__text h2')[0]
		$textFields.type = document.querySelectorAll('.teaser__project-type')[0]
		$textFields.link = document.querySelectorAll('.teaser__text .cta')[0]

		$slider.container = document.querySelectorAll('.teaser__gallery-container')[0]
		$slider.slides = document.querySelectorAll('.teaser__thumbnail')
		$slider.background = document.querySelectorAll('.teaser__background')[0]
		$slider.countCurrent = document.querySelectorAll('.teaser__count-current')[0]
		$slider.scrollUp = document.querySelectorAll('.scrollbox__up')[0]
		$slider.scrollDown = document.querySelectorAll('.scrollbox__down')[0]

		document.querySelectorAll('.teaser__count-current')[0].innerHTML = CURRENT_PROJECT
		document.querySelectorAll('.teaser__count-total')[0].innerHTML = PROJECT_COUNT

		THUMBNAIL_HEIGHT = _outerHeight($slider.slides[0])

		_changeText();
		_initEvents();
		_initKeyboard();

	}

	var _initEvents = () => {

		$home.addEventListener('mousewheel', _bindMouseWheel)

	}

	var _initKeyboard = () => {

		document.addEventListener('keydown', _bindKeyboard);
	}

	var _bindMouseWheel = (e) => {

		$home.removeEventListener('mousewheel', _bindMouseWheel)

		if (e.wheelDelta < 0)
			_goToProject('next')
		else 
			_goToProject('prev')

		setTimeout(() => _initEvents(), ANIMATION_DURATION)

	}

	var _bindKeyboard = (e) => {

		document.removeEventListener('keydown', _bindKeyboard)

		switch(e.which) {
		    case 38:
		    _goToProject('prev')
		    break

		    case 40:
		    _goToProject('next')
		    break

		    default: return
		}
		e.preventDefault()

		setTimeout(() => _initKeyboard(), ANIMATION_DURATION)
			
	}

	var _goToProject = (way) => {
		
		if (way == 'next' && CURRENT_PROJECT < PROJECT_COUNT)
			_goToNext()
		else if (way == 'prev' && CURRENT_PROJECT > 1)
			_goToPrev()

	}

	var _goToNext = () => {
		var translate = -CURRENT_PROJECT * THUMBNAIL_HEIGHT
		CURRENT_PROJECT = CURRENT_PROJECT + 1
		$slider.container.style.transform = `translateY(${translate}px)`
		_changeText()
	}

	var _goToPrev = () => {
		CURRENT_PROJECT = CURRENT_PROJECT - 1
		var translate = -(CURRENT_PROJECT - 1) * THUMBNAIL_HEIGHT
		$slider.container.style.transform = `translateY(${translate}px)`
		_changeText()
	}

	var _changeText = () => {

		//set classes
		if ($slider.slides[CURRENT_PROJECT - 2] != null) {
			$slider.slides[CURRENT_PROJECT - 2].classList.add(PREV_CLASS)
			$slider.slides[CURRENT_PROJECT - 2].classList.remove(CURRENT_CLASS, NEXT_CLASS)
			$slider.scrollUp.classList.add('scrollbox__up--active')
		}
		else {
			$slider.scrollUp.classList.remove('scrollbox__up--active')
		}

		if ($slider.slides[CURRENT_PROJECT] != null) {
			$slider.slides[CURRENT_PROJECT].classList.add(NEXT_CLASS)
			$slider.slides[CURRENT_PROJECT].classList.remove(CURRENT_CLASS, PREV_CLASS)
			$slider.scrollDown.classList.add('scrollbox__down--active')
		}
		else {
			$slider.scrollDown.classList.remove('scrollbox__down--active')
		}

		$slider.slides[CURRENT_PROJECT - 1].classList.add(CURRENT_CLASS)
		$slider.slides[CURRENT_PROJECT - 1].classList.remove(PREV_CLASS, NEXT_CLASS)

		var content = projects[CURRENT_PROJECT-1]
		$slider.countCurrent.innerHTML = CURRENT_PROJECT
		$slider.background.style.backgroundImage = `url(${content.teaser})`

		//change text
		$textFields.title.innerHTML = content.title
		$textFields.type.innerHTML = content.type
		$textFields.link.setAttribute('href', content.link)
	}

	var _outerHeight = (el) => {
		var height = el.offsetHeight;
		var style = getComputedStyle(el);

		height += parseInt(style.marginTop) + parseInt(style.marginBottom);
		return height;
	}

	return {
		init: init
	}

})();
},{}],4:[function(require,module,exports){
module.exports = (function () {

	'use strict'

	var $project
	var $galleryContainer
	var actualHeight
	var $images

	const ORIGINAL_HEIGHT = 1771
	const ORIGINAL_MARGIN = 437
	const ANIMATION_DURATION = 1200
	let CURRENT_IMG = 1
	let IMG_COUNT
	let IMG_HEIGHT

	var init = () => {

		$project = document.querySelectorAll('.view-project')[0]
		$galleryContainer = document.querySelectorAll('.teaser__gallery-container')[0]

		_setImageMargin();
		_initEvents();

	};

	var _setImageMargin = () => {

		$images = [].slice.call(document.querySelectorAll('.teaser__gallery-container img'))
		IMG_COUNT = $images.length
		$images[0].classList.add('current')
		$images.shift()
		actualHeight = $images[0].offsetHeight

		var newMargin = ORIGINAL_MARGIN * actualHeight / ORIGINAL_HEIGHT;

		IMG_HEIGHT = actualHeight - newMargin

		for (var image of $images) {
			image.style.marginTop = `-${newMargin}px`	
		}
		$images = [].slice.call(document.querySelectorAll('.teaser__gallery-container img'))
	}

	var _initEvents = () => {

		$project.addEventListener('mousewheel', _bindMouseWheel)

	}

	var _bindMouseWheel = (e) => {

		$project.removeEventListener('mousewheel', _bindMouseWheel)

		if (e.wheelDelta < 0)
			_goToImage('next')
		else 
			_goToImage('prev')

		setTimeout(() => _initEvents(), ANIMATION_DURATION)

	}

	var _goToImage = (way) => {
		
		if (way == 'next' && CURRENT_IMG < IMG_COUNT)
			_goToNext()
		else if (way == 'prev' && CURRENT_IMG > 1)
			_goToPrev()


	}

	var _goToNext = () => {
		var translate = -CURRENT_IMG * IMG_HEIGHT
		CURRENT_IMG = CURRENT_IMG + 1
		$galleryContainer.style.transform = `translateY(${translate}px)`
		project.updateLegend(translate)
		_updateCurrent()
	}

	var _goToPrev = () => {
		CURRENT_IMG = CURRENT_IMG - 1
		var translate = -(CURRENT_IMG - 1) * IMG_HEIGHT
		$galleryContainer.style.transform = `translateY(${translate}px)`
		project.updateLegend(translate)
		_updateCurrent()
	}

	var _updateCurrent = () => {

		for (var $image of $images) {
			$image.classList.remove('current')
		}
		$images[CURRENT_IMG - 1].classList.add('current')

	}

	return {
		init: init
	};

})();
},{}],5:[function(require,module,exports){
module.exports = (function () {

	'use strict'
	var $project
	var $gallery = {}
	let MAX_SCROLL = 0
	let POSITION = []

	var init = () => {

		$project = document.querySelectorAll('.view-project')[0]

		if ($project != null) {
			$gallery.galleryContainer = document.querySelectorAll('.teaser__gallery-container')[0]
			$gallery.gallery = document.querySelectorAll('.teaser__gallery')[0]
			$gallery.nextProject = document.querySelectorAll('.next-project')[0]
			$gallery.scrollbox = document.querySelectorAll('.scrollbox')[0]
			$gallery.images = document.querySelectorAll('.teaser__gallery-container img')
			$gallery.legend = document.querySelectorAll('.teaser__legend')[0]
			$gallery.header = document.querySelectorAll('.header')[0]
			$gallery.header.classList.remove('header--hidden')

			if (document.querySelectorAll('.is-mobile')[0] != null)
				mobile.init()

			_initEvents()
			_initVariables()
		}

	}

	var _initEvents = () => {

		if (document.querySelectorAll('.is-mobile')[0] == null)
			$project.addEventListener('mousewheel', _bindMouseWheel)
		window.addEventListener('resize', _initVariables)		

	}

	var _initVariables = () => {


		//init max scroll
		let containerHeight = parseInt(window.getComputedStyle($gallery.galleryContainer, null).getPropertyValue('height'))
		let galleryHeight = parseInt(window.getComputedStyle($gallery.gallery, null).getPropertyValue('height'))

		var offset = $gallery.legend.offsetTop

		MAX_SCROLL = -1 * (containerHeight - galleryHeight)

		POSITION = []

		//init images position
		for (var image of $gallery.images) {
			POSITION.push(image.offsetTop - offset)
		}

	}

	var _bindMouseWheel = (e) => {

		let scrollValue = e.deltaY * -0.4
		let currTransform = window.getComputedStyle($gallery.galleryContainer,null).getPropertyValue('transform')
		let currScroll = _getComputedTranslateY(currTransform);

		let newScrollValue = currScroll + scrollValue
		if (newScrollValue > 0) {
			newScrollValue = 0
			$gallery.header.classList.remove('header--hidden')
		}
		else if (newScrollValue < MAX_SCROLL) {
			newScrollValue = MAX_SCROLL
			$gallery.nextProject.classList.add('next-project--visible');
			$gallery.scrollbox.classList.add('scrollbox--hidden');
		}
		else {
			$gallery.nextProject.classList.remove('next-project--visible');
			$gallery.scrollbox.classList.remove('scrollbox--hidden');
			$gallery.header.classList.add('header--hidden')
		}

		updateLegend(newScrollValue);

		$gallery.galleryContainer.style.transform = `translateY(${newScrollValue}px)`

	}

	var updateLegend = (scrollValue) => {
		
		let index = 0

		POSITION.forEach(function (pos, i) {
			if ((-1*scrollValue) > pos)
				index = i
		})

		let legend = $gallery.images[index].getAttribute('alt')

		$gallery.legend.innerHTML = legend

	}

	var _getComputedTranslateY = (transform) => {

		let mat = transform.match(/^matrix3d\((.+)\)$/)
		if(mat) return parseFloat(mat[1].split(', ')[13])
		mat = transform.match(/^matrix\((.+)\)$/)
		return mat ? parseFloat(mat[1].split(', ')[5]) : 0

	}

	return {
		init: init,
		updateLegend: updateLegend
	}

})();
},{}],6:[function(require,module,exports){
module.exports = (function () {

	'use strict'

	var templates = window["Portfolio"]['templates']
	var $pageContent = document.querySelectorAll('.page-content')[0]
	var currentViewClass
	var couldStateChange = true
	var history = window.history


	var init = function() {

		$pageContent.style.display = 'none'
		var request = new XMLHttpRequest()
		request.open('GET', 'content.json', true)

		request.onload = () => {
		  if (request.status >= 200 && request.status < 400) {
		    window.content = JSON.parse(request.responseText)
			_bindLinks()
			_onStateChange()
		  }
		}

		request.send()

	};

	var _onStateChange = function() {
		var path = window.location.pathname.split('/')
		path.shift()
		_setRouting(path)
	}

	var _bindLinks = function() {
		var $links = document.querySelectorAll('a:not([target])')
		for (var $link of $links) {
			$link.addEventListener('click', _onLinkClick)
		}
    };

	var _setRouting = function(path) {

		var view = path[0];

		if (!view) {
			_updateView('home', false)
		} else if (view == 'project') {
			var projectName = path[1]
			if (!projectName) {
				_updateView('home', false)
			}
			else {
				var data = content.views[view][projectName]
				_updateView('project', data)
			}
		} else {
			_updateView('home', false)
		}

	}

	var _removeCurrView = function(view,params) {

		$pageContent.classList.remove('view-loaded')
		setTimeout(() => {
			$pageContent.classList.remove(currentViewClass)
			_appendNewView(view, params)
		}, 1000)
		
	};

	var _appendNewView = function(view, params) {

		var content = templates[view](params)
		$pageContent.innerHTML = content

		if ($pageContent.classList)
		  $pageContent.classList.add('view-'+view)
		else
		  $pageContent.className += ' ' + 'view-'+view

		setTimeout(() => {
			$pageContent.style.display = 'block'
			setTimeout(function() {
				if ($pageContent.classList)
				  $pageContent.classList.add('view-loaded')
				else
				  $pageContent.className += ' ' + 'view-loaded'
				currentViewClass = 'view-'+view
				window.loadScripts()
				_bindLinks()
			}, 200)
		}, 100)

	};

	var _updateView = function(view, params) {

		if (currentViewClass) {
			_removeCurrView(view,params)
		} else {
			_appendNewView(view, params)
		}
	};

	var _onLinkClick = function(e) {

		e.preventDefault()

		if (couldStateChange) {
			
            var href = e.currentTarget.getAttribute('href')
            var link = href

            var location = window.location.hash != "" ? window.location.href.replace("/" + window.location.hash, "").replace(window.location.hash, "") : window.location.href.split('/')[3];
                location = '/' + location;

            // Push into history new state
            if (link != location) {
                 history.pushState(null, null, link);
                 _onStateChange();
            }
        }

        return false

	}

	return {
		init: init
	};

})();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXNzZXRzL3NjcmlwdHMvbWFpbi5qcyIsImFwcC9hc3NldHMvc2NyaXB0cy9wYXJ0aWFscy9hYm91dC5qcyIsImFwcC9hc3NldHMvc2NyaXB0cy9wYXJ0aWFscy9ob21lLmpzIiwiYXBwL2Fzc2V0cy9zY3JpcHRzL3BhcnRpYWxzL21vYmlsZS5qcyIsImFwcC9hc3NldHMvc2NyaXB0cy9wYXJ0aWFscy9wcm9qZWN0LmpzIiwiYXBwL2Fzc2V0cy9zY3JpcHRzL3BhcnRpYWxzL3JvdXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwid2luZG93LnJvdXRlciA9IHJlcXVpcmUoJy4vcGFydGlhbHMvcm91dGVyLmpzJyk7XG53aW5kb3cuYWJvdXQgID0gcmVxdWlyZSgnLi9wYXJ0aWFscy9hYm91dC5qcycpO1xud2luZG93LmhvbWUgICA9IHJlcXVpcmUoJy4vcGFydGlhbHMvaG9tZS5qcycpO1xud2luZG93LnByb2plY3QgICA9IHJlcXVpcmUoJy4vcGFydGlhbHMvcHJvamVjdC5qcycpO1xud2luZG93Lm1vYmlsZSAgID0gcmVxdWlyZSgnLi9wYXJ0aWFscy9tb2JpbGUuanMnKTtcblxuKGZ1bmN0aW9uKCkge1xuXG5cdHdpbmRvdy5sb2FkU2NyaXB0cyA9IGZ1bmN0aW9uKCkge1xuXHRcdGhvbWUuaW5pdCgpO1xuXHRcdHByb2plY3QuaW5pdCgpO1xuXHR9O1xuXG5cdGFib3V0LmluaXQoKTtcblx0cm91dGVyLmluaXQoKTtcblx0XG59KSgpOyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblxuXHQndXNlIHN0cmljdCdcblxuXHRsZXQgJGFib3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFib3V0JylbMF1cblx0bGV0ICRhYm91dFRvZ2dsZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGVhZGVyIGEuY3RhJylbMF1cblxuXHRsZXQgVklTSUJMRV9DTEFTUyA9ICdhYm91dC0tdmlzaWJsZSdcblx0bGV0IE1PUkVfVEVYVCA9ICdtb3JlIGFib3V0IG1lJ1xuXHRsZXQgTEVTU19URVhUID0gJ2xlc3MgYWJvdXQgbWUnXG5cblx0dmFyIGluaXQgPSAoKSA9PiB7XG5cblx0XHRfaW5pdEV2ZW50cygpXG5cblx0fTtcblxuXHR2YXIgX2luaXRFdmVudHMgPSAoKSA9PiB7XG5cblx0XHQkYWJvdXRUb2dnbGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX3RvZ2dsZUFib3V0KVxuXG5cdH1cblxuXHR2YXIgX3RvZ2dsZUFib3V0ID0gKCkgPT4ge1xuXG5cdFx0aWYgKCRhYm91dC5jbGFzc0xpc3QuY29udGFpbnMoVklTSUJMRV9DTEFTUykpIHtcblx0XHRcdCRhYm91dC5jbGFzc0xpc3QucmVtb3ZlKFZJU0lCTEVfQ0xBU1MpXG5cdFx0XHQkYWJvdXRUb2dnbGVyLmlubmVySFRNTCA9IE1PUkVfVEVYVFxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdCRhYm91dC5jbGFzc0xpc3QuYWRkKFZJU0lCTEVfQ0xBU1MpXG5cdFx0XHQkYWJvdXRUb2dnbGVyLmlubmVySFRNTCA9IExFU1NfVEVYVFxuXHRcdH1cblx0XHRcblx0fVxuXG5cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcblxufSkoKTsiLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cblx0J3VzZSBzdHJpY3QnXG5cblx0dmFyICRob21lXG5cdHZhciAkdGV4dEZpZWxkcyA9IHt9XG5cdHZhciAkc2xpZGVyID0ge31cblxuXHRjb25zdCBBTklNQVRJT05fRFVSQVRJT04gPSAxNTAwXG5cdGxldCBDVVJSRU5UX1BST0pFQ1QgPSAxXG5cdGxldCBUSFVNQk5BSUxfSEVJR0hUID0gMFxuXHRsZXQgUFJFVl9DTEFTUyA9ICd0ZWFzZXJfX3RodW1ibmFpbC0tcHJldidcblx0bGV0IENVUlJFTlRfQ0xBU1MgPSAndGVhc2VyX190aHVtYm5haWwtLWN1cnJlbnQnXG5cdGxldCBORVhUX0NMQVNTID0gJ3RlYXNlcl9fdGh1bWJuYWlsLS1uZXh0J1xuXG5cdGxldCBQUk9KRUNUX0NPVU5UXG5cdGxldCBwcm9qZWN0c1xuXG5cdHZhciBpbml0ID0gKCkgPT4ge1xuXG5cdFx0JGhvbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudmlldy1ob21lJylbMF1cblxuXHRcdGlmICgkaG9tZSAhPSBudWxsKSB7XG5cdFx0XHRDVVJSRU5UX1BST0pFQ1QgPSAxXG5cdFx0XHRfc2V0R2FsbGVyeSgpXG5cdFx0fVxuXG5cdH1cblxuXHR2YXIgX3NldEdhbGxlcnkgPSAoKSA9PiB7XG5cblx0XHRwcm9qZWN0cyA9IGNvbnRlbnQudmlld3MucHJvamVjdCAvL2dldCBwcm9qZWN0c1xuXHRcdHByb2plY3RzID0gT2JqZWN0LmtleXMocHJvamVjdHMpLm1hcCgoaykgPT4gcHJvamVjdHNba10pIC8vY29udmVydCBvYmplY3QgdG8gYXJyYXlcblx0XHRcblx0XHRQUk9KRUNUX0NPVU5UID0gcHJvamVjdHMubGVuZ3RoXG5cblx0XHQkdGV4dEZpZWxkcy50aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWFzZXJfX3RleHQgaDInKVswXVxuXHRcdCR0ZXh0RmllbGRzLnR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVhc2VyX19wcm9qZWN0LXR5cGUnKVswXVxuXHRcdCR0ZXh0RmllbGRzLmxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVhc2VyX190ZXh0IC5jdGEnKVswXVxuXG5cdFx0JHNsaWRlci5jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVhc2VyX19nYWxsZXJ5LWNvbnRhaW5lcicpWzBdXG5cdFx0JHNsaWRlci5zbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVhc2VyX190aHVtYm5haWwnKVxuXHRcdCRzbGlkZXIuYmFja2dyb3VuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWFzZXJfX2JhY2tncm91bmQnKVswXVxuXHRcdCRzbGlkZXIuY291bnRDdXJyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRlYXNlcl9fY291bnQtY3VycmVudCcpWzBdXG5cdFx0JHNsaWRlci5zY3JvbGxVcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zY3JvbGxib3hfX3VwJylbMF1cblx0XHQkc2xpZGVyLnNjcm9sbERvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2Nyb2xsYm94X19kb3duJylbMF1cblxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWFzZXJfX2NvdW50LWN1cnJlbnQnKVswXS5pbm5lckhUTUwgPSBDVVJSRU5UX1BST0pFQ1Rcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVhc2VyX19jb3VudC10b3RhbCcpWzBdLmlubmVySFRNTCA9IFBST0pFQ1RfQ09VTlRcblxuXHRcdFRIVU1CTkFJTF9IRUlHSFQgPSBfb3V0ZXJIZWlnaHQoJHNsaWRlci5zbGlkZXNbMF0pXG5cblx0XHRfY2hhbmdlVGV4dCgpO1xuXHRcdF9pbml0RXZlbnRzKCk7XG5cdFx0X2luaXRLZXlib2FyZCgpO1xuXG5cdH1cblxuXHR2YXIgX2luaXRFdmVudHMgPSAoKSA9PiB7XG5cblx0XHQkaG9tZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgX2JpbmRNb3VzZVdoZWVsKVxuXG5cdH1cblxuXHR2YXIgX2luaXRLZXlib2FyZCA9ICgpID0+IHtcblxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBfYmluZEtleWJvYXJkKTtcblx0fVxuXG5cdHZhciBfYmluZE1vdXNlV2hlZWwgPSAoZSkgPT4ge1xuXG5cdFx0JGhvbWUucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIF9iaW5kTW91c2VXaGVlbClcblxuXHRcdGlmIChlLndoZWVsRGVsdGEgPCAwKVxuXHRcdFx0X2dvVG9Qcm9qZWN0KCduZXh0Jylcblx0XHRlbHNlIFxuXHRcdFx0X2dvVG9Qcm9qZWN0KCdwcmV2JylcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4gX2luaXRFdmVudHMoKSwgQU5JTUFUSU9OX0RVUkFUSU9OKVxuXG5cdH1cblxuXHR2YXIgX2JpbmRLZXlib2FyZCA9IChlKSA9PiB7XG5cblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgX2JpbmRLZXlib2FyZClcblxuXHRcdHN3aXRjaChlLndoaWNoKSB7XG5cdFx0ICAgIGNhc2UgMzg6XG5cdFx0ICAgIF9nb1RvUHJvamVjdCgncHJldicpXG5cdFx0ICAgIGJyZWFrXG5cblx0XHQgICAgY2FzZSA0MDpcblx0XHQgICAgX2dvVG9Qcm9qZWN0KCduZXh0Jylcblx0XHQgICAgYnJlYWtcblxuXHRcdCAgICBkZWZhdWx0OiByZXR1cm5cblx0XHR9XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IF9pbml0S2V5Ym9hcmQoKSwgQU5JTUFUSU9OX0RVUkFUSU9OKVxuXHRcdFx0XG5cdH1cblxuXHR2YXIgX2dvVG9Qcm9qZWN0ID0gKHdheSkgPT4ge1xuXHRcdFxuXHRcdGlmICh3YXkgPT0gJ25leHQnICYmIENVUlJFTlRfUFJPSkVDVCA8IFBST0pFQ1RfQ09VTlQpXG5cdFx0XHRfZ29Ub05leHQoKVxuXHRcdGVsc2UgaWYgKHdheSA9PSAncHJldicgJiYgQ1VSUkVOVF9QUk9KRUNUID4gMSlcblx0XHRcdF9nb1RvUHJldigpXG5cblx0fVxuXG5cdHZhciBfZ29Ub05leHQgPSAoKSA9PiB7XG5cdFx0dmFyIHRyYW5zbGF0ZSA9IC1DVVJSRU5UX1BST0pFQ1QgKiBUSFVNQk5BSUxfSEVJR0hUXG5cdFx0Q1VSUkVOVF9QUk9KRUNUID0gQ1VSUkVOVF9QUk9KRUNUICsgMVxuXHRcdCRzbGlkZXIuY29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7dHJhbnNsYXRlfXB4KWBcblx0XHRfY2hhbmdlVGV4dCgpXG5cdH1cblxuXHR2YXIgX2dvVG9QcmV2ID0gKCkgPT4ge1xuXHRcdENVUlJFTlRfUFJPSkVDVCA9IENVUlJFTlRfUFJPSkVDVCAtIDFcblx0XHR2YXIgdHJhbnNsYXRlID0gLShDVVJSRU5UX1BST0pFQ1QgLSAxKSAqIFRIVU1CTkFJTF9IRUlHSFRcblx0XHQkc2xpZGVyLmNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgke3RyYW5zbGF0ZX1weClgXG5cdFx0X2NoYW5nZVRleHQoKVxuXHR9XG5cblx0dmFyIF9jaGFuZ2VUZXh0ID0gKCkgPT4ge1xuXG5cdFx0Ly9zZXQgY2xhc3Nlc1xuXHRcdGlmICgkc2xpZGVyLnNsaWRlc1tDVVJSRU5UX1BST0pFQ1QgLSAyXSAhPSBudWxsKSB7XG5cdFx0XHQkc2xpZGVyLnNsaWRlc1tDVVJSRU5UX1BST0pFQ1QgLSAyXS5jbGFzc0xpc3QuYWRkKFBSRVZfQ0xBU1MpXG5cdFx0XHQkc2xpZGVyLnNsaWRlc1tDVVJSRU5UX1BST0pFQ1QgLSAyXS5jbGFzc0xpc3QucmVtb3ZlKENVUlJFTlRfQ0xBU1MsIE5FWFRfQ0xBU1MpXG5cdFx0XHQkc2xpZGVyLnNjcm9sbFVwLmNsYXNzTGlzdC5hZGQoJ3Njcm9sbGJveF9fdXAtLWFjdGl2ZScpXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0JHNsaWRlci5zY3JvbGxVcC5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGxib3hfX3VwLS1hY3RpdmUnKVxuXHRcdH1cblxuXHRcdGlmICgkc2xpZGVyLnNsaWRlc1tDVVJSRU5UX1BST0pFQ1RdICE9IG51bGwpIHtcblx0XHRcdCRzbGlkZXIuc2xpZGVzW0NVUlJFTlRfUFJPSkVDVF0uY2xhc3NMaXN0LmFkZChORVhUX0NMQVNTKVxuXHRcdFx0JHNsaWRlci5zbGlkZXNbQ1VSUkVOVF9QUk9KRUNUXS5jbGFzc0xpc3QucmVtb3ZlKENVUlJFTlRfQ0xBU1MsIFBSRVZfQ0xBU1MpXG5cdFx0XHQkc2xpZGVyLnNjcm9sbERvd24uY2xhc3NMaXN0LmFkZCgnc2Nyb2xsYm94X19kb3duLS1hY3RpdmUnKVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdCRzbGlkZXIuc2Nyb2xsRG93bi5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGxib3hfX2Rvd24tLWFjdGl2ZScpXG5cdFx0fVxuXG5cdFx0JHNsaWRlci5zbGlkZXNbQ1VSUkVOVF9QUk9KRUNUIC0gMV0uY2xhc3NMaXN0LmFkZChDVVJSRU5UX0NMQVNTKVxuXHRcdCRzbGlkZXIuc2xpZGVzW0NVUlJFTlRfUFJPSkVDVCAtIDFdLmNsYXNzTGlzdC5yZW1vdmUoUFJFVl9DTEFTUywgTkVYVF9DTEFTUylcblxuXHRcdHZhciBjb250ZW50ID0gcHJvamVjdHNbQ1VSUkVOVF9QUk9KRUNULTFdXG5cdFx0JHNsaWRlci5jb3VudEN1cnJlbnQuaW5uZXJIVE1MID0gQ1VSUkVOVF9QUk9KRUNUXG5cdFx0JHNsaWRlci5iYWNrZ3JvdW5kLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtjb250ZW50LnRlYXNlcn0pYFxuXG5cdFx0Ly9jaGFuZ2UgdGV4dFxuXHRcdCR0ZXh0RmllbGRzLnRpdGxlLmlubmVySFRNTCA9IGNvbnRlbnQudGl0bGVcblx0XHQkdGV4dEZpZWxkcy50eXBlLmlubmVySFRNTCA9IGNvbnRlbnQudHlwZVxuXHRcdCR0ZXh0RmllbGRzLmxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgY29udGVudC5saW5rKVxuXHR9XG5cblx0dmFyIF9vdXRlckhlaWdodCA9IChlbCkgPT4ge1xuXHRcdHZhciBoZWlnaHQgPSBlbC5vZmZzZXRIZWlnaHQ7XG5cdFx0dmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG5cblx0XHRoZWlnaHQgKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luVG9wKSArIHBhcnNlSW50KHN0eWxlLm1hcmdpbkJvdHRvbSk7XG5cdFx0cmV0dXJuIGhlaWdodDtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0aW5pdDogaW5pdFxuXHR9XG5cbn0pKCk7IiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG5cdCd1c2Ugc3RyaWN0J1xuXG5cdHZhciAkcHJvamVjdFxuXHR2YXIgJGdhbGxlcnlDb250YWluZXJcblx0dmFyIGFjdHVhbEhlaWdodFxuXHR2YXIgJGltYWdlc1xuXG5cdGNvbnN0IE9SSUdJTkFMX0hFSUdIVCA9IDE3NzFcblx0Y29uc3QgT1JJR0lOQUxfTUFSR0lOID0gNDM3XG5cdGNvbnN0IEFOSU1BVElPTl9EVVJBVElPTiA9IDEyMDBcblx0bGV0IENVUlJFTlRfSU1HID0gMVxuXHRsZXQgSU1HX0NPVU5UXG5cdGxldCBJTUdfSEVJR0hUXG5cblx0dmFyIGluaXQgPSAoKSA9PiB7XG5cblx0XHQkcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52aWV3LXByb2plY3QnKVswXVxuXHRcdCRnYWxsZXJ5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRlYXNlcl9fZ2FsbGVyeS1jb250YWluZXInKVswXVxuXG5cdFx0X3NldEltYWdlTWFyZ2luKCk7XG5cdFx0X2luaXRFdmVudHMoKTtcblxuXHR9O1xuXG5cdHZhciBfc2V0SW1hZ2VNYXJnaW4gPSAoKSA9PiB7XG5cblx0XHQkaW1hZ2VzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVhc2VyX19nYWxsZXJ5LWNvbnRhaW5lciBpbWcnKSlcblx0XHRJTUdfQ09VTlQgPSAkaW1hZ2VzLmxlbmd0aFxuXHRcdCRpbWFnZXNbMF0uY2xhc3NMaXN0LmFkZCgnY3VycmVudCcpXG5cdFx0JGltYWdlcy5zaGlmdCgpXG5cdFx0YWN0dWFsSGVpZ2h0ID0gJGltYWdlc1swXS5vZmZzZXRIZWlnaHRcblxuXHRcdHZhciBuZXdNYXJnaW4gPSBPUklHSU5BTF9NQVJHSU4gKiBhY3R1YWxIZWlnaHQgLyBPUklHSU5BTF9IRUlHSFQ7XG5cblx0XHRJTUdfSEVJR0hUID0gYWN0dWFsSGVpZ2h0IC0gbmV3TWFyZ2luXG5cblx0XHRmb3IgKHZhciBpbWFnZSBvZiAkaW1hZ2VzKSB7XG5cdFx0XHRpbWFnZS5zdHlsZS5tYXJnaW5Ub3AgPSBgLSR7bmV3TWFyZ2lufXB4YFx0XG5cdFx0fVxuXHRcdCRpbWFnZXMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWFzZXJfX2dhbGxlcnktY29udGFpbmVyIGltZycpKVxuXHR9XG5cblx0dmFyIF9pbml0RXZlbnRzID0gKCkgPT4ge1xuXG5cdFx0JHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIF9iaW5kTW91c2VXaGVlbClcblxuXHR9XG5cblx0dmFyIF9iaW5kTW91c2VXaGVlbCA9IChlKSA9PiB7XG5cblx0XHQkcHJvamVjdC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgX2JpbmRNb3VzZVdoZWVsKVxuXG5cdFx0aWYgKGUud2hlZWxEZWx0YSA8IDApXG5cdFx0XHRfZ29Ub0ltYWdlKCduZXh0Jylcblx0XHRlbHNlIFxuXHRcdFx0X2dvVG9JbWFnZSgncHJldicpXG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IF9pbml0RXZlbnRzKCksIEFOSU1BVElPTl9EVVJBVElPTilcblxuXHR9XG5cblx0dmFyIF9nb1RvSW1hZ2UgPSAod2F5KSA9PiB7XG5cdFx0XG5cdFx0aWYgKHdheSA9PSAnbmV4dCcgJiYgQ1VSUkVOVF9JTUcgPCBJTUdfQ09VTlQpXG5cdFx0XHRfZ29Ub05leHQoKVxuXHRcdGVsc2UgaWYgKHdheSA9PSAncHJldicgJiYgQ1VSUkVOVF9JTUcgPiAxKVxuXHRcdFx0X2dvVG9QcmV2KClcblxuXG5cdH1cblxuXHR2YXIgX2dvVG9OZXh0ID0gKCkgPT4ge1xuXHRcdHZhciB0cmFuc2xhdGUgPSAtQ1VSUkVOVF9JTUcgKiBJTUdfSEVJR0hUXG5cdFx0Q1VSUkVOVF9JTUcgPSBDVVJSRU5UX0lNRyArIDFcblx0XHQkZ2FsbGVyeUNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgke3RyYW5zbGF0ZX1weClgXG5cdFx0cHJvamVjdC51cGRhdGVMZWdlbmQodHJhbnNsYXRlKVxuXHRcdF91cGRhdGVDdXJyZW50KClcblx0fVxuXG5cdHZhciBfZ29Ub1ByZXYgPSAoKSA9PiB7XG5cdFx0Q1VSUkVOVF9JTUcgPSBDVVJSRU5UX0lNRyAtIDFcblx0XHR2YXIgdHJhbnNsYXRlID0gLShDVVJSRU5UX0lNRyAtIDEpICogSU1HX0hFSUdIVFxuXHRcdCRnYWxsZXJ5Q29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7dHJhbnNsYXRlfXB4KWBcblx0XHRwcm9qZWN0LnVwZGF0ZUxlZ2VuZCh0cmFuc2xhdGUpXG5cdFx0X3VwZGF0ZUN1cnJlbnQoKVxuXHR9XG5cblx0dmFyIF91cGRhdGVDdXJyZW50ID0gKCkgPT4ge1xuXG5cdFx0Zm9yICh2YXIgJGltYWdlIG9mICRpbWFnZXMpIHtcblx0XHRcdCRpbWFnZS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50Jylcblx0XHR9XG5cdFx0JGltYWdlc1tDVVJSRU5UX0lNRyAtIDFdLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQnKVxuXG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGluaXRcblx0fTtcblxufSkoKTsiLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cblx0J3VzZSBzdHJpY3QnXG5cdHZhciAkcHJvamVjdFxuXHR2YXIgJGdhbGxlcnkgPSB7fVxuXHRsZXQgTUFYX1NDUk9MTCA9IDBcblx0bGV0IFBPU0lUSU9OID0gW11cblxuXHR2YXIgaW5pdCA9ICgpID0+IHtcblxuXHRcdCRwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZpZXctcHJvamVjdCcpWzBdXG5cblx0XHRpZiAoJHByb2plY3QgIT0gbnVsbCkge1xuXHRcdFx0JGdhbGxlcnkuZ2FsbGVyeUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWFzZXJfX2dhbGxlcnktY29udGFpbmVyJylbMF1cblx0XHRcdCRnYWxsZXJ5LmdhbGxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVhc2VyX19nYWxsZXJ5JylbMF1cblx0XHRcdCRnYWxsZXJ5Lm5leHRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5leHQtcHJvamVjdCcpWzBdXG5cdFx0XHQkZ2FsbGVyeS5zY3JvbGxib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2Nyb2xsYm94JylbMF1cblx0XHRcdCRnYWxsZXJ5LmltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWFzZXJfX2dhbGxlcnktY29udGFpbmVyIGltZycpXG5cdFx0XHQkZ2FsbGVyeS5sZWdlbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVhc2VyX19sZWdlbmQnKVswXVxuXHRcdFx0JGdhbGxlcnkuaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRlcicpWzBdXG5cdFx0XHQkZ2FsbGVyeS5oZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyLS1oaWRkZW4nKVxuXG5cdFx0XHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmlzLW1vYmlsZScpWzBdICE9IG51bGwpXG5cdFx0XHRcdG1vYmlsZS5pbml0KClcblxuXHRcdFx0X2luaXRFdmVudHMoKVxuXHRcdFx0X2luaXRWYXJpYWJsZXMoKVxuXHRcdH1cblxuXHR9XG5cblx0dmFyIF9pbml0RXZlbnRzID0gKCkgPT4ge1xuXG5cdFx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pcy1tb2JpbGUnKVswXSA9PSBudWxsKVxuXHRcdFx0JHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIF9iaW5kTW91c2VXaGVlbClcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgX2luaXRWYXJpYWJsZXMpXHRcdFxuXG5cdH1cblxuXHR2YXIgX2luaXRWYXJpYWJsZXMgPSAoKSA9PiB7XG5cblxuXHRcdC8vaW5pdCBtYXggc2Nyb2xsXG5cdFx0bGV0IGNvbnRhaW5lckhlaWdodCA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCRnYWxsZXJ5LmdhbGxlcnlDb250YWluZXIsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpKVxuXHRcdGxldCBnYWxsZXJ5SGVpZ2h0ID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUoJGdhbGxlcnkuZ2FsbGVyeSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnaGVpZ2h0JykpXG5cblx0XHR2YXIgb2Zmc2V0ID0gJGdhbGxlcnkubGVnZW5kLm9mZnNldFRvcFxuXG5cdFx0TUFYX1NDUk9MTCA9IC0xICogKGNvbnRhaW5lckhlaWdodCAtIGdhbGxlcnlIZWlnaHQpXG5cblx0XHRQT1NJVElPTiA9IFtdXG5cblx0XHQvL2luaXQgaW1hZ2VzIHBvc2l0aW9uXG5cdFx0Zm9yICh2YXIgaW1hZ2Ugb2YgJGdhbGxlcnkuaW1hZ2VzKSB7XG5cdFx0XHRQT1NJVElPTi5wdXNoKGltYWdlLm9mZnNldFRvcCAtIG9mZnNldClcblx0XHR9XG5cblx0fVxuXG5cdHZhciBfYmluZE1vdXNlV2hlZWwgPSAoZSkgPT4ge1xuXG5cdFx0bGV0IHNjcm9sbFZhbHVlID0gZS5kZWx0YVkgKiAtMC40XG5cdFx0bGV0IGN1cnJUcmFuc2Zvcm0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSgkZ2FsbGVyeS5nYWxsZXJ5Q29udGFpbmVyLG51bGwpLmdldFByb3BlcnR5VmFsdWUoJ3RyYW5zZm9ybScpXG5cdFx0bGV0IGN1cnJTY3JvbGwgPSBfZ2V0Q29tcHV0ZWRUcmFuc2xhdGVZKGN1cnJUcmFuc2Zvcm0pO1xuXG5cdFx0bGV0IG5ld1Njcm9sbFZhbHVlID0gY3VyclNjcm9sbCArIHNjcm9sbFZhbHVlXG5cdFx0aWYgKG5ld1Njcm9sbFZhbHVlID4gMCkge1xuXHRcdFx0bmV3U2Nyb2xsVmFsdWUgPSAwXG5cdFx0XHQkZ2FsbGVyeS5oZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyLS1oaWRkZW4nKVxuXHRcdH1cblx0XHRlbHNlIGlmIChuZXdTY3JvbGxWYWx1ZSA8IE1BWF9TQ1JPTEwpIHtcblx0XHRcdG5ld1Njcm9sbFZhbHVlID0gTUFYX1NDUk9MTFxuXHRcdFx0JGdhbGxlcnkubmV4dFByb2plY3QuY2xhc3NMaXN0LmFkZCgnbmV4dC1wcm9qZWN0LS12aXNpYmxlJyk7XG5cdFx0XHQkZ2FsbGVyeS5zY3JvbGxib3guY2xhc3NMaXN0LmFkZCgnc2Nyb2xsYm94LS1oaWRkZW4nKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQkZ2FsbGVyeS5uZXh0UHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKCduZXh0LXByb2plY3QtLXZpc2libGUnKTtcblx0XHRcdCRnYWxsZXJ5LnNjcm9sbGJveC5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGxib3gtLWhpZGRlbicpO1xuXHRcdFx0JGdhbGxlcnkuaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlci0taGlkZGVuJylcblx0XHR9XG5cblx0XHR1cGRhdGVMZWdlbmQobmV3U2Nyb2xsVmFsdWUpO1xuXG5cdFx0JGdhbGxlcnkuZ2FsbGVyeUNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgke25ld1Njcm9sbFZhbHVlfXB4KWBcblxuXHR9XG5cblx0dmFyIHVwZGF0ZUxlZ2VuZCA9IChzY3JvbGxWYWx1ZSkgPT4ge1xuXHRcdFxuXHRcdGxldCBpbmRleCA9IDBcblxuXHRcdFBPU0lUSU9OLmZvckVhY2goZnVuY3Rpb24gKHBvcywgaSkge1xuXHRcdFx0aWYgKCgtMSpzY3JvbGxWYWx1ZSkgPiBwb3MpXG5cdFx0XHRcdGluZGV4ID0gaVxuXHRcdH0pXG5cblx0XHRsZXQgbGVnZW5kID0gJGdhbGxlcnkuaW1hZ2VzW2luZGV4XS5nZXRBdHRyaWJ1dGUoJ2FsdCcpXG5cblx0XHQkZ2FsbGVyeS5sZWdlbmQuaW5uZXJIVE1MID0gbGVnZW5kXG5cblx0fVxuXG5cdHZhciBfZ2V0Q29tcHV0ZWRUcmFuc2xhdGVZID0gKHRyYW5zZm9ybSkgPT4ge1xuXG5cdFx0bGV0IG1hdCA9IHRyYW5zZm9ybS5tYXRjaCgvXm1hdHJpeDNkXFwoKC4rKVxcKSQvKVxuXHRcdGlmKG1hdCkgcmV0dXJuIHBhcnNlRmxvYXQobWF0WzFdLnNwbGl0KCcsICcpWzEzXSlcblx0XHRtYXQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXhcXCgoLispXFwpJC8pXG5cdFx0cmV0dXJuIG1hdCA/IHBhcnNlRmxvYXQobWF0WzFdLnNwbGl0KCcsICcpWzVdKSA6IDBcblxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0LFxuXHRcdHVwZGF0ZUxlZ2VuZDogdXBkYXRlTGVnZW5kXG5cdH1cblxufSkoKTsiLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cblx0J3VzZSBzdHJpY3QnXG5cblx0dmFyIHRlbXBsYXRlcyA9IHdpbmRvd1tcIlBvcnRmb2xpb1wiXVsndGVtcGxhdGVzJ11cblx0dmFyICRwYWdlQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYWdlLWNvbnRlbnQnKVswXVxuXHR2YXIgY3VycmVudFZpZXdDbGFzc1xuXHR2YXIgY291bGRTdGF0ZUNoYW5nZSA9IHRydWVcblx0dmFyIGhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeVxuXG5cblx0dmFyIGluaXQgPSBmdW5jdGlvbigpIHtcblxuXHRcdCRwYWdlQ29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXHRcdHJlcXVlc3Qub3BlbignR0VUJywgJ2NvbnRlbnQuanNvbicsIHRydWUpXG5cblx0XHRyZXF1ZXN0Lm9ubG9hZCA9ICgpID0+IHtcblx0XHQgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcblx0XHQgICAgd2luZG93LmNvbnRlbnQgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KVxuXHRcdFx0X2JpbmRMaW5rcygpXG5cdFx0XHRfb25TdGF0ZUNoYW5nZSgpXG5cdFx0ICB9XG5cdFx0fVxuXG5cdFx0cmVxdWVzdC5zZW5kKClcblxuXHR9O1xuXG5cdHZhciBfb25TdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBwYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJylcblx0XHRwYXRoLnNoaWZ0KClcblx0XHRfc2V0Um91dGluZyhwYXRoKVxuXHR9XG5cblx0dmFyIF9iaW5kTGlua3MgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgJGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYTpub3QoW3RhcmdldF0pJylcblx0XHRmb3IgKHZhciAkbGluayBvZiAkbGlua3MpIHtcblx0XHRcdCRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX29uTGlua0NsaWNrKVxuXHRcdH1cbiAgICB9O1xuXG5cdHZhciBfc2V0Um91dGluZyA9IGZ1bmN0aW9uKHBhdGgpwqB7XG5cblx0XHR2YXIgdmlldyA9IHBhdGhbMF07XG5cblx0XHRpZiAoIXZpZXcpIHtcblx0XHRcdF91cGRhdGVWaWV3KCdob21lJywgZmFsc2UpXG5cdFx0fSBlbHNlIGlmICh2aWV3ID09ICdwcm9qZWN0Jykge1xuXHRcdFx0dmFyIHByb2plY3ROYW1lID0gcGF0aFsxXVxuXHRcdFx0aWYgKCFwcm9qZWN0TmFtZSkge1xuXHRcdFx0XHRfdXBkYXRlVmlldygnaG9tZScsIGZhbHNlKVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHZhciBkYXRhID0gY29udGVudC52aWV3c1t2aWV3XVtwcm9qZWN0TmFtZV1cblx0XHRcdFx0X3VwZGF0ZVZpZXcoJ3Byb2plY3QnLCBkYXRhKVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRfdXBkYXRlVmlldygnaG9tZScsIGZhbHNlKVxuXHRcdH1cblxuXHR9XG5cblx0dmFyIF9yZW1vdmVDdXJyVmlldyA9IGZ1bmN0aW9uKHZpZXcscGFyYW1zKSB7XG5cblx0XHQkcGFnZUNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgndmlldy1sb2FkZWQnKVxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0JHBhZ2VDb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoY3VycmVudFZpZXdDbGFzcylcblx0XHRcdF9hcHBlbmROZXdWaWV3KHZpZXcsIHBhcmFtcylcblx0XHR9LCAxMDAwKVxuXHRcdFxuXHR9O1xuXG5cdHZhciBfYXBwZW5kTmV3VmlldyA9IGZ1bmN0aW9uKHZpZXcsIHBhcmFtcykge1xuXG5cdFx0dmFyIGNvbnRlbnQgPSB0ZW1wbGF0ZXNbdmlld10ocGFyYW1zKVxuXHRcdCRwYWdlQ29udGVudC5pbm5lckhUTUwgPSBjb250ZW50XG5cblx0XHRpZiAoJHBhZ2VDb250ZW50LmNsYXNzTGlzdClcblx0XHQgICRwYWdlQ29udGVudC5jbGFzc0xpc3QuYWRkKCd2aWV3LScrdmlldylcblx0XHRlbHNlXG5cdFx0ICAkcGFnZUNvbnRlbnQuY2xhc3NOYW1lICs9ICcgJyArICd2aWV3LScrdmlld1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PsKge1xuXHRcdFx0JHBhZ2VDb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoJHBhZ2VDb250ZW50LmNsYXNzTGlzdClcblx0XHRcdFx0ICAkcGFnZUNvbnRlbnQuY2xhc3NMaXN0LmFkZCgndmlldy1sb2FkZWQnKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdCAgJHBhZ2VDb250ZW50LmNsYXNzTmFtZSArPSAnICcgKyAndmlldy1sb2FkZWQnXG5cdFx0XHRcdGN1cnJlbnRWaWV3Q2xhc3MgPSAndmlldy0nK3ZpZXdcblx0XHRcdFx0d2luZG93LmxvYWRTY3JpcHRzKClcblx0XHRcdFx0X2JpbmRMaW5rcygpXG5cdFx0XHR9LCAyMDApXG5cdFx0fSwgMTAwKVxuXG5cdH07XG5cblx0dmFyIF91cGRhdGVWaWV3ID0gZnVuY3Rpb24odmlldywgcGFyYW1zKSB7XG5cblx0XHRpZiAoY3VycmVudFZpZXdDbGFzcykge1xuXHRcdFx0X3JlbW92ZUN1cnJWaWV3KHZpZXcscGFyYW1zKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRfYXBwZW5kTmV3Vmlldyh2aWV3LCBwYXJhbXMpXG5cdFx0fVxuXHR9O1xuXG5cdHZhciBfb25MaW5rQ2xpY2sgPSBmdW5jdGlvbihlKSB7XG5cblx0XHRlLnByZXZlbnREZWZhdWx0KClcblxuXHRcdGlmIChjb3VsZFN0YXRlQ2hhbmdlKSB7XG5cdFx0XHRcbiAgICAgICAgICAgIHZhciBocmVmID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpXG4gICAgICAgICAgICB2YXIgbGluayA9IGhyZWZcblxuICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLmhhc2ggIT0gXCJcIiA/IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoXCIvXCIgKyB3aW5kb3cubG9jYXRpb24uaGFzaCwgXCJcIikucmVwbGFjZSh3aW5kb3cubG9jYXRpb24uaGFzaCwgXCJcIikgOiB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnLycpWzNdO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uID0gJy8nICsgbG9jYXRpb247XG5cbiAgICAgICAgICAgIC8vIFB1c2ggaW50byBoaXN0b3J5IG5ldyBzdGF0ZVxuICAgICAgICAgICAgaWYgKGxpbmsgIT0gbG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgbGluayk7XG4gICAgICAgICAgICAgICAgIF9vblN0YXRlQ2hhbmdlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcblxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBpbml0XG5cdH07XG5cbn0pKCk7Il19

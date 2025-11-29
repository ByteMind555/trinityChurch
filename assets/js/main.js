/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Off-Canvas Navigation.

			// Navigation Panel Toggle.
				$('<a href="#navPanel" class="navPanelToggle"></a>')
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						$('#nav').html() +
						'<a href="#navPanel" class="close"></a>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left'
					});

			// Fix: Remove transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navPanel')
						.css('transition', 'none');

	});

})(jQuery);

// Banner slideshow initializer
(function() {
	function initBannerSlideshow() {
		var banner = document.getElementById('banner');
		if (!banner) return;

		var images = [
			'images/trinityChurch.jpeg',
			'images/trinityChurchNew.jpg',
			'images/trinityChurchSide.jpeg',
			'images/christmas1.jpeg',
			'images/christmas2.jpeg',
		];

		// Create container
		var container = document.createElement('div');
		container.className = 'banner-slideshow';
		// Insert as first child so it sits behind .inner (which has higher z-index)
		banner.insertBefore(container, banner.firstChild);

		// Create slide elements
		images.forEach(function(src, i) {
			var slide = document.createElement('div');
			slide.className = 'slide' + (i === 0 ? ' show' : '');
			slide.style.backgroundImage = 'url("' + src + '")';
			container.appendChild(slide);
		});

		var slides = container.querySelectorAll('.slide');
		var idx = 0;
		var interval = 6000; // ms

		setInterval(function() {
			slides[idx].classList.remove('show');
			idx = (idx + 1) % slides.length;
			slides[idx].classList.add('show');
		}, interval);
	}

	// Run on DOMContentLoaded
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initBannerSlideshow);
	} else {
		initBannerSlideshow();
	}
})();

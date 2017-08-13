// transparent navbar
var navbar = document.querySelector('.fixed-top'), scrollTimer = null,
			mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ];
navbar.style.backfaceVisibility = 'hidden';
navbar.style.transition = 'opacity 0.5s linear 0s';
navbar.style.WebkitTransition = 'opacity 0.5s linear 0s';

function setNavbarOpacity(){
	clearTimeout(scrollTimer);
	scrollTimer = !navbar.classList.contains('HOVER') ? setTimeout(function(){
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if ( scrollTop < 120 ){
			navbar.style.opacity = 1
		} else {
			navbar.style.opacity = 0.7
		}
	},50) : function() {return false;}
}

function setNavbarOpacityOnEnter(){
	clearTimeout(scrollTimer);
	scrollTimer = setTimeout(function(){
		if (!navbar.classList.contains('HOVER')) {
			navbar.classList.add('HOVER');
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			if ( scrollTop > 120 ){
				navbar.style.opacity = 1
			}
		}
	},0)
}

function setNavbarOpacityOnLeave(){
	clearTimeout(scrollTimer);
	scrollTimer = setTimeout(function(){
		if (navbar.classList.contains('HOVER')) {
			navbar.classList.remove('HOVER');
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			if ( scrollTop > 120 ){
				navbar.style.opacity = 0.7
			}
		}
	},0)
}

document.addEventListener('DOMContentLoaded', setNavbarOpacity, false);
window.addEventListener('scroll', setNavbarOpacity, false);
navbar.addEventListener(mouseHover[0],setNavbarOpacityOnEnter,false);
navbar.addEventListener(mouseHover[1],setNavbarOpacityOnLeave,false);
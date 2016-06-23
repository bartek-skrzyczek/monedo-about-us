/*
 * Copyright 2015 - Monedo
 * @author - artegence.com
 * 
 */

var base = {
    transitionEnd: 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',

    media: {
        isLarge: function() {
            return jQuery(window).width() > 767;
        },
        isSmall: function() {
            return jQuery(window).width() < 767;
        }
    },

    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
};

var monedo = {

  	initPage: function() {
        this.foundation();
  	},

    foundation: function() {

		$(document).foundation({
			equalizer: {
				equalize_on_stack: true,
				act_on_hidden_el: false
			}
		});

    }

};

$(function(){
	monedo.initPage();
});



var app = {
    init: function() {
        this.scrolling();
        this.menu_fixed();
        this.menu_link();
    },
    scrolling: function () {
        $('a[href^="#"]').on('click',function (e) {
            e.preventDefault();

            var target = this.hash;
            var $target = $(target);

            if (target === '') {
                $('html, body').stop().animate({
                'scrollTop': '0px'
                }, 500, 'linear', function () {
                    window.location.hash = target;
                });
            } else {
                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top
                }, 500, 'linear', function () {
                    window.location.hash = target;
                });
            }
        });
    },
    menu_fixed: function() {
        var header = document.querySelector('header'),
            header_height = header.offsetHeight,
            doc_offsetTop = document.documentElement.scrollTop || document.body.scrollTop,
            section = document.querySelectorAll('section'),
            burger = header.querySelector('i[data-burger="menu"');

        
        function sticky_menu(val) {
            if (val) {
                header.classList ? 
                header.classList.add('sticky') : header.className += "sticky";
                section[0].style.marginTop = header_height+'px';

            } else {
                header.classList ? 
                header.classList.remove('sticky') : header.className -= "sticky";
                section[0].style.marginTop = '0px';
            }
        }
        if (doc_offsetTop !== 0) {
            sticky_menu(true);
        }
        document.addEventListener('scroll', function(ev) {
            var evt = window.event || ev,
                delta = evt.detail ? evt.detail*(-120) : evt.wheelDelta,
                doc_offsetTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (doc_offsetTop <= 500) {
                sticky_menu(false); 
            } else {
                sticky_menu(true);
            }
        });

        burger.addEventListener('click', function() {
            $(this).parent().toggleClass('dropped');
        })
    },
    menu_link: function() {
        var header = document.querySelector('header'),
            links = document.querySelector('nav').querySelectorAll('a[data-link]');

            for (var i=0; i < links.length; i++) {
                links[i].addEventListener('click', function(ev) {
                
                    var current_slide = $(this).attr('data-link'),
                        container = document.querySelector('.slider'),
                        container_cols = container.querySelectorAll('.col');
                    
                    for (var i=0; i < container_cols.length; i++) {
                        container.classList.remove('slide'+[i+1]);
                        container_cols[i].classList.remove('active');
                        container_cols[i].querySelector('.content').classList.remove('displayNone');
                        container_cols[i].querySelector('.content-slide').classList.add('displayNone');
                        container_cols[i].classList.add('reset');
                    }
                    container.classList.add('slide'+[current_slide]);
                    container_cols[current_slide-1].classList.add('active');
                    container_cols[current_slide-1].querySelector('.content').classList.add('displayNone');
                    container_cols[current_slide-1].querySelector('.content-slide').classList.remove('displayNone');
                    
                    console.log('.slider', document.getElementById('products').querySelector('.col.active').offsetTop)
                    console.log('container_cols[current_slide-1].offsetTop', container_cols[current_slide-1].offsetTop)
                    // $('html, body').stop().animate({
                    //     'scrollTop': container_cols[current_slide-1].offsetTop
                    // }, 500, 'linear');

                });
            }
    }
}

app.init();
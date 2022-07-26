$(function(){
    
    $( window ).resize( function() {
        if (matchMedia("screen and (min-width: 1201px)").matches) {
            $('body').removeClass('none-scroll')
            $('.open-menu-wrap').addClass('hide');
        }
    });
    
    $('.gnb-area .ic-menu').click(function(){
        $(this).siblings('.open-menu-wrap').removeClass('hide');
        $('body').addClass('none-scroll');

        lol = gsap.timeline({delay: .5})
        .to($('.lol1'), .3,{ className:"lol1" })
        .to($('.lol2'), .3,{ className:"lol2" })
        .to($('.lol3'), .3,{ className:"lol3" })
        .to($('.lol3'), .3,{ className:"lol3 hide" })
        .to($('.lol2'), .3,{ className:"lol2 hide" })
        .to($('.lol1'), .3,{ className:"lol1 hide" })
        .to($('.lol1'), .3,{ className:"lol1" })
        .to($('.lol2'), .3,{ className:"lol2" })
        .to($('.lol3'), .3,{ className:"lol3" })
        .to($('.lol4'), .3,{ className:"lol4" })
        .to($('.lol5'), .3,{ className:"lol5" })
    })
    $('.header .btn-close').click(function(e){
        e.preventDefault();
        $(this).parents('.open-menu-wrap').addClass('hide');
        $('body').removeClass('none-scroll')
        lol.kill();
        $('.ani-lol span').each(function(){
            $(this).addClass('hide');
        })
    }) // 메뉴 닫기 버튼 클릭시 메뉴 영역 닫고 body 스크롤 초기화
    if (matchMedia("screen and (min-width: 1201px)").matches) {
        $('body').removeClass('none-scroll')
        $('.ani-lol span').each(function(){
            $(this).addClass('hide');
        })

        $('.gnb-area .menu-area .menu-item').hover(function(){
            if ($(this).children('.submenu-area').length == 1) {
                $('.header').addClass('over');
                $(this).addClass('over');
                $(this).find('.submenu-item').first().children().addClass('active');
            }
        }, function(){
            $('.header').removeClass('over');
            $(this).removeClass('over');
        }) // 대메뉴 hover


        $('.gnb-area .submenu-area .link-submenu').hover(function(){
        $('.gnb-area .submenu-area .link-submenu').removeClass('active');
        $(this).addClass('active');
        }, function(){
            $('.gnb-area .submenu-area .link-submenu').removeClass('active');
            $('.gnb-area .submenu-item:first-child .link-submenu').addClass('active');
        }) // 소메뉴 hover
        $(document).scroll(function(){
            var scrollT = $(this).scrollTop(); 
            var slideT = $(this).find('.sc-mainSlide').offset().top; 
            var slideH = $(this).find('.sc-mainSlide').height();
            var videoT = $(this).find('.sc-video').offset().top;
            var videoH = $(this).find('.sc-video').innerHeight();
        
            if (scrollT >= videoT + videoH) {
                $('.header').removeClass('fix') 
            } else if (scrollT < slideT + slideH) {
                $('.header').addClass('fix')
            }
        }) // 스크롤 이벤트
    }
    if (matchMedia("screen and (max-width: 1023px)").matches) {

        $('.gnb-area .menu-area .has-sub .link-menu').click(function(e){
            e.preventDefault();
            $(this).parent().toggleClass('open-sub')
        }) // 서브메뉴 활성화
    }

    var last_scroll = 0;
    $(window).scroll(function () {
        if (!$('.header').hasClass('fix')) { 
            var curr_scroll = $(window).scrollTop();
            if (curr_scroll > last_scroll || $(window).scrollTop() == 0) {
                $('.header').addClass('hide');
            } else { 
                $('.header').removeClass('hide');
            }
            last_scroll = curr_scroll;
        }
    }); // 마우스 휠 조작 시 헤더영역 숨김 유무

    
    
    
    window.onload = function(){
        setTimeout (function(){
            scrollTo(0,0)
        }, 1)
    } // 새로고침 시 스크롤 top
    

    var numArray = [];
    var slideArray = [];
    $('.sc-mainSlide .swiper-slide').each(function(){
        var randomSlide = Math.floor(Math.random() * 17) + 1;
        if(!numArray.includes(randomSlide)) { 
            numArray.push(randomSlide);
            slideArray.push($('.sc-mainSlide .swiper-slide:nth-child('+randomSlide+')').html());
        }
        if(numArray.length == 5) {
            $('.sc-mainSlide .swiper-wrapper').empty();
            $(numArray).each(function(i){
                $('.sc-mainSlide .swiper-wrapper').append('<div class="swiper-slide"></div>')
                $('.sc-mainSlide .swiper-slide:last-child').append(slideArray[i]);
            })
        }
    }) // 메인슬라이드 개수를 5개로 제한하며 새로고침 할 때마다 랜덤슬라이드
    var isStop = false;
    function fadeText() {
        $('.swiper-slide .fade').remove();
        var text = $('.swiper-slide-active').find('.fiction').text().split("");
        $('.swiper-slide-active').find('.desc').append('<span class="fade"></span>')
        $(text).each(function(i){
            $('.swiper-slide-active').find('.fade').append('<i class="fade-txt'+i+'">'+text[i]+'</i>');
        })
        var i = 0;
        var textAni = setInterval(function(){
            if(!isStop) {
                if(i < text.length) {
                    $('.swiper-slide-active').find('.fade-txt'+i+'').animate({opacity: "1"});
                    i++;
                } else {
                    return false;
                }
            } else {
                clearInterval(textAni);
                setTimeout(function(){
                    isStop = false;
                    fadeText();
                })
            }
        }, 200)
    } // 메인슬라이드 텍스트 페이드인

    var mainSlide = new Swiper(".sc-mainSlide", {
        pagination: {
            el: ".swiper-pagination",
        },
        autoplay: {
            delay: 7000,
        },
        on: {
            slideChange: function(){
                isStop = true;
            }
        },
        loop: true
    }); // 메인슬라이드
    
    
    fadeText();
    var storyAreaClone = $('.story-area').clone()
    storyAreaClone.addClass('dup');
    $('.slide-story').append(storyAreaClone);
    // story 슬라이드

    $('.sc-story .link-story').hover(function(){
        $(this).children().find('img').toggleClass('over');
    }) // story hover이벤트 이미지 scale

    var fontItemClone = $('.font-area').clone();
    fontItemClone.addClass('dup');
    $('.slide-font').append(fontItemClone);
    // font 슬라이드

    $('.story-area').hover(function(){
        $('.slide-story').addClass('pause')
    }, function(){
        $('.slide-story').removeClass('pause')
    }) // story-area에 2초 hover시 애니메이션 중지

    $('.sc-video .video-wrap').hover(function(){
        $(this).children('.btn-control').toggleClass('hide');
    }) // video 영역 hover이벤트 시 컨트롤러 숨김 유무

    $('.sc-video .video-wrap .btn-control').click(function(e){
        e.preventDefault();
        if(!$(this).children('.btn-pause').hasClass('hide')) {
            $(this).siblings().get(0).pause();
            $(this).children('.btn-pause').toggleClass('hide');
            $(this).children('.btn-play').toggleClass('hide');
        } else {
            $(this).siblings().get(0).play();
            $(this).children('.btn-pause').toggleClass('hide');
            $(this).children('.btn-play').toggleClass('hide');
        }
        $(this).toggleClass('pause play');
    }) // video 컨트롤러 클릭 시 video 정지/재생 및 정지/재생버튼 변경

    $('.sc-news .link-news').hover(function(){
        $(this).toggleClass('over');
        $(this).children().find('img').toggleClass('over');
    }) // news 리스트 hover

    $('.btn-related').click(function(){
        $(this).siblings('.site-area').toggleClass('hide');
        $(this).siblings('.ic-arrow').toggleClass('down up');
    }) // footer 관련 사이트 버튼 클릭 시 hide toggle


})
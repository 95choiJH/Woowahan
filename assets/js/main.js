$(function(){
    $('.gnb-area .menu-area .menu-list').hover(function(){
        if ($(this).children('.submenu-area').length == 1) {
            $('.header').addClass('over');
            $(this).addClass('over');
            $(this).find('.submenu-list').first().children().addClass('active');
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
        $('.gnb-area .submenu-list:first-child .link-submenu').addClass('active');
    }) // 소메뉴 hover

    $(document).scroll(function(){
        var scrollT = $(this).scrollTop(); // 현재 스크롤 위치
        var slideT = $(this).find('.sc-mainSlide').offset().top; // Top에서 메인슬라이드 섹션 Top까지 위치
        var slideH = $(this).find('.sc-mainSlide').height(); // 메인슬라이드 섹션 높이
        var videoT = $(this).find('.sc-video').offset().top; // Top에서 비디오 섹션 Top까지 위치
        var videoH = $(this).find('.sc-video').innerHeight(); // 비디오 섹션 높이(패딩포함)
    
        if (scrollT >= videoT + videoH) { // 현재 스크롤이 비디오 섹션 끝부분까지의 위치보다 크다면
            $('.header').removeClass('fix') 
        } else if (scrollT < slideT + slideH) { // 현재 스크롤이 메인 슬라이드 섹션 끝부분까지의 위치보다 작다면
            $('.header').addClass('fix')
        }
    }) // 스크롤 이벤트
    
    var last_scroll = 0;
    $(window).scroll(function () {
        if (!$('.header').hasClass('fix')) { // header 영역에 fix 클래스가 없을 때만 적용
            var curr_scroll = $(window).scrollTop();
            console.log(curr_scroll);
            if (curr_scroll > last_scroll || $(window).scrollTop() == 0) { // 마우스 내릴 때
                $('.header').addClass('hide');
            } else { // 마우스 올릴 때
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
    

    var numArray = []; // 5개의 난수를 넣어 줄 배열 생성
    var slideArray = []; // 5개의 슬라이드를 넣어 줄 슬라이드 배열 생성
    $('.container .sc-mainSlide .swiper-wrapper .swiper-slide').each(function(){
        var randomSlide = Math.floor(Math.random() * 17) + 1; // 슬라이드 이미지 17개에 맞춰 1~17까지 난수 값 설정
        if(!numArray.includes(randomSlide)) { // 나온 난수 값이 배열 안에 없다면(중복 체크)
            numArray.push(randomSlide); // 난수 값을 난수 배열에 넣어줌
            slideArray.push($('.sc-mainSlide .swiper-slide:nth-child('+randomSlide+')').html()); // 나온 난수 값번째 슬라이드에 html을 슬라이드 배열에 넣어줌
        }
        if(numArray.length == 5) { // 난수 배열의 길이가 5개가 된다면
            $('.sc-mainSlide .swiper-wrapper').empty(); // 원래 있던 17개의 슬라이드를 모두 제거
            $(numArray).each(function(i){
                $('.sc-mainSlide .swiper-wrapper').append('<div class="swiper-slide"></div>') // 새로운 슬라이드 영역 생성
                $('.sc-mainSlide .swiper-slide:last-child').append(slideArray[i]); // 만든 슬라이드 영역에 슬라이드 배열에 저장해둔 html을 하나씩 넣어줌
            })
        }
    }) // 메인슬라이드 개수를 5개로 제한하며 새로고침 할 때마다 랜덤슬라이드

    function fadeText() {
        $('.swiper-slide .fade').remove(); // 초기화
        var text = $('.swiper-slide-active').find('.fiction').text(); // 현재 활성화된 슬라이드에 페이드 할 텍스트를 text 변수에 저장 
        text = text.split(""); // 문장을 한 글자씩 잘라서 다시 text 변수에 저장
        $('.swiper-slide-active').find('.desc').append('<span class="fade"></span>') // 활성화 된 슬라이드에 텍스트 자리 뒤에 fade 클래스를 가진 span을 추가
        $(text).each(function(i){ // text의 길이만큼 반복문
            $('.swiper-slide-active').find('.fade').append('<i class="fade-txt'+i+'">'+text[i]+'</i>'); // 추가한 fade안에 text변수에 저장된 글자 하나하나를 각각 클래스를 줘서 추가
        })
        var i = 0; // setinterval 반복할 횟수 i를 0으로 초기화
        setInterval(function(){
            if(i < text.length) { // text의 길이만큼 반복
                $('.swiper-slide-active').find('.fade-txt'+i+'').animate({opacity: "1"}); // 각각의 글자를 2초마다 opacity 1
                i++;
            } else {
                return false; // setinterval 종료
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
                setTimeout(function(){
                    fadeText();
                },1)
            }
        },
        loop: true
    }); // 메인슬라이드
    
    
    $(document).ready(function(){
        fadeText();

        var storyListClone = $('.story-area').children().clone();
        $('.story-area').append(storyListClone);
        var storyAreaClone = $('.story-area').clone()
        storyAreaClone.addClass('dup');
        $('.slide-story').append(storyAreaClone);
        // story 슬라이드

        $('.sc-story .link-story').hover(function(){
            $(this).children().find('img').toggleClass('over');
        }) // story hover이벤트 이미지 scale

        var fontListClone = $('.font-area').clone();
        fontListClone.addClass('dup');
        $('.slide-font').append(fontListClone);
        // font 슬라이드
    })

    $('.story-area').hover(function(){
        setTimeout(function(){
            $('.slide-story').addClass('pause')
        }, 2000)
    }, function(){
        $('.slide-story').removeClass('pause')
    }) // story-area에 2초 hover시 애니메이션 중지

    $('.sc-video .video-wrap').hover(function(){
        $(this).children('a').toggleClass('hide');
    }) // video 영역 hover이벤트 시 컨트롤러 숨김 유무

    $('.sc-video .video-wrap .btn-control').click(function(e){
        e.preventDefault();
        if($(this).hasClass('pause')) {
            $(this).siblings().get(0).pause();
            $(this).children().text('재생');
        } else {
            $(this).siblings().get(0).play();
            $(this).children().text('정지');
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
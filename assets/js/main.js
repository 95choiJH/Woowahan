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
        $(this).parent().siblings().first().children().addClass('active');
    }) // 소메뉴 hover

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


    var mainSlide = new Swiper(".sc-mainSlide", {
        pagination: {
            el: ".swiper-pagination",
        },
        autoplay: {
            delay: 7000,
        },
        loop: true,
    }); // 메인슬라이드
    
    $(document).ready(function(){
        var storyListClone = $('.story-area').children().clone();
        $('.story-area').append(storyListClone);
        var storyAreaClone = $('.story-area').clone()
        storyAreaClone.addClass('dup');
        $('.slide-story').append(storyAreaClone);
    }) // story 슬라이드
})
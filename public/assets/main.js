$(document).ready(function() {
    mainSlider();
    tabBox();
});

/*메인 비주얼 슬라이더*/
function mainSlider() {

    $('.main_slider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 2000,
        responsive:[
            {
                breakpoint: 960,
                settings:{
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings:{
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 560,
                settings:{
                    slidesToShow: 2
                }
            }

        ]
    });
};

/*메인 게시판 */
function tabBox() {

    $('.box.tab .tit button').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('.box.tab .tit button').removeClass('on');
        $('.tab-content').removeClass('on');

        $(this).addClass('on');
        $("#"+tab_id).addClass('on');
    });

};

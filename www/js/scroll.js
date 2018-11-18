$(function () {
    var nav = $('nav');
    var isFixed = nav.hasClass('fixed-top');
    var height = nav.outerHeight();

    $('a').on('click', function (event) {
        var hash = this.hash;
        if (!hash) return;

        var id = hash.replace('#', '');

        var target = document.getElementById(id);
        if (!target) return;

        target = $(hash);

        event.preventDefault();

        $('html, body').animate({
            scrollTop: target.offset().top - (isFixed ? height : 0)
        }, 800);
    });

    var visible = false;
    var scrollToTop = $('<a href="#" class="scrollToTop"><img src="/img/up.png"/></a>');

    $('body').append(scrollToTop);

    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        if (!visible && scrollTop > 100) {
            scrollToTop.fadeIn();
            visible = true;
        } else if (visible && scrollTop <= 100) {
            scrollToTop.fadeOut();
            visible = false;
        }
    });

    //Click event to scroll to top
    scrollToTop.on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 800);
        return false;
    });
});
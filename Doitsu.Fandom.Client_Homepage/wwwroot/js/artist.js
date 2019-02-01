$('a[data-toggle=tab]').click(function () {
    switch (this.id) {
        case 'linkTab2':
            setTimeout(startCubePortfolio, 300);
            break;
    }
});

var startCubePortfolio = function () {
    // Start Cube Porfolio
    try {
        $('#portfolio-item-doitsu').cubeportfolio("destroy");
    } catch (ex) {}
    $('#portfolio-item-doitsu').cubeportfolio({
        filters: '#portfolio-menu',
        loadMore: '#loadMore',
        loadMoreAction: 'click',
        defaultFilter: '*',
        layoutMode: 'grid',
        animationType: 'quicksand',
        gridAdjustment: 'responsive',
        gapHorizontal: 15,
        gapVertical: 15,
        mediaQueries: [{
            width: 1100,
            cols: 4,
        }, {
            width: 768,
            cols: 3,
        }, {
            width: 480,
            cols: 2,
        }, {
            width: 0,
            cols: 1,
        }],
        caption: 'overlayBottomPush',
        displayType: 'sequentially',
        displayTypeSpeed: 80,

        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
    });
}

$('.artists-slider').owlCarousel({
    smartSpeed: 400,
    margin: 15,
    autoplayHoverPause: true,
    loop: true,
    nav: true,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    dots: false,
    responsive: {
        300: {
            items: 2,
            nav: false,
        },
        480: {
            items: 3,
            nav: false,
        },
        768: {
            items: 4,
            nav: false,
        },
        1170: {
            nav: true,
            items: 6,
        },
    }
});
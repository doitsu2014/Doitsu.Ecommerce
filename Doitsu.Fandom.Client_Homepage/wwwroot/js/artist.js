var initEvents = async () => {
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
            $('#artist-album').cubeportfolio("destroy");
        } catch (ex) {}
        $('#artist-album').cubeportfolio({
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

    $('#artists-slider').owlCarousel({
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
};
var initComponents = async (currentArtistCode) => {
    try {
        await fetchArtists(currentArtistCode);
    } catch (e) {
        console.log(e);
    }
};
const createAlbumPortfolioElement = (album) => {
    const albumtPortfolioElement = 
        `<div class="cbp-item col-sm-3">
            <div class="portfolio-single">
                <div class="portfolio-head">
                    <div class="portfolio-head-image" style="background-image: url(${album.thumbnailURL});"></div>
                    <div class="portfolio-hover">
                        <h4><a href="portfolio-single.html">${album.name}</a></h4>
                        <div class="p-button">
                            <a href="/artist/${album.code}" class="btn"><i class="fa fa-link"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    return albumtPortfolioElement;
};
const createArtistPortfolioElement = (artistPortfolio) => {
    const artistPortfolioElement = 
        `<div class="cbp-item col-sm-3">
            <div class="portfolio-single">
                <div class="portfolio-head">
                    <div class="portfolio-head-image" style="background-image: url(${artistPortfolio.avatarUrl});"></div>
                    <div class="portfolio-hover">
                        <h4><a href="portfolio-single.html">${artistPortfolio.name}</a></h4>
                        <div class="p-button">
                            <a href="/artist/${artistPortfolio.code}" class="btn"><i class="fa fa-link"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    return artistPortfolioElement;
};
const createArtistSliderElement = (artistSlider, isActive) => {
    console.log(artistSlider);
    const artistSliderElement = 
        `<div class="single-artist ${isActive ? "active" : ""}">
            <a href="/artist/${artistSlider.code}">
                <img src="${artistSlider.avatarUrl}" alt="${artistSlider.name}">
                <div class="title">
                    <p>${artistSlider.name}</p>
                </div>
            </a>
        </div>`;
    return artistSliderElement;
};

const fetchArtists = async (currentArtistCode) => {
    let res = await fetch(BASE_URL + ARTIST_API_PARAM + 'read');
    let data = (await res.json()).data;
    for(let artist of data) {
        if (currentArtistCode) {
            let isActive = currentArtistCode === artist.code ? true : false;
            if (isActive) {
                await fetchAlbums(currentArtistCode);
                $('#artist-description').append(artist.description);
            }
            const ele = createArtistSliderElement(artist, isActive);
            $('#artists-slider').append(ele);
        }
        else 
        {
            const ele = createArtistPortfolioElement(artist);
            $('#portfolio-items').append(ele);
        }
    }
};

const fetchAlbums = async (currentArtistCode) => {
    let res = await fetch(BASE_URL + PRODUCT_COLLECTION_API_PARAM + `read-by-artist-code?artistCode=${currentArtistCode}`);
    let data = (await res.json());
    for(let album of data.data) {
        if (currentArtistCode) {
            const ele = createAlbumPortfolioElement(album);
            $('#artist-album').append(ele);
        }
    }
};
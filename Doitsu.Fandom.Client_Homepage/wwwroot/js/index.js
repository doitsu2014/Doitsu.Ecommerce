// Area to make the animation of sliders and services start.
async function configEvents() {
    await $('.hero-slider').owlCarousel({
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        merge:true,
        items:1,
        dots:true,
        responsive:{
            300: {
                nav:false,
            },
            480: {
                nav:false,
            },
            768: {
                nav:false,
            },
            1170: {
                nav:true
            },
        }
    });

    await $(".service-slider").owlCarousel({
        autoplay: true,
        smartSpeed: 500,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        dots: false,
        nav: true,
        loop: true,
        margin: 10,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            300: {
                items:1,
            },
            480: {
                items:2,
            },
            768: {
                items:2,
            },
            1170: {
                items:4,
                nav:true
            },
        }
    });

}



function createHeroSliderElement(slider) {
    let blogTypeSubParam = slider.type == sliderTypeEnum.PRODUCT_COLLECTION ? 'album' 
                                : slider.blogCategoryId == blogCategoryEnum.NOTICE ? 'notice' : 'news';
    
    let sliderLink = `${blogTypeSubParam}/${slider.slug}`;
    //style="background-image:url('${slider.thumbnailURL}')"
    let heroSliderElement = 
    `
        <div class="single-slider"  onclick="location.href='${sliderLink}'">
            <img src="${slider.thumbnailURL}"/>
            <div class="shadow-wrap">
            </div>
        </div>
    `;
    return heroSliderElement;
}

function createLatestElement(latestBlog) {
    let blogTypeSubParam = latestBlog.blogCategoryID == blogCategoryEnum.NOTICE ? 'notices' : 'news';
    let sliderLink = `${blogTypeSubParam}/${latestBlog.slug}`;
    
    var draftTimeDate = new Date(latestBlog.draftTime);
    let lastestElement = 
    `
        <a href="${sliderLink}" class="list-group-item list-group-item-action ">
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1">${latestBlog.title}</h6>
                <small>${draftTimeDate.toLocaleDateString()}</small>
            </div>

        </a>
    `;
    /*<p class="mb-1">Short Content</p>
            <small>Artist Name</small>*/
    return lastestElement;
}

async function fetchSliders() {
    let res = await fetch(BASE_URL + SETTING_API_PARAM + 'read-list-slider?isSlider=true');
    let data = (await res.json()).data;
    for(let slider of data) {
        const ele = createHeroSliderElement(slider);
        $('#hero-slider-mapping').append(ele);
    }
}

async function fetchLastestNoticesBlog() {
    let res = await fetch(BASE_URL + BLOG_API_PARAM + `read?blogCategoryId=${blogCategoryEnum['NOTICE']}&limit=5`);
    let data = (await res.json()).data;
    for(let latestBlog of data) {
        const ele = createLatestElement(latestBlog);
        $('#list-notices').append(ele);
    }
}
async function fetchLastestNewsBlog() {
    let res = await fetch(BASE_URL + BLOG_API_PARAM + `read?blogCategoryId=${blogCategoryEnum['NEWS']}&limit=5`);
    let data = (await res.json()).data;
    for(let latestBlog of data) {
        const ele = createLatestElement(latestBlog);
        $('#list-news').append(ele);
    }
}
(async function () {
    await fetchSliders();
    await fetchLastestNoticesBlog();
    await fetchLastestNewsBlog();
    await configEvents();
})();
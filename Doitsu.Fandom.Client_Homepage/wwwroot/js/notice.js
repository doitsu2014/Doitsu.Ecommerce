
function configEvents() {
    /*====================================
    11. Blog Image Gallery JS
    ======================================*/
    $('.blog-image-gallery').owlCarousel({
        autoplay:true,
        autoplayTimeout:4000,
        smartSpeed:600,
        autoplayHoverPause:true,
        loop:true,
        dots:true,
        nav:true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        items:1,
    });
}

function createNoticeElement(latestBlog) {
    var draftTimeDate = new Date(latestBlog.draftTime);
    let lastestElement = 
    `
        <div class="col-12">
            <div class="single-blog">
                <div class="blog-head">
                    <img src="${latestBlog.thumbnailURL}" alt="${latestBlog.title}">
                </div>
                <div class="blog-bottom">
                    <h4><a href="/notices/${latestBlog.slug}">${latestBlog.title}</a></h4>
                    <hr/>
                    <div class="short-content">
                        <p>${latestBlog.content}</p>
                    </div>
                    <ul class="blog-meta">
                        <li><i class="fa fa-calendar"></i>${draftTimeDate.toLocaleDateString()}</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    return lastestElement;
}

function createRecentNoticeElement(latestBlog) {
    var draftTimeDate = new Date(latestBlog.draftTime);
    let lastestElement = 
    `
        <div class="single-post">
            <div class="post-img">
                <img src="${latestBlog.thumbnailURL}" alt="${latestBlog.title}">
            </div>
            <div class="post-info">
                <h4><a href="notices/${latestBlog.slug}">${latestBlog.title}</a></h4>
                <p><i class="fa fa-calendar"></i>${draftTimeDate.toLocaleDateString()}</p>
            </div>
        </div>
    `;
    return lastestElement;
}

function createSingleNoticeElement(notice) {
    var draftTimeDate = new Date(notice.draftTime);
    let lastestElement = 
    `
        <div class="single-blog">
            <div class="blog-head">
                <img src="${notice.thumbnailURL}" alt="#">
            </div>
            <div class="blog-description">
                <h1><a href="blog-single.html">${notice.title}</a></h1>
                <ul class="blog-meta">
                    <li><i class="fa fa-calendar"></i>${draftTimeDate.toLocaleDateString()}</li>
                    <li><a href="#"><i class="fa fa-tags"></i>notices</a></li>
                </ul>
                <p>${notice.content}</p>
    
            </div>
            <div class="bottom-info">
                <div class="row">
                    <div class="col-lg-7 col-md-7 col-12">
                        <div class="tags">
                            <ul>
                                <li class="tag-title">Tags:</li>
                                <li><a href="thong-bao">notices</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-5 col-md-5 col-12">
                        <ul class="social">
                            <li class="connect">Share article:</li>
                            <li class="facebook"><a href="#"><i class="icofont icofont-social-facebook"></i></a></li>
                            <li class="twitter"><a href="#"><i class="icofont icofont-social-twitter"></i></a></li>
                            <li class="linkedin"><a href="#"><i class="icofont icofont-social-linkedin"></i></a></li>
                            <li class="google-plus"><a href="#"><i class="icofont icofont-social-google-plus"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>  
    `;
    return lastestElement;
}

async function fetchNoticesBlog() {
    let res = await fetch(BASE_URL + BLOG_API_PARAM + `read?blogCategoryId=${blogCategoryEnum['NOTICE']}`);
    let data = (await res.json()).data;
    for(let latestBlog of data) {
        const ele = createNoticeElement(latestBlog);
        $('#list-notices').append(ele);
    }
}

async function fetchRecentNoticesBlog() {
    let res = await fetch(BASE_URL + BLOG_API_PARAM + `read?blogCategoryId=${blogCategoryEnum['NOTICE']}&limit=5`);
    let data = (await res.json()).data;
    for(let latestBlog of data) {
        const ele = createRecentNoticeElement(latestBlog);
        $('#list-recent-notices').append(ele);
    }
}

async function fetchNoticeBySlug(slug) {
    let res = await fetch(BASE_URL + BLOG_API_PARAM + `read-by-slug?slug=${slug}`);
    let data = (await res.json()).data;
    const ele = createSingleNoticeElement(data);
    $('#notice-detail').append(ele);
}
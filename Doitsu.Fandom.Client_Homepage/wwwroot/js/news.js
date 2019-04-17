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

function createNewsElement(latestBlog) {
    var draftTimeDate = new Date(latestBlog.draftTime);
    let lastestElement = 
    `
        <div class="col-lg-6 col-md-6 col-12">
            <div class="single-blog">
                <div class="blog-head">
                    <img src="${latestBlog.thumbnailURL}" alt="${latestBlog.title}">
                </div>
                <div class="blog-bottom">
                    <h4><a href="/news/${latestBlog.slug}">${latestBlog.title}</a></h4>
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

function createRandomElement(latestBlog) {
    var draftTimeDate = new Date(latestBlog.draftTime);
    let lastestElement = 
    `
        <div class="single-post">
            <div class="post-img">
                <img src="${latestBlog.thumbnailURL}" alt="${latestBlog.title}">
            </div>
            <div class="post-info">
                <h4><a href="/news/${latestBlog.slug}">${latestBlog.title}</a></h4>
                <p><i class="fa fa-calendar"></i>${draftTimeDate.toLocaleDateString()}</p>
            </div>
        </div>
    `;
    return lastestElement;
}

function createNewsDetailElement(news) {
    var draftTimeDate = new Date(news.draftTime);
    let newsDetailElement = 
    `
        <div class="single-blog">
            <div class="blog-head">
                <img src="${news.thumbnailURL}" alt="#">
            </div>
            <div class="blog-description">
                <h1><a href="blog-single.html">${news.title}</a></h1>
                <ul class="blog-meta">
                    <li><i class="fa fa-calendar"></i>${draftTimeDate.toLocaleDateString()}</li>
                    <li><a href="#"><i class="fa fa-tags"></i>notices</a></li>
                </ul>
                <p>${news.content}</p>
    
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
    return newsDetailElement;
}

async function fetchNewsBlog() {
    //let res = await fetch(BASE_URL + BLOG_API_PARAM + `read?blogCategoryId=${blogCategoryEnum['NEWS']}`);
    //let data = (await res.json()).data;
    //for(let latestBlog of data) {
    //    const ele = createNewsElement(latestBlog);
    //    $('#list-news-post').append(ele);
    //}
    const dataContainer = $('#list-news-post-container');
    const limit = 4;
    $('#list-news-post').pagination({
        dataSource: `${BASE_URL}${BLOG_API_PARAM}read?blogCategoryId=${blogCategoryEnum['NEWS']}&limit=${limit}`,
        locator: 'data',
        totalNumberLocator: function (response) {
            return response.totalFullData;
        },
        pageSize: limit,
        ajax: {
            beforeSend: function () {
                dataContainer.html('Loading data from api ...');
            }
        },
        callback: function (data, pagination) {
            // template method of yourself
            dataContainer.html("");
            for(let latestBlog of data) {
                const ele = createNewsElement(latestBlog);
                dataContainer.append(ele);
            }
        }
    })
}

async function fetchRandomNewsBlog() {
    let res = await fetch(BASE_URL + BLOG_API_PARAM + `read?blogCategoryId=${blogCategoryEnum['NEWS']}&limit=5`);
    let data = (await res.json()).data;
    for(let latestBlog of data) {
        const ele = createRandomElement(latestBlog);
        $('#list-random-news-post').append(ele);
    }
}

async function fetchNewsBySlug(slug) {
    let res = await fetch(BASE_URL + BLOG_API_PARAM + `read-by-slug?slug=${slug}`);
    let data = (await res.json()).data;
    const ele = createNewsDetailElement(data);
    $('#news-post').append(ele);
}
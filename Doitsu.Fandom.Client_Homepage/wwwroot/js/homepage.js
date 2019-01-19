const sliderTypeEnum = {
    BLOG: 1,
    PRODUCT_COLLECTION : 2
};
const blogCategoryID = {
    NOTICE: 1,
    NEWS: 2
};

let createSlider = (sliderData) => {
    this._convertLink = (originalId, slug) => {
        const splittedId = originalId.split('-');
        const type = splittedId[0];
        const id = splittedId[1];

        if (type == sliderTypeEnum.BLOG) {
            return `bai-viet/${slug}`;
        } else {
            return `album/${slug}`;
        }
    };
    return `
        <div data-img="${sliderData.thumbnailURL}">
            <a href="${this._convertLink(sliderData.originalId, sliderData.slug)}" class="item">
            </a>
        </div>
    `;
};
let createNoticeReview = (noticeReviewData) => {
    let trueTime = convertCSTimeToJsTime(noticeReviewData.draftTime);
    let trueTimeStr = trueTime.toLocaleDateString() + ' ' + trueTime.toLocaleTimeString()
    return `
        <li class="li_1 notice_list">
            <a href="bai-viet/${noticeReviewData.slug}">${noticeReviewData.title}</a><span class="notice_date">${trueTimeStr}</span>
        </li>
    `;
};
let createAlbum = (albumData) => {
    let trueTime = convertCSTimeToJsTime(albumData.createdTime);
    let trueTimeStr = trueTime.toLocaleDateString() + ' ' + trueTime.toLocaleTimeString()
    return `
        <div class="item">
            <p>
                <a href="album/${albumData.slug}" style="cursor:pointer;">
                    <span class="img"><span><img src="${albumData.thumbnailURL}" alt=""></span></span>
                    <span class="txt">
                        <strong>${albumData.name}</strong>
                        ${trueTimeStr}
                    </span>
                </a>
            </p>
        </div>
    `;
};

// Init slider, notice, album
(async () => {
    let res = await fetch(`${configuration.BASE_API_URL}settings/read-list-slider?isSlider=true`);
    let data = (await res.json()).data.filter(a => a.slug != '');
    for (let item of data) {
        $("#slider-for-pc").append(createSlider(item))
    }
    $(".fotorama").fotorama();
})();
(async () => {
    let res = await fetch(`${configuration.BASE_API_URL}blog/read?limit=2&blogCategoryId=${blogCategoryID.NOTICE}`);
    let data = (await res.json()).data.filter(a => a.slug != '');
    for (let item of data) {
        $("#notice-area").append(createNoticeReview(item))
    }
})();
(async () => {
    let res = await fetch(`${configuration.BASE_API_URL}product-collection/read?limit=1`);
    let data = (await res.json()).data.filter(a => a.slug != '');
    for (let item of data) {
        $("#album-area").append(createAlbum(item))
    }
})();
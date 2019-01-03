let createVideoComponent = (video) => {
    let videoCompo =
        `<div class="col-md-1">
            <a href="${video.resourceURL}" class="btn btn-block episode" data-active="false">${video.code}</a>
        </div>`;
    return videoCompo;
};

const videoComponent_OnClick = (event) => {
    console.log("do something");
};

const newProductCollectionInit = async (slug) => {
    let res = await fetch(`${configuration.BASE_API_URL}product-collection/read-by-slug?slug=${slug}`);

    let data = await res.json();
    let productCollection = data.data;
    let listVideos = productCollection.listProducts;

    // Inject video components to view
    for (var video of listVideos) {
        let videoCompo = createVideoComponent(video);
        $('#album-list-video').append(videoCompo);
    }
    //for (var product of products) {
    //    let productHTML = createGridItem(product);
    //    $("#grid-box-product").append(productHTML);
    //}

    //framework_y_initPagination();
};

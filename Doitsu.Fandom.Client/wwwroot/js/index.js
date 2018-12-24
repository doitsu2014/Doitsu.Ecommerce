let createGridItem = (video) => {
    let gridItem =
        `<div class="grid-item col-md-4">
                    <div class="img-box scale adv-img adv-img-half-content" data-anima="fade-left" data-trigger="hover" data-anima-out="hide">
                        <a href="/video/${video.slug}" class="img-box lightbox anima-scale-up anima">
                            <img alt="" src="${video.thumbnailURL}">
                        </a>
                        <div class="caption anima anima-fade-bottom">
                            <h2>${video.name}</h2>
                            <p>
                                ${video.code}
                            </p>
                        </div>
                    </div>
                    <div class="caption-bottom">
                        <h2>${video.name}</h2>
                            <p>
                                ${video.code}
                            </p>
                    </div>
                </div>`;
    return gridItem;
};
const newProductCollectionInit = async () => {
    let res = await fetch(`${configuration.BASE_API_URL}product/read?collectionId=${configuration.newestProCollectionId}`);

    let data = await res.json();
    let products = data.data;
  
    for (var product of products) {
        let productHTML = createGridItem(product);
        $("#grid-box-product").append(productHTML);
    }

    framework_y_initPagination();
};
$(document).ready((e) => {
    newProductCollectionInit();
});

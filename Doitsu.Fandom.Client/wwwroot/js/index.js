let createGridItem = (album) => {
    let gridItem =
        `<div class="grid-item col-md-4">
            <div class="img-box scale adv-img adv-img-half-content" data-anima="fade-left" data-trigger="hover" data-anima-out="hide">
                <a href="/album/${album.slug}" class="img-box  anima-scale-up anima">
                    <img alt="" src="${album.thumbnailURL}">
                </a>
                <div class="caption anima anima-fade-bottom">
                    <h2>${album.name}</h2>
                </div>
            </div>
            <div class="caption-bottom">
                <h2>${album.name}</h2>
            </div>
        </div>`;
    return gridItem;
};
const newListProductCollectionInit = async () => {
    let res = await fetch(`${configuration.BASE_API_URL}product-collection/read`);

    let data = await res.json();
    let products = data.data;
  
    for (var product of products) {
        let productHTML = createGridItem(product);
        $("#grid-box-product").append(productHTML);
    }

    framework_y_initPagination();
};
// execute directly
newListProductCollectionInit();

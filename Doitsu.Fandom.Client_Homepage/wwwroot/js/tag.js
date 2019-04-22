const createTagEle = (tag) => {
    const tagEle = 
    `<li><a href="#">${tag.title}</a></li>`;
    return tagEle;
}


const fetchPopularTag = async () => {
    let res = await fetch(BASE_URL + TAG_API_PARAM + 'read-popular');
    if (res.status === 200) {
        const data = (await res.json()).data;
        const ul = $("<ul></ul>");
        for(let tag of data) {
            const tagEle = createTagEle(tag);
            ul.append(tagEle);
        }

        $(".popular-tags").html("");
        $(".popular-tags").append("<h2>Popular tag</h2>");
        $(".popular-tags").append(ul);
    }
};
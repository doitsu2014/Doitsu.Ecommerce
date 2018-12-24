import axios from 'axios'
import configuration from 'configuration'
import { notifyError } from 'utils/errorHandler'

export const readProduct = async (request = {}) => {
    const url = configuration.baseAPIUrl + "product/read";
    try {
        let response = await axios.get(url, {
            params: request,
            headers: {"Authorization": window.localStorage.getItem("app.Authorization")}
        });
        let data = response.data;
        return data;
    } catch (e) {
        notifyError(e);
        return [];
    }
}

export const create = async (request) => {
    const url = configuration.baseAPIUrl + "product/create";
    const bodyData = {
        name: request.productName,
        code: request.productCode,
        resourceURL: request.productResourceURL,
        artistId: request.artistId,
        collectionId: request.productCollectionId,
        thumbnailURL: request.productThumbnailURL,
        isAuthorized: request.productIsAuthorized,
        slug: request.productSlug,
        active: request.active
    };
    try {
        let response = await axios.post(url, bodyData, {
            headers: {"Authorization": window.localStorage.getItem("app.Authorization")}
        });
        let data = response.data;
        return data;
    } catch (e) {
        notifyError(e);
        return [];
    }
}

export const update = async (request) => {
    const url = configuration.baseAPIUrl + "product/update";
    const bodyData = {
        id: request.productId,
        name: request.productName,
        code: request.productCode,
        resourceURL: request.productResourceURL,
        artistId: request.artistId,
        collectionId: request.productCollectionId,
        thumbnailURL: request.productThumbnailURL,
        isAuthorized: request.productIsAuthorized,
        slug: request.productSlug,        
        active: request.active
    };
    try {
        let response = await axios.put(url, bodyData, {
            headers: {"Authorization": window.localStorage.getItem("app.Authorization")}
        });
        let data = response.data;
        return data;
    } catch (e) {
        notifyError(e);
        return [];
    }
}

export const deleteProduct = async (request) => {
    const url = configuration.baseAPIUrl + "product/delete";
    try {
        let response = await axios.delete(url, {
            params: {
                id: request.id
            },
            headers: {"Authorization": window.localStorage.getItem("app.Authorization")}
        });
        let data = response.data;
        return data;
    } catch (e) {
        notifyError(e);
        return [];
    }
}
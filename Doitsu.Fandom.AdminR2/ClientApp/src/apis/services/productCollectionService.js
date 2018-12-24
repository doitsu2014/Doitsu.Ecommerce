import axios from 'axios'
import configuration from 'configuration'
import { notifyError } from 'utils/errorHandler'

export const readProductCollection = async (request = {}) => {
    const url = configuration.baseAPIUrl + "product-collection/read";
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

    const url = configuration.baseAPIUrl + "product-collection/create";
    const bodyData = {
        name: request.productCollectionName,
        slug: request.productCollectionSlug,
        thumbnailUrl: request.productCollectionThumbnailUrl,
        artistId: request.productCollectionArtistId,
        description: request.productCollectionDescription,
        type: request.productCollectionType,
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
    const url = configuration.baseAPIUrl + "product-collection/update";
    const bodyData = {
        id: request.id,
        name: request.productCollectionName,
        slug: request.productCollectionSlug,
        thumbnailUrl: request.productCollectionThumbnailUrl,        
        artistId: request.productCollectionArtistId,
        description: request.productCollectionDescription,
        type: request.productCollectionType,
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

export const deleteProductCollection = async (request) => {
    const url = configuration.baseAPIUrl + "product-collection/delete";
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
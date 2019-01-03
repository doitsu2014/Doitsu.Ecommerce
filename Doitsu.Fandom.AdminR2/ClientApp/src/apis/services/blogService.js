import axios from 'axios'
import configuration from 'configuration'
import { notifyError } from 'utils/errorHandler'

export const readBlog = async (request = {}) => {
    const url = configuration.baseAPIUrl + "blog/read";
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

export const createBlog = async (request) => {
    const url = configuration.baseAPIUrl + "blog/create";
    const bodyData = {
        ...request
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

export const updateBlog = async (request) => {
    const url = configuration.baseAPIUrl + "blog/update";
    const bodyData = {
        ...request
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

export const deleteBlog = async (request) => {
    const url = configuration.baseAPIUrl + "blog/delete";
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
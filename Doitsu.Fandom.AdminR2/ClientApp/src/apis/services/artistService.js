import axios from 'axios'
import configuration from 'configuration'
import { catchError } from '../../../node_modules/rxjs/operators';
import { notifyError } from 'utils/errorHandler'

export const readArtist = async (request = {}) => {
    const url = configuration.baseAPIUrl + "artist/read";
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
    const url = configuration.baseAPIUrl + "artist/create";
    const bodyData = {
        name: request.artistName,
        code: request.artistCode,
        avatarUrl: request.artistAvatarUrl,
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
    const url = configuration.baseAPIUrl + "artist/update";
    const bodyData = {
        id: request.id,
        name: request.artistName,
        code: request.artistCode,
        avatarUrl: request.artistAvatarUrl,
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

export const deleteArtist = async (request) => {
    const url = configuration.baseAPIUrl + "artist/delete";
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
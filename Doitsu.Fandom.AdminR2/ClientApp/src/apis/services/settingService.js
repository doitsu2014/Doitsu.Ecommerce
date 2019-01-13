import axios from 'axios'
import configuration from 'configuration'
import { notifyError } from 'utils/errorHandler'

export const readSliders = async (request = {}) => {
    const url = configuration.baseAPIUrl + "settings/read-list-slider";
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

export const updateSlider = async (request) => {
    const url = configuration.baseAPIUrl + "settings/update-is-slider";
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

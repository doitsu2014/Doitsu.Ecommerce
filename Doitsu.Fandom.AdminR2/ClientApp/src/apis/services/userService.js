import axios from 'axios'
import configuration from 'configuration'
import { catchError } from '../../../node_modules/rxjs/operators';
import {notification} from 'antd'

export const getAuthorize = async (username, password) => {
    const url = configuration.baseAPIUrl + "authorize/login";

    try {
        let response = await axios.post(url, {
            Email: username,
            Password: password,
            RememberMe: false
        });
        let token = response.data;
        return token;
    } catch (e) {
        console.error(e);
        return null;
    }
}
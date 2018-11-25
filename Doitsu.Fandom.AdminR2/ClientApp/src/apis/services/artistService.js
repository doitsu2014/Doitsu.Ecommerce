import axios from 'axios'
import configuration from 'configuration'
import { catchError } from '../../../node_modules/rxjs/operators';

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
        console.error(e);
        return null;
    }
}
import axios from 'axios'
import configuration from 'configuration'
import { catchError } from '../../../node_modules/rxjs/operators';


export const getArtists = async (request) => {
    const url = configuration.baseAPIUrl + "authorize/login";
    try {
        let response = await axios.get(url, {
            params: request
        });
        let token = response.data;
        return token;
    } catch (e) {
        console.error(e);
        return null;
    }
}
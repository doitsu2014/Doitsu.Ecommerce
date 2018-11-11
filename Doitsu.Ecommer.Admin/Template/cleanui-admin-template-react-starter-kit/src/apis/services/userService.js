import axios from 'axios'
import configuration from 'configuration'

const getAuthorize = async (username, password) => {
    const baseAPIUrl = configuration.baseAPIUrl;
    return await axios.get(baseAPIUrl + 'customer/login', {
        params: {
            username: username,
            password: password
        }
    });
}
import axios from 'axios'
import configuration from 'configuration'

export const getAuthorize = async (username, password) => {
    const url = configuration.baseAPIUrl + "authorize/login";
    try {
        let response = await axios({
            method: 'post',
            url: url,
            headers: { 'content-type': 'application/json' },
            data: {
                Email: username,
                Password: password,
                RememberMe: false
            }
          });
        let token = response.data;
        return token;
    }catch (e) {
        console.log(e);
    }
    
}

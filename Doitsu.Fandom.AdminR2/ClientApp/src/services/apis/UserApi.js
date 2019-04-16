import axios from 'axios'
import Configuration from 'Configuration'

export default class UserApi {
  static getAuthorize = async (username, password) => {
    const url = `${Configuration.URL.BASE}/${Configuration.URL.AUTHORIZE}/login`
    const response = await axios.post(url, {
      Email: username,
      Password: password,
      RememberMe: false,
    })
    const token = response.data
    return token
  }
}

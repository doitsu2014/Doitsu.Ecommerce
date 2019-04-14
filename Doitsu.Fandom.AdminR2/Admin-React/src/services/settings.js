import axios from 'axios'
import Config from 'Configuration'
import notifyError from 'utils/errorHandler'
import U from 'utils'

export const read = async (request = {}) => {
  const url = `${Config.URL.BASE}/${Config.URL.SETTINGS}/read-list-slider`
  try {
    const response = await axios.get(url, {
      params: request,
      headers: { Authorization: `Bearer ${U.GetCurrentUser().token}` },
    })
    const { data } = response
    return data
  } catch (e) {
    notifyError(e)
    return []
  }
}

export const updateIsSlider = async request => {
  const url = `${Config.URL.BASE}/${Config.URL.SETTINGS}/update-is-slider`
  const bodyData = {
    ...request,
  }
  try {
    const response = await axios.put(url, bodyData, {
      headers: { Authorization: `Bearer ${U.GetCurrentUser().token}` },
    })
    const { data } = response
    return data
  } catch (e) {
    notifyError(e)
    return []
  }
}

import axios from 'axios'
import Configuration from 'Configuration'
import Utils from 'utils'

export const readArtist = async (request = {}) => {
  const url = `${Configuration.URL.BASE}/${Configuration.URL.ARTIST}/read`
  try {
    const response = await axios.get(url, {
      params: request,
      headers: { Authorization: `Bearer ${Utils.GetCurrentUser().token}` },
    })
    return response.data
  } catch (e) {
    return []
  }
}

export const create = async request => {
  const url = `${Configuration.URL.BASE}/${Configuration.URL.ARTIST}/create`
  const response = await axios.post(url, request, {
    headers: { Authorization: `Bearer ${Utils.GetCurrentUser().token}` },
  })
  return response.data
}

export const update = async request => {
  const url = `${Configuration.URL.BASE}/${Configuration.URL.ARTIST}/update`
  const response = await axios.put(url, request, {
    headers: { Authorization: `Bearer ${Utils.GetCurrentUser().token}` },
  })
  return response.data
}

export const deleteArtist = async request => {
  const url = `${Configuration.URL.BASE}/${Configuration.URL.ARTIST}/delete`
  const response = await axios.delete(url, {
    params: {
      id: request.id,
    },
    headers: { Authorization: `Bearer ${Utils.GetCurrentUser().token}` },
  })
  return response.data
}

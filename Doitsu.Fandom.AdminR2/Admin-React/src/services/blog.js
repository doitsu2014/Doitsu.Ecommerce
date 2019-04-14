import axios from 'axios'
import Config from 'Configuration'
import notifyError from 'utils/errorHandler'
import U from 'utils'

export const read = async (request = {}) => {
  const url = `${Config.URL.BASE}/${Config.URL.BLOG}/read`
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

export const create = async request => {
  const url = `${Config.URL.BASE}/${Config.URL.BLOG}/create`
  const response = await axios.post(url, request, {
    headers: { Authorization: `Bearer ${U.GetCurrentUser().token}` },
  })
  const { data } = response
  return data
}

export const update = async request => {
  const url = `${Config.URL.BASE}/${Config.URL.BLOG}/update`
  const bodyData = request
  const response = await axios.put(url, bodyData, {
    headers: { Authorization: `Bearer ${U.GetCurrentUser().token}` },
  })
  const { data } = response
  return data
}

export const deleteB = async request => {
  const url = `${Config.URL.BASE}/${Config.URL.BLOG}/delete`
  const response = await axios.delete(url, {
    params: {
      id: request.id,
    },
    headers: { Authorization: `Bearer ${U.GetCurrentUser().token}` },
  })
  const { data } = response
  return data
}

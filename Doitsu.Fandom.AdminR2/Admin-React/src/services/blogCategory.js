import axios from 'axios'
import Config from 'Configuration'
import notifyError from 'utils/errorHandler'
import U from 'utils'

export default async function read(request = {}) {
  const url = `${Config.URL.BASE}/${Config.URL.BLOG_CATEGORY}/read`
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

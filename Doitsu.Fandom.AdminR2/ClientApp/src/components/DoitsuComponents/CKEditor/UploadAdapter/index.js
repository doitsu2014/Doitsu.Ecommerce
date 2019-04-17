import axios from 'axios'
import Configuration from 'Configuration'
import Utils from 'utils'

export default function UploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = loader => {
    // Configure the URL to the upload script in your back-end here!
    return new UploadAdapter(loader)
  }
}

export class UploadAdapter {
  constructor(loader) {
    this.loader = loader
  }

  async upload() {
    const file = await this.loader.file
    const url = await this.sendRequest(file)
    return {
      default: url,
    }
  }

  abort() {
    if (this.source) {
      this.source('User cancel upload')
    }
  }

  onUploadProgress = progressEvent => {
    this.loader.uploadTotal = progressEvent.total
    this.loader.uploaded = progressEvent.loaded
  }

  // Prepares the data and sends the request.
  async sendRequest(file) {
    // Prepare the form data.
    console.log(new Error().stack)
    const data = new FormData()
    data.append('file', file)

    // Send the request.
    const { CancelToken } = axios
    this.source = CancelToken.source()
    const url = `${Configuration.URL.BASE}/${Configuration.URL.IMAGE}/upload`
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${Utils.GetCurrentUser().token}`,
        'content-type': 'multipart/form-data',
      },
      onUploadProgress: this.onUploadProgress,
    })
    if (response && response.data && response.data.data) {
      return response.data.url
    }
    return ''
  }
}

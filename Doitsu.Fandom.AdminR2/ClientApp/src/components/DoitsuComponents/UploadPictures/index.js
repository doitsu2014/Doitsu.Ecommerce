import React from 'react'
import './style.scss'
import { Upload, Icon, Modal } from 'antd'
import config from 'Configuration'
import Utils from 'utils'

export default class UploadPictures extends React.Component {
  state = {
    uploadProps: {
      multiple: true,
      action: `${config.URL.BASE}/${config.URL.IMAGE}/uploads`,
      headers: {
        Authorization: `Bearer ${Utils.GetCurrentUser().token}`,
      },
      name: 'files',
      listType: 'picture-card',
      className: 'upload-pictures',
    },
    previewVisible: false,
    previewImage: '',
    fileList: [],
    isBindingDefault: false,
  }

  componentWillReceiveProps() {
    const { defaultImage } = this.props
    const { fileList, isBindingDefault } = this.state
    // this is default field
    // so if is empty system will bind
    // another case will not bind
    if (defaultImage && !isBindingDefault) {
      fileList.push(defaultImage)
      this.setState({
        fileList,
        isBindingDefault: true,
      })
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = ({ fileList }) => {
    this.setState({
      fileList,
    })
    const { onSuccessCallback } = this.props
    if (fileList) {
      onSuccessCallback(fileList)
    }
  }

  render() {
    const { previewVisible, previewImage, previewImageName, fileList, uploadProps } = this.state
    const uploadButton = (
      <div>
        <Icon type="cloud-upload" />
        <div className="ant-upload-text">Upload file</div>
      </div>
    )

    return (
      <div className="clearfix">
        <Upload
          {...uploadProps}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.andleCancel}>
          <img alt={previewImageName} style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

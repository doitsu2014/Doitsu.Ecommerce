import React from 'react'
import './style.scss'
import { Upload, Icon, Modal, message } from 'antd'


class UploadPictures extends React.Component {
  static defaultProps = {
    uploadProps: {
      multiple: true,
      action: 'http://localhost:54389/api/image/uploads',
      headers: {
        'Authorization': window.localStorage.getItem('app.Authorization')
      },
      name:"files",
      listType:"picture-card",
      className:"upload-pictures"
    },
    previewVisible: false,
    previewImage: '',
    fileList: [],
    handleChange: {},
    handleCancel: {},
    handlePreview : {},
    handleUploadSuccess: {},  
    handleRemove:{}
  }
  render() {
    let { 
      previewVisible, 
      previewImage, 
      previewImageName, 
      fileList, 
      uploadProps, 
      handleChange,
      handleCancel, 
      handlePreview, 
      handleUploadSuccess,
      handleRemove
    } = this.props

    const uploadButton = (
      <div>
        <Icon type="cloud-upload" />
        <div className="ant-upload-text">Đăng hình</div>
      </div>
    )

    return (
      <div className="clearfix">
        <Upload
          {...uploadProps}
          fileList= {fileList}
          onSuccess={handleUploadSuccess}
          onRemove={handleRemove}
          onPreview={handlePreview}
          onChange={handleChange}
        >
        {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt={previewImageName} style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default UploadPictures;
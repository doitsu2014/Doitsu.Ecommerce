import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import './style.scss';
import { Upload, Icon, Modal, message } from 'antd';
import  config  from 'configuration.js';
import { setPictureUploaderState } from 'ducks/fandom';

const mapStateToProps = (state, props) => ({
  ...state.fandom.pictureUploaderState
})

@connect(mapStateToProps)
class UploadPictures extends React.Component {
  // Declare upload property
  // + Server API to upload picture
  // + function upload handler
  static defaultProps = {
    uploadProps: {
      multiple: true,
      action: `${config.baseAPIUrl}image/uploads`,
      headers: {
        'Authorization': window.localStorage.getItem('app.Authorization')
      },
      name:"files",
      listType:"picture-card",
      className:"upload-pictures"
    },
    fileListURL: []
  }

  handleChange = (info) => {
    const status = info.file.status
    if (status !== 'uploading') {
      console.log("Uploading: ", info)
    }
    if (status === 'done') {
      console.log(info)
    } else if (status === 'error') {
      console.error(info);
    }
  }

  handleCancel = () => {
    this.props.dispatch(setPictureUploaderState({
      previewVisible: false
    }));
  }

  handlePreview = file => {
    this.props.dispatch(setPictureUploaderState({
      previewImage: file.url || file.thumbUrl,
      previewImageName: file.name,
      previewVisible: true
    }));
  }

  handleUploadSuccess = (response) => {
    let fileList = response.data;
    this.props.dispatch(setPictureUploaderState({
      fileList: fileList
    }));
  }

  handleRemove = (data) => {
    let removedList = this.props.fileList.filter((v) => v.url != data.url).slice();
    this.props.dispatch(setPictureUploaderState({
      fileList: removedList
    }));
  }

  render() {
    let { 
      uploadProps,
      fileList,
      previewVisible,
      previewImage,
      previewImageName
    } = this.props;

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
          onSuccess={this.handleUploadSuccess}
          onRemove={this.handleRemove}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
        {fileList && fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt={previewImageName} style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}



export default UploadPictures;
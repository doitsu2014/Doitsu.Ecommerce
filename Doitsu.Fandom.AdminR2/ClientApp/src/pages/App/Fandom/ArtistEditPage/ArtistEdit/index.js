import React from 'react'
import {connect} from 'react-redux'
import { Input, TreeSelect, Select, Button, Upload, Icon, message } from 'antd'
import UploadPictures from 'components/DoitsuComponents/UploadPictures'
import './style.scss'
import { createWriteStream } from 'fs';
import {setArtistEditUploadImagesState, setArtistEditState, setArtistListState} from 'ducks/fandom'
import { create } from 'apis/services/artistService.js'
import { setLoading } from 'ducks/app'
import { notification } from 'antd'
import { push } from 'react-router-redux'


const TreeNode = TreeSelect.TreeNode
const Option = Select.Option
const Dragger = Upload.Dragger
const { TextArea } = Input

const mapStateToProps = (state, props) => ({
    ...state.fandom.artistEditState
})

@connect(mapStateToProps)
class ArtistEdit extends React.Component {
  onInputChange = e => {
    this.props.dispatch(setArtistEditState({ [e.target.name]:e.target.value }));
  }

  uploadImagesChange = (info) => {
    const status = info.file.status
    console.log(info)
    if (status !== 'uploading') {
      console.log("Uploading: ", info)
    }
    if (status === 'done') {
      console.log(info)
    } else if (status === 'error') {
      console.error(info);
    }
  }

  uploadImagesCancel = () => {
    let {uploadImages }= this.props;
    uploadImages.previewVisible= false;
    this.props.dispatch(setArtistEditUploadImagesState({...this.props.uploadImages}));

  }

  uploadImagesPreview = file => {
    let {uploadImages }= this.props;
    uploadImages.previewImage= file.url || file.thumbUrl,
    uploadImages.previewImageName= file.name,
    uploadImages.previewVisible= true,
    this.props.dispatch(setArtistEditUploadImagesState({...this.props.uploadImages}));
  }

  uploadImagesUploadSuccess = (response) => {
    let fileList = response.data;
    this.props.uploadImages.fileList = fileList;
    this.props.dispatch(setArtistEditUploadImagesState({...this.props.uploadImages}));

    let file = fileList[0];
    if(file) {
      this.props.dispatch(setArtistEditState({artistAvatarUrl: file.url}));
    }
  }

  uploadImagesRemove = (data) => {
    let removedList = this.props.uploadImages.fileList.filter((v) => v.url != data.url).slice();
    this.props.uploadImages.fileList = removedList;
    this.props.dispatch(setArtistEditUploadImagesState({...this.props.uploadImages}));
  }

  submitEditArtist = () => {
    const {isUpdate, dispatch} = this.props;
    if(!isUpdate) {
      dispatch(setLoading(true))
      create({...this.props, active: true})
        .then((response) => {
          if(response.success) {
            notification.open({
              type: 'success',
              message: 'Tạo mới nghệ sĩ',
              description:
                'Thành công',
            })
            dispatch(setLoading(false))
            dispatch(setArtistListState({isFirstLoadTable: true}))
            dispatch(push('/artist'))
          }else {
            notification.open({
              type: 'error',
              message: 'Tạo mới nghệ sĩ',
              description:
                `Thất bại: ${response.message}`,
            })
            dispatch(setLoading(false))
          }
        })
        .catch((error) => {
          notification.open({
            type: 'error',
            message: 'Hệ thống',
            description:
              `Có lỗi xảy ra: ${error.message}`,
          })
          dispatch(setLoading(false))
        });
    }
  }

  render() {
      const {uploadImages, isUpdate, artistCode, artistName} = this.props;
      return (
          <div className="card">
            <div className="card-header">
              <div className="utils__title">
                <strong>Biễu mẫu</strong>
              </div>
            </div>
            <div className="card-body">
              <h4 className="text-black mb-3">
                <strong>Thông tin chính</strong>
              </h4>
              <div className="row">
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="artist-edit-code">Mã</label>
                        <Input id="artist-edit-code" name="artistCode" onChange={this.onInputChange} value={artistCode} placeholder="Mã nghệ sĩ" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="artist-edit-name">Tên</label>
                        <Input id="artist-edit-name" name="artistName" onChange={this.onInputChange} value={artistName} placeholder="Tên nghệ sĩ" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-actions">
                        <Button type="primary" className="mr-2" onClick={this.submitEditArtist} >
                          {isUpdate ? 'Lưu lại':'Tạo mới'}
                        </Button>
                        <Button type="default">Hủy</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <label htmlFor="drg-images">Ảnh đại diện</label>
                  <UploadPictures id="drg-images" 
                    {...uploadImages}
                    handleChange={this.uploadImagesChange}
                    handlePreview={this.uploadImagesPreview}
                    handleCancel={this.uploadImagesCancel}
                    handleRemove={this.uploadImagesRemove}
                    handleUploadSuccess={this.uploadImagesUploadSuccess}
                    />
                </div>
              </div>
            </div>
          </div>
      );
  }

}

export default ArtistEdit
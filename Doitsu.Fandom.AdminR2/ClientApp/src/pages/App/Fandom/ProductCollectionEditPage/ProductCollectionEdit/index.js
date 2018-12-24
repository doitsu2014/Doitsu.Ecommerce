import React from 'react'
import {connect} from 'react-redux'
import { Input, TreeSelect, Select, Button, Upload, Icon, message } from 'antd'
import UploadPictures from 'components/DoitsuComponents/UploadPictures'
import './style.scss'
import { setProductCollectionEditUploadImagesState, setProductCollectionEditState, setProductCollectionListState, setProductListState } from 'ducks/fandom'
import { create, update, readProductCollection } from 'apis/services/productCollectionService.js'
import { readArtist } from 'apis/services/artistService.js'
import { setLoading } from 'ducks/app'
import { notification } from 'antd'
import { push } from 'react-router-redux'
import ProductList from '../ProductList'
import {productCollectionTypeEnum} from 'enum.js'
import { is } from 'immutable';
const Option = Select.Option
const { TextArea } = Input


const mapStateToProps = (state, props) => ({
    ...state.fandom.productCollectionEditState,
    ...state.routing
})

@connect(mapStateToProps)
class ProductCollectionEdit extends React.Component {

  componentWillMount() {
    const { isUpdate, isReloadInformation, id, location, dispatch, productCollectionType } = this.props;
    // handle edit, create state
    (async () => {
      if(isUpdate && location.pathname === '/album/edit' && isReloadInformation && id) {
        await this.reloadInformation(id);
      } 
      // fill data of list artist
      let listArtist = await readArtist();
      let listArtistData = listArtist.data;
      
      // update list data to ddl artist
      dispatch(setProductCollectionEditState({
        listArtist: listArtistData,
      }));
      dispatch(setProductListState({ isFirstLoadTable: true }))
    })()

  }

  reloadInformation = (id) => {
    const { dispatch } = this.props;
    readProductCollection({ id: id, limit: 1 }).then((data) => {
      const listProductCollection = data.data;
      let productCollection = listProductCollection && listProductCollection.length > 0 && listProductCollection[0];
      var isArtistType = productCollectionTypeEnum.find(e=>e.name === "Cho nghệ sĩ").value === productCollection.type;
      dispatch(setProductCollectionEditState({
        isReloadInformation: false,
        isArtistType: isArtistType,
        id: productCollection.id,
        productCollectionName: productCollection.name,
        productCollectionSlug: productCollection.slug,
        productCollectionThumbnailUrl: productCollection.thumbnailURL,
        productCollectionDescription: productCollection.description,
        productCollectionArtistId: productCollection.artistID,
        productCollectionType: productCollection.type,
        uploadImages: {
          fileList: [{
            uid: productCollection.thumbnailURL || "doitsuid" ,
            url: productCollection.thumbnailURL,
            status: "done"
         }]
        }
      }));
      
    })
  }

  // Event Change
  onInputChange = e => {
    this.props.dispatch(setProductCollectionEditState({ [e.target.name]:e.target.value }));
  }
  onSelectArtistIdChange = (data) => {
    this.props.dispatch(setProductCollectionEditState({ productCollectionArtistId: data }));
  }
  onSelectTypeChange = (data) => {
    var isArtistType = productCollectionTypeEnum.find(e=>e.name === "Cho nghệ sĩ").value === data;
    this.props.dispatch(setProductCollectionEditState({ productCollectionType: data, isArtistType: isArtistType, productCollectionArtistId: isArtistType ? 1 : null }));
  }
  uploadImagesChange = (info) => {
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

  uploadImagesCancel = () => {
    let {uploadImages }= this.props; 
    uploadImages.previewVisible= false;
    this.props.dispatch(setProductCollectionEditUploadImagesState({...this.props.uploadImages}));

  }

  uploadImagesPreview = file => {
    let {uploadImages }= this.props;
    uploadImages.previewImage= file.url || file.thumbUrl,
    uploadImages.previewImageName= file.name,
    uploadImages.previewVisible= true,
    this.props.dispatch(setProductCollectionEditUploadImagesState({...this.props.uploadImages}));
  }

  uploadImagesUploadSuccess = (response) => {
    let fileList = response.data;
    this.props.uploadImages.fileList = fileList;
    this.props.dispatch(setProductCollectionEditUploadImagesState({...this.props.uploadImages}));

    let file = fileList[0];
    if(file) {
      this.props.dispatch(setProductCollectionEditState({productCollectionThumbnailUrl: file.url}));
    }
  }

  uploadImagesRemove = (data) => {
    let removedList = this.props.uploadImages.fileList.filter((v) => v.url != data.url).slice();
    this.props.uploadImages.fileList = removedList;
    this.props.dispatch(setProductCollectionEditUploadImagesState({...this.props.uploadImages}));
  }
  
  submitEditProductCollection = () => {
    const {isUpdate, dispatch} = this.props;
    dispatch(setLoading(true))
    if(!isUpdate) {
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
            dispatch(setProductCollectionListState({isFirstLoadTable: true}))
            dispatch(push('/album'))
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
    } else {
      update({...this.props, active: true})
        .then((response) => {
          if(response.success) {
            notification.open({
              type: 'success',
              message: 'chỉnh sửa nghệ sĩ',
              description:
                'Thành công',
            })
            dispatch(setLoading(false))
            dispatch(setProductCollectionListState({isFirstLoadTable: true}))
            dispatch(push('/album'))
          }else {
            notification.open({
              type: 'error',
              message: 'Chỉnh sửa nghệ sĩ',
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
    const { uploadImages, 
      isUpdate, 
      isArtistType,
      listArtist, 
      id, 
      productCollectionSlug, 
      productCollectionName, 
      productCollectionArtistId,
      productCollectionDescription,
      productCollectionType,
      dispatch,
      location
    } = this.props;
    
    if(isUpdate && location.pathname === '/album/create' ) {
      dispatch(setProductCollectionEditState({
        isReloadInformation: false,
        isUpdate: false,
        isArtistType: true,
        id: -1,
        productCollectionSlug: '',
        productCollectionName: '',
        productCollectionAvatarUrl: '',
        productCollectionDescription: '',
        productCollectionArtistId: 1,
        productCollectionType: 1,
        uploadImages: {}
      }));
    }

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
                      <label htmlFor="productCollection-edit-name">Tên album</label>
                      <Input id="productCollection-edit-name" name="productCollectionName" onChange={this.onInputChange} value={productCollectionName} placeholder="Tên album" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="productCollection-edit-slug">Từ khóa URL</label>
                      <Input id="productCollection-edit-slug" name="productCollectionSlug" onChange={this.onInputChange} value={productCollectionSlug} placeholder="Mẫu ygfl-tv-show-01" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="productCollection-edit-type">Chọn loại album</label>
                      <Select
                          id="productCollection-edit-type"
                          name="productCollectionType"
                          showSearch
                          style={{ width: '100%' }}
                          placeholder="Nhập loại album"
                          value={productCollectionType}
                          onChange={this.onSelectTypeChange}
                        >
                          {productCollectionTypeEnum.map(element =><Option key={element.name} value={element.value}>{element.name}</Option>)}
                        </Select>
                    </div>
                  </div>
                  <div className="col-lg-12" style={{display: isArtistType ? "block" : "none"}}>
                    <div className="form-group">
                      <label htmlFor="productCollection-edit-artist">Chọn nghệ sĩ</label>
                      <Select
                          id="productCollection-edit-artist"
                          name="productCollectionArtistId"
                          showSearch
                          style={{ width: '100%' }}
                          placeholder="Nhập tên nghệ sĩ vào đây"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          value={isArtistType ? productCollectionArtistId : null}
                          onChange={this.onSelectArtistIdChange}
                        >
                          {listArtist.map(element =><Option key={element.id} value={element.id}>{element.name}</Option>)}
                        </Select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="product-edit-description">Mô tả</label>
                      <TextArea rows={3} id="product-edit-description" value={productCollectionDescription} onChange={this.onInputChange} name="productCollectionDescription" placeholder="Nhập mô tả về album này"/>
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
              <div className="col-lg-12">
                  <div className="form-actions actions-border-bottom">
                    <Input id="productCollection-id" type="hidden" value={id} />
                    <Button type="primary" className="mr-2" onClick={this.submitEditProductCollection} >
                      {isUpdate ? 'Lưu lại':'Tạo mới'}
                    </Button>
                    {!isUpdate ? <Button type="default">Hủy</Button> : ""}
                  </div>
              </div> 
            </div>
            {/* Area to load table of product */}
            <div style={{display: isUpdate ? 'block' : 'none'}}>
              <h4 className="text-black mb-3">
                <strong>Thông tin sản phẩm thuộc album này</strong>
              </h4>
              <div className="row">
                <div className="col-lg-12">
                  <ProductList/>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ProductCollectionEdit
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Table, Icon, Input, Button, Modal, Checkbox } from 'antd'
import { readProduct, deleteProduct, create, update } from 'apis/services/productService'
import { setProductListState, setProductEditState, setProductEditUploadImagesState } from 'ducks/fandom'
import { setLoading } from 'ducks/app'
import UploadPictures from 'components/DoitsuComponents/UploadPictures'
import { notification } from 'antd'
import './style.scss'
const mapStateToProps = (state, props) => ({
    ...state.fandom.productListState,
    productCollectionFields: {...state.fandom.productCollectionEditState},
})

@connect(mapStateToProps)
class ProductList extends React.Component {
    onInputChange = e => {
        this.props.dispatch(setProductListState({ searchText: e.target.value }));
    }

    onSearch = () => {
        const { searchText, dispatch } = this.props;
        readProduct({name: searchText}).then((data) => {
            let listProduct = data.data;

            dispatch(setProductListState({
                data: listProduct,
                tableData: listProduct, 
                filterDropdownVisible: false,
                filtered: !!searchText
            }));
        })
    }
    
    handleTableChange = (pagination, filters, sorter) => {
        if (this.props.pager) {
            const pager = { ...this.props.pager }
            if (pager.pageSize !== pagination.pageSize) {
                this.pageSize = pagination.pageSize
                pager.pageSize = pagination.pageSize
                pager.current = 1
            } else {
                pager.current = pagination.current
            }
            this.props.dispatch({
                pager: pager,
            })
        }
    }
    
    handleVisibleAVModal = (e) => {
        const { dispatch, productCollectionFields } = this.props;
        dispatch(setProductListState({
            addVideoModalVisible: true,
            isUpdate: e.target.getAttribute("data-is-update")
        }));

        if(e.target.getAttribute("data-is-update")) {
            readProduct({limit: 1, productCollectionId: productCollectionFields.id, id: e.target.getAttribute("data-product-id")}).then((data) => {
                // prepare product to update
                let listProduct = data.data;
                let firstProduct = listProduct[0];
                // set state to refill component
                dispatch(setProductEditState({
                    productId: firstProduct.id,
                    productName: firstProduct.name,
                    productCode: firstProduct.code,
                    productResourceURL: firstProduct.resourceURL,
                    productSlug: firstProduct.slug,
                    productIsAuthorized: firstProduct.isAuthorized,
                }));
            })
        }

    }
    handleCancelAVModal = (e) => {
        const { dispatch } = this.props;
        dispatch(setProductListState({
            addVideoModalVisible: false
        }));
    }
    handleProductEditInputChange = (e) => {
        this.props.dispatch(setProductEditState({[e.target.name]:e.target.value}));
    }
    handleProductEditCheckBoxChange = e => {
        this.props.dispatch(setProductEditState({[e.target.name]:e.target.checked}));
    }
    handleAVModalOk = (e) => {
        const { dispatch, productEditState, productCollectionFields, isUpdate} = this.props;
        if(isUpdate) {
            dispatch(setLoading(true))
            update({...productEditState, active: true, artistId: productCollectionFields.productCollectionArtistId, productCollectionId: productCollectionFields.id })
                .then((response) => {
                    if(response.success) {
                        notification.open({
                        type: 'success',
                        message: 'Chỉnh sửa video',
                        description:
                            'Thành công',
                        });
                        dispatch(setLoading(false));
                        dispatch(setProductListState({isFirstLoadTable: true}));
                        this.handleCancelAVModal();
                    }else {
                        notification.open({
                        type: 'error',
                        message: 'Chỉnh sửa video',
                        description:
                            `Thất bại: ${response.message}`,
                        })
                        dispatch(setLoading(false));
                    }
                })
                .catch((error) => {
                    dispatch(setLoading(true))
                    notification.open({
                        type: 'error',
                        message: 'Hệ thống',
                        description:
                        `Có lỗi xảy ra: ${error.message}`,
                        })
                    dispatch(setLoading(false))
                });
        } else {
            dispatch(setLoading(true))
            create({...productEditState, active: true, artistId: productCollectionFields.productCollectionArtistId, productCollectionId: productCollectionFields.id })
                .then((response) => {
                    if(response.success) {
                        notification.open({
                        type: 'success',
                        message: 'Tạo mới video',
                        description:
                            'Thành công',
                        })
                        dispatch(setLoading(false))
                        dispatch(setProductListState({isFirstLoadTable: true}))
                        this.handleCancelAVModal()
                    }else {
                        notification.open({
                        type: 'error',
                        message: 'Tạo mới video',
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

    handleRemoveList = (e) => {
        const {dispatch} = this.props;
        dispatch(setLoading(true));
        deleteProduct({id: e.target.getAttribute('data-product-id')})
            .then((response) => {
                if(response.success) {
                    notification.open({
                      type: 'success',
                      message: 'Xóa video',
                      description:
                        'Thành công',
                    })
                    dispatch(setLoading(false))
                    dispatch(setProductListState({isFirstLoadTable: true}))
                } else {
                    notification.open({
                      type: 'error',
                      message: 'Xóa video',
                      description:
                        `Thất bại: ${response.message}`,
                    })
                    dispatch(setLoading(false))
                }
            })
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
        let {uploadImages }= this.props.productEditState; 
        uploadImages.previewVisible= false;
        this.props.dispatch(setProductEditUploadImagesState({...this.props.productEditState.uploadImages}));
    
      }
    
      uploadImagesPreview = file => {
        let {uploadImages }= this.props.productEditState;
        uploadImages.previewImage= file.url || file.thumbUrl,
        uploadImages.previewImageName= file.name,
        uploadImages.previewVisible= true,
        this.props.dispatch(setProductEditUploadImagesState({...this.props.productEditState.uploadImages}));
      }
    
      uploadImagesUploadSuccess = (response) => {
        let fileList = response.data;
        this.props.productEditState.uploadImages.fileList = fileList;
        this.props.dispatch(setProductEditUploadImagesState({...this.props.productEditState.uploadImages}));
        let file = fileList[0];
        if(file) {
          this.props.dispatch(setProductEditState({productThumbnailURL: file.url}));
        }
      }
    
      uploadImagesRemove = (data) => {
        let removedList = this.props.productEditState.uploadImages.fileList.filter((v) => v.url != data.url).slice();
        this.props.productEditState.uploadImages.fileList = removedList;
        this.props.dispatch(setProductEditUploadImagesState({...this.props.productEditState.uploadImages}));
      }
      

    render() {
        let { pager, data, isFirstLoadTable, dispatch, addVideoModalVisible, productEditState, productCollectionFields } = this.props;
        if(isFirstLoadTable) {
            readProduct({ collectionId: productCollectionFields.id }).then((data) => {
                let listProduct = data.data;
                dispatch(setProductListState({data: listProduct, tableData: listProduct, isFirstLoadTable: false}));
            })
        }
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                render: text => (
                    <a className="utils__link--underlined" href="javascript: void(0);">
                        {`#${text}`}
                    </a>
                ),
            },
            {
                title: 'Tên',
                dataIndex: 'name',
                key: 'name',
                render: text => (
                    <a className="utils__link--underlined" href="javascript: void(0);">
                        {text}
                    </a>
                )
            },
            {
                title: 'Tên ngắn',
                dataIndex: 'code',
                key: 'code',
                render: text => (
                    <a className="utils__link--underlined"  href="javascript: void(0);">
                        {text}
                    </a>
                ),
            },
            {
                title: 'Từ khóa seo',
                dataIndex: 'slug',
                key: 'slug',
                render: text => (
                    <a className="utils__link--underlined"  href="javascript: void(0);">
                        {text}
                    </a>
                ),
            },
            {
                title: 'Đường dẫn video',
                dataIndex: 'resourceURL',
                key: 'resourceURL',
                render: text => (
                    <a className="utils__link--underlined"  href="javascript: void(0);">
                        {text}
                    </a>
                ),
            },
            {
                title: 'Phân quyền',
                dataIndex: 'isAuthorized',
                key: 'isAuthorized',
                render: checked => (
                    <p className="product-list__checkedtype">
                        {checked ? <Icon style={{color: "green"}} type="check"/> : <Icon style={{color: "red"}} type="close"/>}
                    </p>
                ),
            },
            {
                title: 'Tùy chọn',
                dataIndex: 'id',
                key: 'editControls',
                render: id => (
                    <div className="productList__edit-datatable-area">
                        <Button type="primary" data-product-id={id} data-is-update={true} onClick={this.handleVisibleAVModal}>
                            Chỉnh sửa
                        </Button>
                        <Button type="danger" data-product-id={id} onClick={this.handleRemoveList}>
                            Xóa
                        </Button>
                    </div>
                ),
            }
        ];
        return (
            <div className="card">
                <div className="card-header">
                    <div className="utils__title">
                        <strong>Danh sách video</strong>
                        <div className="float-right">
                            <Button type="primary" className="mr-2" onClick={this.handleVisibleAVModal} >
                                Thêm video <Icon type="plus-circle"/>
                            </Button>
                            <Modal
                                id="add-video-modal"
                                visible={addVideoModalVisible}
                                title="Thêm mới video"
                                centered
                                onOk={this.handleAVModalOk}
                                onCancel={this.handleCancelAVModal}
                                footer={[
                                    <Button key="cancel" type="danger" onClick={this.handleCancelAVModal}>
                                        Hủy
                                    </Button>,
                                    <Button key="submit" type="primary" onClick={this.handleAVModalOk}>
                                        Xác nhận
                                    </Button>
                                ]}
                            >
                                <div className="form-group">
                                    <label htmlFor="product-edit-name">Tên video</label>
                                    <Input name="productId" value={productEditState.productId} type="hidden" />
                                    <Input name="productName" onChange={this.handleProductEditInputChange} value={productEditState.productName} placeholder="Tên video" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="product-edit-shortName">Tên rút gọn</label>
                                    <Input name="productCode" onChange={this.handleProductEditInputChange} value={productEditState.productCode} placeholder="Tên rút gọn" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="product-edit-slug">Từ khóa seo đường dẫn</label>
                                    <Input name="productSlug" onChange={this.handleProductEditInputChange} value={productEditState.productSlug} placeholder="ygfl-tv-aaa" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="product-edit-resourceURL">Video URL</label>
                                    <Input name="productResourceURL" onChange={this.handleProductEditInputChange} value={productEditState.productResourceURL} placeholder="Video URL" />
                                </div>
                                <div className="form-group">
                                    <Checkbox name="productIsAuthorized" onChange={this.handleProductEditCheckBoxChange} checked={productEditState.productIsAuthorized}>
                                    Có phân quyền không?
                                    </Checkbox>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <Table 
                        scroll={{ x: 800 }} 
                        columns={columns}
                        dataSource={data}
                        pagination={pager}
                        onChange={this.handleTableChange}
                        rowKey="id"
                     />
                </div>
            </div>
        );
    }
}
export default ProductList
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Table, Icon, Input, Button } from 'antd'
import {readProductCollection, deleteProductCollection} from 'apis/services/productCollectionService'
import { setProductCollectionListState, setProductCollectionEditState } from 'ducks/fandom'
import { setLoading } from 'ducks/app'
import { notification } from 'antd'
import './style.scss'
const mapStateToProps = (state, props) => ({
    ...state.fandom.productCollectionListState
})

@connect(mapStateToProps)
class ProductCollectionList extends React.Component {
    onInputChange = e => {
        this.props.dispatch(setProductCollectionListState({ searchText: e.target.value }));
    }

    onSearch = () => {
        const { searchText, dispatch } = this.props;
        readProductCollection({name: searchText}).then((data) => {
            let listProductCollection = data.data;

            dispatch(setProductCollectionListState({
                data: listProductCollection,
                tableData: listProductCollection, 
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
    
    handleRemoveList = (e) => {
        const {dispatch} = this.props;
        dispatch(setLoading(true));
        deleteProductCollection({id: e.target.getAttribute('data-product-collection-id')})
            .then((response) => {
                if(response.success) {
                    notification.open({
                      type: 'success',
                      message: 'Xóa album',
                      description:
                        'Thành công',
                    })
                    dispatch(setLoading(false))
                    dispatch(setProductCollectionListState({isFirstLoadTable: true}))
                } else {
                    notification.open({
                      type: 'error',
                      message: 'Xóa album',
                      description:
                        `Thất bại: ${response.message}`,
                    })
                    dispatch(setLoading(false))
                }
            })
    }

    handleUpdateProductCollection = (e) => {
        const { dispatch } = this.props;
        dispatch(setProductCollectionEditState({ 
            isReloadInformation: true, 
            isUpdate: true,
            id: e.target.getAttribute('data-product-collection-id') 
        }))
        dispatch(push('/album/edit'))
    }

    render() {
        let { pager, data, isFirstLoadTable, dispatch} = this.props;
        if(isFirstLoadTable) {
            readProductCollection().then((data) => {
                let listProductCollection = data.data;
                dispatch(setProductCollectionListState({data: listProductCollection, tableData: listProductCollection, isFirstLoadTable: false}));
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
                sorter: (a,b) => a.id - b.id
            },
            {
                title: 'Tên',
                dataIndex: 'name',
                key: 'name',
                render: text => (
                    <a className="utils__link--underlined" href="javascript: void(0);">
                        {text}
                    </a>
                ),
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={ele => (this.searchInput = ele)}
                            placeholder="Tìm theo tên"
                            value={this.props.searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                        />
                        <Button type="primary" onClick={this.onSearch}>
                            Tìm kiếm
                        </Button>
                    </div>
                ),
                filterIcon: (
                    <Icon type="search" style={{ color: this.props.filtered ? '#108ee9' : '#aaa' }} />
                ),
                filterDropdownVisible: this.props.filterDropdownVisible,
                onFilterDropdownVisibleChange: visible => {
                    this.props.dispatch(setProductCollectionListState({
                            filterDropdownVisible: visible,
                        }
                    ))
                    this.searchInput && this.searchInput.focus();
                },
            },
            {
                title: 'Từ khóa URL',
                dataIndex: 'slug',
                key: 'slug',
                render: text => (
                    <a className="utils__link--underlined"  href="javascript: void(0);">
                        {text}
                    </a>
                ),
            },
            {
                title: 'Ảnh thumbnail',
                dataIndex: 'thumbnailURL',
                key: 'thumbnailURL',
                render: text => (
                    <a className="utils__link--underlined" href="javascript: void(0);">
                        <div className="product-collection-list__table-thumbnail">
                            <img src={text} alt="" width="200" />
                        </div>
                    </a>
                ),
            },
            {
                title: 'Tùy chọn',
                dataIndex: 'id',
                key: 'editControls',
                render: id => (
                    <div className="product-collection-list__edit-datatable-area">
                        <Button type="primary" data-product-collection-id={id} onClick={this.handleUpdateProductCollection}>
                            Chỉnh sửa
                        </Button>
                        <Button type="danger" data-product-collection-id={id} onClick={this.handleRemoveList}>
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
                        <strong>Danh sách nghệ sĩ</strong>
                    </div>
                </div>
                <div className="card-body">
                    <Table 
                        scroll={{ x: 1200 }} 
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
export default ProductCollectionList
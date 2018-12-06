import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Table, Icon, Input, Button } from 'antd'
import tableData from './data.json'
import {readArtist, deleteArtist} from 'apis/services/artistService'
import { setArtistListState, setArtistEditState } from 'ducks/fandom'
import { setLoading } from 'ducks/app'
import { notification } from 'antd'


import './style.scss'


const mapStateToProps = (state, props) => ({
    ...state.fandom.artistListState
})

@connect(mapStateToProps)
class ArtistList extends React.Component {
    onInputChange = e => {
        this.props.dispatch(setArtistListState({ searchText: e.target.value }));
    }

    onSearch = () => {
        const { searchText, dispatch } = this.props;
        readArtist({name: searchText}).then((data) => {
            let listArtist = data.data;

            dispatch(setArtistListState({
                data: listArtist,
                tableData: listArtist, 
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
        deleteArtist({id: e.target.getAttribute('data-artist-id')})
            .then((response) => {
                if(response.success) {
                    notification.open({
                      type: 'success',
                      message: 'Xóa nghệ sĩ',
                      description:
                        'Thành công',
                    })
                    dispatch(setLoading(false))
                    dispatch(setArtistListState({isFirstLoadTable: true}))
                } else {
                    notification.open({
                      type: 'error',
                      message: 'Xóa nghệ sĩ',
                      description:
                        `Thất bại: ${response.message}`,
                    })
                    dispatch(setLoading(false))
                }
            })
    }

    handleUpdateArtist = (e) => {
        const { dispatch } = this.props;
        dispatch(setArtistEditState({ 
            isReloadInformation: true, 
            isUpdate: true, 
            id: e.target.getAttribute('data-artist-id') 
        }))
        dispatch(push('/artist/edit'))
    }

    render() {
        let { pager, data, isFirstLoadTable, dispatch} = this.props;
        if(isFirstLoadTable) {
            readArtist().then((data) => {
                let listArtist = data.data;
                dispatch(setArtistListState({data: listArtist, tableData: listArtist, isFirstLoadTable: false}));
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
                title: 'Mã',
                dataIndex: 'code',
                key: 'code',
                render: text => (
                    <a className="utils__link--underlined"  href="javascript: void(0);">
                        {text}
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
                    this.props.dispatch(setArtistListState({
                            filterDropdownVisible: visible,
                        }
                    ))
                    this.searchInput && this.searchInput.focus();
                },
            },
            {
                title: 'Ảnh đại diện',
                dataIndex: 'avatarUrl',
                key: 'avatarUrl',
                render: text => (
                    <a className="utils__link--underlined" href="javascript: void(0);">
                        <div className="artistList__table-thumbnail">
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
                    <div className="artistList__edit-datatable-area">
                        <Button type="primary" data-artist-id={id} onClick={this.handleUpdateArtist}>
                            Chỉnh sửa
                        </Button>
                        <Button type="danger" data-artist-id={id} onClick={this.handleRemoveList}>
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
export default ArtistList
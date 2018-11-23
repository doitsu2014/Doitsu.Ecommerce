import React from 'react'
import { Table, Icon, Input, Button } from 'antd'
import tableData from './data.json'

const defaultPagination = {
    pageSizeOptions: ['10', '20'],
    showSizeChanger: true,
    current: 1,
    size: 'small',
    showTotal: (total) => `Total ${total} items`,
    total:0
}

class ArtistList extends React.Component {
    state = {
        tableData: tableData.data,
        data: tableData.data,
        pager: { ...defaultPagination },
        filterDropdownVisible: false,
        searchText: '',
        filtered: false
    }

    onInputChange = e => {
        this.setState({ searchText: e.target.value })
    }

    onSearch = () => {
        const { searchText, tableData } = this.state
        let reg = new RegExp(searchText, 'gi')
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: tableData.map(record => {
                let match = record.name.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    name: (
                        <span>
                        {
                            record.name.split(reg).map(
                                (text, i) => i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text,
                            )
                        }
                        </span>
                    ),
                }
            })
            .filter(record => !!record),
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        if (this.state.pager) {
          const pager = { ...this.state.pager }
          if (pager.pageSize !== pagination.pageSize) {
            this.pageSize = pagination.pageSize
            pager.pageSize = pagination.pageSize
            pager.current = 1
          } else {
            pager.current = pagination.current
          }
          this.setState({
            pager: pager,
          })
        }
      }

    render() {
        let { pager, data } = this.state;
        
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
                    <a className="utils__link--underlined" href="javascript: void(0);">
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
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                        />
                        <Button type="primary" onClick={this.onSearch}>
                            Tìm kiếm
                        </Button>
                    </div>
                ),
                filterIcon: (
                    <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />
                ),
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: visible => {
                    this.setState(
                        {
                            filterDropdownVisible: visible,
                        },
                        () => this.searchInput && this.searchInput.focus(),
                    )
                },
            },
            {
                title: 'Ảnh đại diện',
                dataIndex: 'avatarUrl',
                key: 'avatarUrl',
                render: text => (
                    <a className="utils__link--underlined" href="javascript: void(0);">
                        <img src={text} alt="" />
                    </a>
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
                     />
                </div>
            </div>
        );
    }

}

export default ArtistList
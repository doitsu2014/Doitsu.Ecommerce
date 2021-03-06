import React from 'react'
import { Table, Icon, Input, Button, notification } from 'antd'
import { read, deleteB } from 'services/blog'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const defaultPagination = {
  pageSizeOptions: ['10', '20'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}

@connect(({ blogState }) => ({ blogState }))
class BlogList extends React.Component {
  state = {
    data: [],
    pagination: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    loading: false,
  }

  componentDidMount() {
    this.resetListBlog();
  }

  resetListBlog = () => {
    this.fetch({
      currentPage: 1,
      limit: 10 
    })
  }
  
  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }

  onSearch = async () => {
    const { searchText } = this.state
    const response = await read({ name: searchText })
    const listBlog = response.data
    this.setState({
      data: listBlog,
      filterDropdownVisible: false,
      filtered: !!searchText,
    })
  }

  handleTableChange = (curPagi, curFilters, curSorter) => {
    const { pagination } = this.state;
    pagination.current = curPagi.current;
    this.setState({
      pagination
    });
    this.fetch({
      limit: curPagi.pageSize,
      currentPage: curPagi.current,
      sortField: curSorter.field,
      sortOrder: curSorter.order,
      ...curFilters,
    });
  }

  fetch = async (params = {}) => {
    this.setState({ loading: true });
    const response = await read(params)
    const { pagination } = this.state;
    pagination.total = response.totalFullData;
    this.setState({
      data: response.data,
      loading: false,
      ...pagination
    })
  }

  handleRemoveList = async e => {
    try {
      this.setState({ loading: true })
      const blogId = e.target.getAttribute('data-blog-id')
      const response = await deleteB({ id: blogId })
      if (response.success) {
        notification.open({
          type: 'success',
          message: 'Remove blog',
          description: 'Successfully',
        })
        this.resetListBlog();
      } else {
        notification.open({
          type: 'success',
          message: 'Remove blog',
          description: 'Fail',
        })
      }
      this.setState({ loading: false })
    } catch (exception) {
      notification.open({
        type: 'error',
        message: 'Remove blog',
        description: 'Fail',
      })
      this.setState({ loading: false })
    }
  }

  handleUpdateBlog = e => {
    const { dispatch } = this.props
    const { blogId } = e.target.dataset
    dispatch({
      type: 'blog/SET_STATE',
      payload: {
        trackingId: blogId,
      },
    })
    dispatch(push('/blogs/update'))
  }

  render() {
    const { pagination, data, filterDropdownVisible, searchText, filtered, loading } = this.state
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
        curSorter: (a, b) => a.id - b.id,
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {text}
          </a>
        ),
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => {
                this.searchInput = ele
              }}
              placeholder="Find by title"
              value={searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>
              Tìm kiếm
            </Button>
          </div>
        ),
        filterIcon: <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
        filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState({
            filterDropdownVisible: visible,
          })
          this.searchInput.focus()
        },
      },
      {
        title: 'SEO Name',
        dataIndex: 'slug',
        key: 'slug',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {text}
          </a>
        ),
      },
      {
        title: 'Thumb',
        dataIndex: 'thumbnailURL',
        key: 'thumbnailURL',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            <div className="blog-list__table-thumbnail">
              <img src={text} alt="" width="200" />
            </div>
          </a>
        ),
      },
      {
        title: 'Tools',
        dataIndex: 'id',
        key: 'editControls',
        render: id => (
          <div className="blog-list__edit-datatable-area">
            <Button type="primary" data-blog-id={id} onClick={this.handleUpdateBlog}>
              Chỉnh sửa
            </Button>
            <Button type="danger" data-blog-id={id} onClick={this.handleRemoveList}>
              Xóa
            </Button>
          </div>
        ),
      },
    ]
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Blog list</strong>
          </div>
        </div>
        <div className="card-body">
          <Table
            scroll={{ x: 1200 }}
            columns={columns}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
            rowKey="id"
          />
        </div>
      </div>
    )
  }
}

export default BlogList

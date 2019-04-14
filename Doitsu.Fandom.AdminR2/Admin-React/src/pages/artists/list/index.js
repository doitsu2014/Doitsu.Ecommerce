import React from 'react'
import { Table, Icon, Input, Button, notification } from 'antd'
import { readArtist, deleteArtist } from 'services/artist'
import { Helmet } from 'react-helmet'
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

@connect(({ artist }) => ({ artist }))
class ArtistList extends React.Component {
  state = {
    data: [],
    pager: { ...defaultPagination },
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    loading: false,
  }

  async componentDidMount() {
    this.loadArtist()
  }

  loadArtist = async () => {
    this.setState({ loading: true })
    const response = await readArtist()
    this.setState({
      data: response.data,
      loading: false,
    })
  }

  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }

  onSearch = () => {
    const { searchText, tableData } = this.state
    const reg = new RegExp(searchText, 'gi')
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: tableData
        .map(record => {
          const match = record.name.match(reg)
          if (!match) {
            return null
          }
          return {
            ...record,
            name: (
              <span>
                {record.name
                  .split(reg)
                  .map((text, i) =>
                    i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text,
                  )}
              </span>
            ),
          }
        })
        .filter(record => !!record),
    })
  }

  linkSearchInput = node => {
    this.searchInput = node
  }

  handleTableChange = pagination => {
    const { pager } = this.state
    if (pager) {
      if (pager.pageSize !== pagination.pageSize) {
        this.pageSize = pagination.pageSize
        pager.pageSize = pagination.pageSize
        pager.current = 1
      } else {
        pager.current = pagination.current
      }
      this.setState({
        pager,
      })
    }
  }

  handleRemoveList = async e => {
    this.setState({ loading: true })
    const response = await deleteArtist({ id: e.target.getAttribute('data-artist-id') })
    if (response && response.success) {
      notification.open({
        type: 'success',
        message: 'Remove artist',
        description: 'Successfully',
      })
      await this.loadArtist()
      this.setState({ loading: false })
    } else {
      notification.open({
        type: 'error',
        message: 'Remove artist',
        description: `Fail`,
      })
      this.setState({ loading: false })
    }
  }

  handleUpdateArtist = e => {
    const { dispatch } = this.props
    const { artistId } = e.target.dataset
    dispatch({
      type: 'artist/SET_STATE',
      payload: {
        trackingId: artistId,
      },
    })
    dispatch(push('/artists/update'))
  }

  render() {
    const { data, filtered, filterDropdownVisible, searchText, loading } = this.state
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
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {text}
          </a>
        ),
      },
      {
        title: 'Name',
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
              ref={this.linkSearchInput}
              placeholder="Search by name"
              value={searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
              loading={loading.toString()}
            />
            <Button type="primary" onClick={this.onSearch}>
              Search
            </Button>
          </div>
        ),
        filterIcon: <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
        filterDropdownVisible,
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
        title: 'Artist Avartar',
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
        title: 'Custom',
        dataIndex: 'id',
        key: 'editControls',
        render: id => (
          <div className="artistList__edit-datatable-area">
            <Button type="primary" data-artist-id={id} onClick={this.handleUpdateArtist}>
              Edit
            </Button>
            <Button type="danger" data-artist-id={id} onClick={this.handleRemoveList}>
              Remove
            </Button>
          </div>
        ),
      },
    ]
    return (
      <div>
        <Helmet title="Artist List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>List artist</strong>
            </div>
          </div>
          <div className="card-body">
            <Table
              className="utils__scrollTable"
              scroll={{ x: '100%' }}
              columns={columns}
              dataSource={data}
              loading={loading}
              rowKey="id"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ArtistList

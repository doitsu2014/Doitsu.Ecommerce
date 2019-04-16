import React from 'react'
import { Table, Icon, Button, notification } from 'antd'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { read, updateIsSlider } from 'services/settings'

const defaultPagination = {
  pageSizeOptions: ['10', '20'],
  showSizeChanger: true,
  current: 1,
  size: 'small',
  showTotal: total => `Total ${total} items`,
  total: 0,
}

@connect(({ blogState }) => ({ blogState }))
class Settings extends React.Component {
  state = {
    data: [],
    pager: { ...defaultPagination },
    loading: false,
  }

  componentDidMount() {
    this.loadSettings()
  }

  loadSettings = async () => {
    this.setState({ loading: true })
    const response = await read()
    this.setState({
      data: response.data,
      loading: false,
    })
  }

  handleTableChange = pagination => {
    const { pager } = this.state
    if (pager) {
      const pagerData = { ...pager }
      if (pagerData.pageSize !== pagination.pageSize) {
        pagerData.pageSize = pagination.pageSize
        pagerData.current = 1
      } else {
        pagerData.current = pagination.current
      }
      this.setState({
        ...pagerData,
      })
    }
  }

  handleUpdateSlider = e => {
    const originalId = e.target.getAttribute('data-slider-id')
    const isSlider = e.target.getAttribute('data-is-slider')
    const updateData = {
      originalId,
      isSlider,
    }
    this.setState({ loading: true })
    updateIsSlider(updateData)
      .then(res => {
        if (res.success) {
          notification.success({
            message: 'Set on presentation mode successfully',
          })
        } else {
          notification.error({
            message: 'Set on presentation mode fail',
          })
        }
        this.setState({ loading: false })
      })
      .catch(error => {
        console.error(error)
        this.setState({ loading: false })
      })
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
    const { pager, data, loading } = this.state
    const columns = [
      {
        title: 'ID',
        dataIndex: 'originalId',
        key: 'originalId',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            {`#${text}`}
          </a>
        ),
        sorter: (a, b) => a.originalId > b.originalId,
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
      },
      {
        title: 'Thumb',
        dataIndex: 'thumbnailURL',
        key: 'thumbnailURL',
        render: text => (
          <a className="utils__link--underlined" href="javascript: void(0);">
            <div className="setting-slider__table-thumbnail">
              <img src={text} alt="" width="200" />
            </div>
          </a>
        ),
      },
      {
        title: 'Is Presentation',
        dataIndex: 'isSlider',
        key: 'isSlider',
        render: checked => (
          <p className="setting-slider__checkedtype">
            {checked ? (
              <Icon style={{ color: 'green' }} type="check" />
            ) : (
              <Icon style={{ color: 'red' }} type="close" />
            )}
          </p>
        ),
      },
      {
        title: 'Tools',
        dataIndex: 'originalId',
        key: 'editControls',
        render: (id, fullData) => (
          <div className="setting-slider__edit-datatable-area">
            {fullData.isSlider ? (
              <Button
                type="danger"
                data-slider-id={fullData.originalId}
                data-is-slider={false}
                onClick={this.handleUpdateSlider}
              >
                Stop presentation
              </Button>
            ) : (
              <Button
                type="primary"
                data-slider-id={fullData.originalId}
                data-is-slider
                onClick={this.handleUpdateSlider}
              >
                Start presentation
              </Button>
            )}
          </div>
        ),
      },
    ]
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Presentation Settings</strong>
          </div>
        </div>
        <div className="card-body">
          <Table
            scroll={{ x: 1200 }}
            columns={columns}
            dataSource={data}
            pagination={pager}
            loading={loading}
            onChange={this.handleTableChange}
            rowKey="id"
          />
        </div>
      </div>
    )
  }
}

export default Settings

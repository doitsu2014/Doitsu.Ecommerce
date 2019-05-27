import React from 'react'
import { Table, Icon, Button, notification } from 'antd'
import { connect } from 'react-redux'
import { updateIsSlider } from 'services/settings'
import { getListSlider, setState } from 'redux/settingSlider/actions'


const mapDispatchToProps = { getListSlider, setState }
const mapStateToProps = state => ({
  ...state.settingSliderState,
})
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Settings extends React.Component {
  state = {
    loading: false
  }

  componentDidMount() {
    const { listSettingSliderPagination } = this.props;
    this.props.getListSlider({
      limit: listSettingSliderPagination.pageSize,
      currentPage: listSettingSliderPagination.current
    });
  }

  loadSettings = (params = {}) => {
    this.props.getListSlider(params);
  }

  handleTableChange = (curPagi, curFilters, curSorter) => {
    // update state pagin of slider 
    const { listSettingSliderPagination } = this.props;
    listSettingSliderPagination.current = curPagi.current;
    listSettingSliderPagination.pageSize = curPagi.pageSize;
    this.props.setState({
      listSettingSliderPagination
    });

    // update list again
    this.props.getListSlider({
      limit: curPagi.pageSize,
      currentPage: curPagi.current,
      sortField: curSorter.field,
      sortOrder: curSorter.order,
      ...curFilters,
    });
  }

  handleUpdateSlider = e => {
    const originalId = e.target.getAttribute('data-slider-id')
    const isSlider = e.target.getAttribute('data-is-slider')
    const updateData = {
      originalId,
      isSlider,
    }

    const { listSettingSliderPagination } = this.props
    
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
        this.props.getListSlider({
          limit: listSettingSliderPagination.pageSize,
          currentPage: listSettingSliderPagination.current
        });
      })
      .catch(error => {
        console.error(error)
        this.setState({ loading: false })
      })
  }

  render() {
    const { loading } = this.state
    const { listSettingSlider, listSettingSliderPagination, settingSliderloading } = this.props;
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
            dataSource={listSettingSlider}
            pagination={listSettingSliderPagination}
            loading={loading || settingSliderloading}
            onChange={this.handleTableChange}
            rowKey="id"
          />
        </div>
      </div>
    )
  }
}

export default Settings

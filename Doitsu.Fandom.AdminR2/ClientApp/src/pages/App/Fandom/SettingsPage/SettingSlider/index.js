import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Helmet from 'react-helmet'
import Page from 'components/LayoutComponents/Page'
import { notification } from 'antd'
import { setLoading } from 'ducks/app'
import { Table, Icon, Input, Button, Modal, Checkbox } from 'antd'
import { setSettingSliderListState } from 'ducks/fandom'
import { readSliders, updateSlider } from 'apis/services/settingService.js'

const mapStateToProps = (state, props) => ({
    ...state.fandom.settingSliderListState
})

@connect(mapStateToProps)
class SettingSlider extends React.Component {

    handleUpdateSlider = (e) => {
        const originalId = e.target.getAttribute("data-slider-id");
        const isSlider = e.target.getAttribute("data-is-slider");
        const updateData = {
            originalId,
            isSlider
        }
        updateSlider(updateData)
            .then(res => {
                console.log(res);
                this.props.dispatch(setSettingSliderListState({isFirstLoadTable: true}));
            })
            .catch(error => {
                console.error(error);
                this.props.dispatch(setSettingSliderListState({isFirstLoadTable: true}));                
            });
    }

    render() {
        let { pager, data, isFirstLoadTable, dispatch} = this.props;
        if(isFirstLoadTable) {
            readSliders().then((data) => {
                let listSlider = data.data;
                dispatch(setSettingSliderListState({data: listSlider, tableData: listSlider, isFirstLoadTable: false}));
            })
        }
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
                sorter: (a,b) => a.originalId > b.originalId
            },
            {
                title: 'Tiêu đề',
                dataIndex: 'title',
                key: 'title',
                render: text => (
                    <a className="utils__link--underlined" href="javascript: void(0);">
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
                        <div className="setting-slider__table-thumbnail">
                            <img src={text} alt="" width="200" />
                        </div>
                    </a>
                )
            },
            {
                title: 'Có trình chiếu không',
                dataIndex: 'isSlider',
                key: 'isSlider',
                render: checked => (
                    <p className="setting-slider__checkedtype">
                        {checked ? <Icon style={{color: "green"}} type="check"/> : <Icon style={{color: "red"}} type="close"/>}
                    </p>
                ),
            },
            {
                title: 'Tùy chọn',
                dataIndex: 'originalId',
                key: 'editControls',
                render: (id, fullData) => (
                    <div className="setting-slider__edit-datatable-area">
                        {
                            fullData.isSlider ?
                            <Button type="danger" data-slider-id={fullData.originalId} data-is-slider={false} onClick={this.handleUpdateSlider}>
                                Ngưng trình chiếu
                            </Button>
                            :
                            <Button type="primary" data-slider-id={fullData.originalId} data-is-slider={true} onClick={this.handleUpdateSlider}>
                                Trình chiếu
                            </Button>
                        }
                    </div>
                ),
            }
        ];
        return (
            <div className="card">
                <div className="card-header">
                    <div className="utils__title">
                        <strong>Cấu hình trình chiếu</strong>
                    </div>
                </div>
                <div className="card-body">
                    <Table 
                        scroll={{ x: 1000 }} 
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

export default SettingSlider
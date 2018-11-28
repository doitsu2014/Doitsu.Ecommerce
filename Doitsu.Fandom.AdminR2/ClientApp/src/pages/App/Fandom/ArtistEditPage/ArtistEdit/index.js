import React from 'react'
import {connect} from 'react-redux'
import { Input, TreeSelect, Select, Button, Upload, Icon, message } from 'antd'

import './style.scss'

const TreeNode = TreeSelect.TreeNode
const Option = Select.Option
const Dragger = Upload.Dragger
const { TextArea } = Input


const upProps = {
  name: 'files',
  multiple: true,
  action: 'http://localhost:54389/api/image/uploads',
  headers: {
    'Authorization': window.localStorage.getItem('app.Authorization')
  },
  onStart(file) {
    console.log('onStart', file, file.name);
  },
  onSuccess(ret) {
    console.log('onSuccess', ret);
  },
  onError(err) {
    console.log('onError', err);
  },
  beforeUpload(file, fileList) {
    console.log(file, fileList);
    return new Promise((resolve) => {
      console.log('start check');
      setTimeout(() => {
        console.log('check finshed');
        resolve(file);
      }, 3000);
    });
  },
};
const dragprop = {
  name: 'files',
  multiple: true,
  action: 'http://localhost:54389/api/image/uploads',
  headers: {
    'Authorization': window.localStorage.getItem('app.Authorization')
  },
  onChange(info) {
    const status = info.file.status
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)

    }
    if (status === 'done') {
      message.success(`${info.file.name} dữ liệu được cập nhật thành công.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} dữ liệu được cập nhật thành công.`)
    }
  },
}

const mapStateToProps = (state, props) => ({
    ...state.fandom.artistEditState
})

@connect(mapStateToProps)
class ArtistEdit extends React.Component {
    render() {
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
                          <label htmlFor="artist-edit-code">Mã</label>
                          <Input id="artist-edit-code" placeholder="Mã nghệ sĩ" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="artist-edit-name">Tên</label>
                          <Input id="artist-edit-name" placeholder="Tên nghệ sĩ" />
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <label htmlFor="drg-images">Ảnh đại diện</label>
                    <Dragger {...dragprop} className="height-300 d-block mb-3" id="drg-images">
                      <p className="ant-upload-drag-icon">
                        <Icon type="cloud-upload" />
                      </p>
                      <p className="ant-upload-text">Nhấp chuột hoặc kéo hình ảnh của bạn vào</p>
                      <p className="ant-upload-hint">
                        Bạn có thể kéo nhiều dữ liệu vào.
                      </p>
                    </Dragger>
                  </div>
                </div>
              </div>
            </div>
        );
    }

}

export default ArtistEdit
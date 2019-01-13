import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Radio, notification } from 'antd' 
import PictureUploader  from 'components/DoitsuComponents/PictureUploader'

import { push } from 'react-router-redux'
// Import actions
import { setBlogEditState, setPictureUploaderState, setBlogListState } from 'ducks/fandom';
import { setLoading } from 'ducks/app'
// Import editor component
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// Init service
import { createBlog, updateBlog, readBlog } from 'apis/services/blogService'

const FormItem = Form.Item
const RadioGroup = Radio.Group

const mapStateToProps = (state, props) => ({
  ...state.fandom.blogEditState,
  ...state.routing,
  pictureUploaderState: {...state.fandom.pictureUploaderState}
})

@connect(mapStateToProps)
@Form.create()
class AddForm extends React.Component {
  
  componentWillMount() {
    const { isUpdate, isReloadInformation, id, location } = this.props;
    // handle edit, create state
    (async () => {
      if(isUpdate && location.pathname === '/blog/edit' && isReloadInformation && id) {
        await this.reloadBlog(id);
      }
    })()
  }

  reloadBlog = async (id) => {
    const { dispatch, form } = this.props;
    let response = await readBlog({limit: 1, id: id});
    let listBlog = response ? response.data : null;
    let blog = listBlog && listBlog.length > 0 ? listBlog[0] : null;
    form.setFieldsValue(blog);
    dispatch(setBlogEditState(blog));

    // update editor state, convert content html to content editor
    console.log("Blog Content", blog.content) 
    if(blog.content) {
      const blocksFromHTML = convertFromHTML(blog.content);
      const content = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      dispatch(setBlogEditState({editorState: EditorState.createWithContent(content)}));
    }
    
    dispatch(setPictureUploaderState({
      fileList: blog.thumbnailURL ? [{
        uid: blog.thumbnailURL,
        url: blog.thumbnailURL,
        status: "done"
      }] : []
    }));
  }

  handleInputChange = (e) => {
    this.props.dispatch(setBlogEditState({
      [e.target.name]: e.target.value
    }));
  }
  handleRadioGroupChange = (e) => {
    this.props.dispatch(setBlogEditState({
      [e.target.name]: e.target.value
    }));
  }
  handleEditorChange= (editorState) => {    
    this.props.dispatch(setBlogEditState({
      editorState
    }));
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    let { dispatch, isUpdate } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // prepare fields
        let blogProperties = {...values};
        let {fileList} = this.props.pictureUploaderState;
        if(fileList && fileList[0]) {
          blogProperties.thumbnailURL = fileList[0].url;
        }
        let editorState = this.props.editorState;
        if(editorState) {
          let content = convertToRaw(editorState.getCurrentContent());
          blogProperties.content = draftToHtml(content);
        } else {
          blogProperties.content = "";
        }
        // done prepare
        // time to call api create or update
        dispatch(setBlogListState({isFirstLoadTable:true}))
        dispatch(setLoading(true));
        if(isUpdate) {
          updateBlog({...blogProperties, active: true})
          .then((response) => {
            if(response.success) {
              notification.open({
                type: 'success',
                message: 'Cập nhật bài viết',
                description:
                  'Thành công',
              })
              dispatch(setLoading(false))
              dispatch(push('/blog'))
            }else {
              notification.open({
                type: 'error',
                message: 'Cập nhật bài viết',
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
        } else {
          createBlog({...blogProperties, active: true})
            .then((response) => {
              if(response.success) {
                notification.open({
                  type: 'success',
                  message: 'Cập nhật bài viết',
                  description:
                    'Thành công',
                })
                dispatch(setLoading(false))
                dispatch(push('/blog'))
              }else {
                notification.open({
                  type: 'error',
                  message: 'Cập nhật bài viết',
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
    });
  }
  createRuleIsRequried = (message) => ({required: true, message: message})
  createRuleRegExp = (regexpStr, message) => {
    return (rule, value, callback) => {
      var regexp = new RegExp(regexpStr);
      if(!regexp.test(value))
      {
        callback(message); 
      }else {
        callback();
      }
    };
  };
  render() {
    let { getFieldDecorator } = this.props.form;
    let { editorState } = this.props;
    return (
      <Form className="add-post__form mt-3">
        <FormItem>
          {
            getFieldDecorator('id')(<Input name="id" type="hidden" />)
          }
        </FormItem>
        <FormItem>
          <div className="form-group">
            <label className="add-post__label">
              <strong>Mã</strong>
            </label>
            {
              getFieldDecorator('code', 
              {
                rules: [this.createRuleIsRequried("Bạn chưa nhập mã!")
                  ,this.createRuleRegExp('^[\\w\\d]{1,23}$', 'Mã bài viết chứa ký tự lạ!')]
              })(<Input name="code" placeholder="Mã bài viết, ví dụ: B01" onChange={this.handleInputChange} />)
            }
          </div>
        </FormItem>
        <FormItem>
          <div className="form-group">
            <label className="add-post__label">
              <strong>Tiêu đề</strong>
            </label>
            {
              getFieldDecorator('title', 
              {
                rules: [this.createRuleIsRequried("Bạn chưa nhập tiêu đề!")]
              })(<Input name="title" placeholder="Tiêu đề bài biết" onChange={this.handleInputChange} />)
            }
          </div>
        </FormItem>
        <FormItem>
          <div className="form-group">
            <label className="add-post__label">
              <strong>Đường dẫn</strong>
            </label>
            {
              getFieldDecorator('slug', 
              {
                rules: [this.createRuleIsRequried("Bạn chưa nhập đường dẫn SEO!")
                  ,this.createRuleRegExp("^[\\w\\d-]{1,50}$", "Đường dẫn của bạn chứa ký tự lạ")]
              })(<Input name="slug" placeholder="Đường dẫn SEO cho bài viết, ví dụ: tin-tuc-01" onChange={this.handleInputChange} />)
            }
          </div>
        </FormItem>
        <FormItem>
          <div className="form-group">
            <label className="add-post__label">
              <strong>Danh mục</strong>
            </label>
            {
              getFieldDecorator('blogCategoryID', 
              {
                rules: [this.createRuleIsRequried("Bạn chưa chọn danh mục cho bài viết này!")]
              })
              (
                <RadioGroup name="blogCategoryID" onChange={this.handleRadioGroupChange} >
                  <Radio value={1}>Notice</Radio>
                  <Radio value={2}>News</Radio>
                </RadioGroup>
              )
            }
          </div>
        </FormItem>
        <FormItem>
          <div className="form-group">
            <label className="add-post__label">
              <strong>Nội dung bài viết</strong>
            </label>
            <div className="add-post__editor">
              <Editor name="content" onEditorStateChange ={this.handleEditorChange} editorState={editorState} />
            </div>
          </div>
        </FormItem>
        <FormItem>
          <div className="form-group">
            <label className="add-post__label">
              <strong>Hình thumbnail</strong>
            </label>
            <PictureUploader></PictureUploader>
          </div>
        </FormItem>
        <FormItem>
          <div className="add-post__submit">
            <span className="mr-3">
              <Button type="primary" onClick={this.handleFormSubmit} htmlType="submit">
                Lưu bài viết
              </Button>
            </span>
            <Button type="danger" htmlType="submit">
              Hủy
            </Button>
          </div>
        </FormItem>
      </Form>
    )
  }
}

export default AddForm

import React from 'react'
import { create, read, update } from 'services/blog'
import readBlogCategory from 'services/blogCategory'
import UploadPictures from 'components/DoitsuComponents/UploadPictures'
import { Input, Form, Button, Spin, notification, Radio, DatePicker } from 'antd'
import { FormUtils } from 'utils'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'

import EditorWysiwygCTHTML from 'components/DoitsuComponents/EditorWysiwygCTHTML'

const FormItem = Form.Item
const RadioGroup = Radio.Group
@Form.create()
@connect(({ blogState }) => ({ blogState }))
class BlogEditor extends React.Component {
  state = {
    defaultFileUpload: null,
    thumbnailURL: '',
    spinning: false,
    defaultEditorStateHtml: null,
    editorStateHtml: null,
    blogCategoryOptions: [],
  }

  async componentWillMount() {
    const { blogState } = this.props

    // binding blogCategories
    const blogCategoryData = (await readBlogCategory()).data
    const blogCategoryOptions = blogCategoryData.map(x => ({
      label: x.name,
      value: x.id,
    }))
    this.setState({ blogCategoryOptions })

    if (blogState.trackingId === -1) {
      // create
      // do nothing
    } else {
      // update
      // fetch data
      const response = await read({
        limit: 1,
        id: blogState.trackingId,
      })

      if (response) {
        const { form } = this.props
        const blogStateObject = response.data[0]

        // beautify data
        blogStateObject.draftTime = moment(blogStateObject.draftTime)

        const defaultFileUpload = {
          uid: response.data.length,
          url: blogStateObject.thumbnailURL,
        }
        // init default image
        this.setState(
          {
            defaultFileUpload,
            thumbnailURL: blogStateObject.thumbnailURL,
            defaultEditorStateHtml: blogStateObject.content,
          },
          () => {
            // set to form
            // note: you must be render state first.
            form.setFieldsValue(blogStateObject)
          },
        )
        // init default editor content
      }
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'blog/SET_STATE',
      payload: {
        trackingId: -1,
      },
    })
  }

  handleUPOnSuccessCallback = fileList => {
    if (fileList[0] && fileList[0].response && fileList[0].response.data[0]) {
      const image = fileList[0].response.data[0]
      this.setState({
        thumbnailURL: image.url || image.thumbUrl,
      })
    }
  }

  handleFormSubmit = () => {
    const { thumbnailURL, editorStateHtml } = this.state
    const { form, blogState, dispatch } = this.props
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        // start loading
        this.setState({ spinning: true })
        // prepare model to request create
        const createModel = { ...values, thumbnailURL, content: editorStateHtml, active: true }
        // because draft time is moment so change to string
        createModel.draftTime = createModel.draftTime.format('YYYY-MM-DD')
        const notifyInfor = {}
        try {
          // if trackd id !== -1 is update blog
          if (blogState.trackingId !== -1) {
            const response = await update({ ...createModel })
            notifyInfor.message = `Update blog ${values.title}`

            // analyst response and notify
            if (response.success) {
              notifyInfor.type = 'success'
              notifyInfor.description = `Successfully`
            } else {
              notifyInfor.type = 'error'
              notifyInfor.description = `Fail: ${response.message}`
            }
          }
          // else create blog
          else {
            const response = await create({ ...createModel })
            notifyInfor.message = `Create new blog ${values.title}`
            // analyst response and notify
            if (response.success) {
              notifyInfor.type = 'success'
              notifyInfor.description = `Successfully`
            } else {
              notifyInfor.type = 'error'
              notifyInfor.description = `Fail: ${response.message}`
            }
          }
        } catch (error) {
          notifyInfor.type = 'error'
          notifyInfor.message = `System exception`
          notifyInfor.description = `Bug description: ${error.message}`
        } finally {
          // turn off spin
          this.setState({ spinning: false })
          // notify
          notification.open(notifyInfor)

          // if success dispatch to blog
          if (notifyInfor.type === 'success') {
            dispatch(push('/blogs/list'))
          }
        }
      }
    })
  }

  handleEditorChange = html => {
    this.setState({
      editorStateHtml: html,
      defaultEditorStateHtml: html,
    })
  }

  render() {
    const { form, blogState } = this.props
    const { spinning, defaultFileUpload, defaultEditorStateHtml, blogCategoryOptions } = this.state
    return (
      <Spin spinning={spinning} tips={blogState.trackingId === -1 ? 'Creating' : 'Editing'}>
        <h5 className="text-black mb-3">
          <strong>Main Parameters</strong>
        </h5>
        <hr />
        <Form layout="vertical">
          <FormItem>{form.getFieldDecorator('id')(<Input name="id" type="hidden" />)}</FormItem>
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group form-upload">
                    <FormItem label="Code">
                      {form.getFieldDecorator('code', {
                        rules: [
                          FormUtils.CreateRuleIsRequried('Required Code. '),
                          FormUtils.CreateRuleRegExp(
                            '^[\\w\\d]{1,23}$',
                            'Code should be 1 ~ 23 characters, and match with alphabe, decimal',
                          ),
                        ],
                      })(<Input name="code" placeholder="Mã bài viết, ví dụ: B01" />)}
                    </FormItem>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group form-upload">
                    <FormItem label="Title">
                      {form.getFieldDecorator('title', {
                        rules: [FormUtils.CreateRuleIsRequried('Required title. ')],
                      })(<Input name="title" placeholder="Blog title" />)}
                    </FormItem>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group form-upload">
                    <FormItem label="Seo name">
                      {form.getFieldDecorator('slug', {
                        rules: [
                          FormUtils.CreateRuleIsRequried('Required seo name. '),
                          FormUtils.CreateRuleRegExp(
                            '^[\\w\\d-]{0,25}$',
                            'SEO invalid, should like pattern: seo-name-01 and the length should not over 25.',
                          ),
                        ],
                      })(<Input name="slug" placeholder="SEO name, example: birth-day-event-01" />)}
                    </FormItem>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group form-upload">
                    <FormItem label="Category">
                      {form.getFieldDecorator('blogCategoryID', {
                        rules: [FormUtils.CreateRuleIsRequried('Require ')],
                      })(
                        <RadioGroup
                          name="blogCategoryID"
                          options={blogCategoryOptions}
                          onChange={this.handleRadioGroupChange}
                        />,
                      )}
                    </FormItem>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <FormItem label="Content">
                      {form.getFieldDecorator('content')(
                        <EditorWysiwygCTHTML
                          name="content"
                          defaultHtml={defaultEditorStateHtml}
                          onChangeHtml={this.handleEditorChange}
                        />,
                      )}
                    </FormItem>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group form-upload">
                    <FormItem label="Thumbnail">
                      {form.getFieldDecorator('thumbnailUrl')(
                        <UploadPictures
                          onSuccessCallback={this.handleUPOnSuccessCallback}
                          defaultImage={defaultFileUpload}
                        />,
                      )}
                    </FormItem>
                  </div>
                </div>
                <FormItem label="Draft Time">
                  {form.getFieldDecorator('draftTime', {
                    rules: [FormUtils.CreateRuleIsRequried('Select draft time')],
                  })(<DatePicker />)}
                </FormItem>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row float-right">
                <div className="form-group">
                  <Button type="default" className="mr-2">
                    Cancel
                  </Button>
                  <Button type="primary" onClick={this.handleFormSubmit}>
                    {blogState.trackingId === -1 ? 'Create' : 'Edit'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Spin>
    )
  }
}

export default BlogEditor

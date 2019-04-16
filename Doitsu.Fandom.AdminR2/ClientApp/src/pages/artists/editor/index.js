import React from 'react'
import { create, readArtist, update } from 'services/artist'
import UploadPictures from 'components/DoitsuComponents/UploadPictures'
import { Input, Form, Button, Spin, notification } from 'antd'
import { FormUtils } from 'utils'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const { TextArea } = Input
const FormItem = Form.Item

@Form.create()
@connect(({ artist }) => ({ artist }))
class ArtistEditor extends React.Component {
  state = {
    defaultFileUpload: null,
    avatarUrl: '',
    spinning: false,
  }

  async componentWillMount() {
    const { artist } = this.props
    if (artist.trackingId === -1) {
      // create
      // do nothing
    } else {
      // update
      // fetch data
      const response = await readArtist({
        limit: 1,
        id: artist.trackingId,
      })

      if (response) {
        const { form } = this.props
        const artistObject = response.data[0]
        const defaultFileUpload = {
          uid: response.data.length,
          url: artistObject.avatarUrl,
        }
        // init default image
        this.setState(
          {
            defaultFileUpload,
            avatarUrl: artistObject.avatarUrl,
          },
          () => {
            // set to form
            // note: you must be render state first.
            form.setFieldsValue(artistObject)
          },
        )
      }
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'artist/SET_STATE',
      payload: {
        trackingId: -1,
      },
    })
  }

  handleUPOnSuccessCallback = fileList => {
    if (fileList[0] && fileList[0].response && fileList[0].response.data[0]) {
      const image = fileList[0].response.data[0]
      this.setState({
        avatarUrl: image.url || image.thumbUrl,
      })
    }
  }

  handleFormSubmit = () => {
    const { avatarUrl } = this.state
    const { form, artist, dispatch } = this.props
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.setState({ spinning: true })
        const createModel = { ...values, avatarUrl, active: true }
        const notifyInfor = {}

        try {
          if (artist.trackingId !== -1) {
            const response = await update({ ...createModel, active: true })
            notifyInfor.message = `Update artist ${values.name}`
            if (response.success) {
              notifyInfor.type = 'success'
              notifyInfor.description = `Successfully`
            } else {
              notifyInfor.type = 'error'
              notifyInfor.description = `Fail: ${response.message}`
            }
          } else {
            const response = await create({ ...createModel, active: true })
            notifyInfor.message = `Creat artist ${values.name}`
            if (response.success) {
              notifyInfor.type = 'success'
              notifyInfor.description = `Successfully`
            } else {
              notifyInfor.type = 'error'
              notifyInfor.description = `Fail: ${response.message}`
            }
          } // end else tracking id !== 1
        } catch (error) {
          notifyInfor.type = 'error'
          notifyInfor.message = `System exception`
          notifyInfor.description = `Bug description: ${error.message}`
        } finally {
          // turn off spin
          this.setState({ spinning: false })
          // notify
          notification.open(notifyInfor)
          // if success dispatch to artist
          if (notifyInfor.type === 'success') {
            console.log('push artists/list')
            dispatch(push('/artists/list'))
          }
        } // end finally
      } // end if error
    }) // end form validate
  } // end handle submit

  render() {
    const { form, artist } = this.props
    const { spinning, defaultFileUpload } = this.state
    return (
      <Spin spinning={spinning} tips={artist.trackingId === -1 ? 'Creating' : 'Editing'}>
        <h5 className="text-black mb-3">
          <strong>Main Parameters</strong>
        </h5>
        <hr />
        <Form layout="vertical">
          <FormItem>{form.getFieldDecorator('id')(<Input name="id" type="hidden" />)}</FormItem>
          <div className="row">
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group form-upload">
                    <FormItem label="Avatar Url">
                      {form.getFieldDecorator('avatarUrl')(
                        <UploadPictures
                          onSuccessCallback={this.handleUPOnSuccessCallback}
                          defaultImage={defaultFileUpload}
                        />,
                      )}
                    </FormItem>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <FormItem label="Artist Code">
                      {form.getFieldDecorator('code', {
                        rules: [
                          FormUtils.CreateRuleIsRequried('Required code.\n'),
                          FormUtils.CreateRuleRegExp(
                            '^[\\w\\d]{1,255}$',
                            'You should input for 255 characters Alphabe or Numeric.',
                          ),
                        ],
                      })(<Input placeholder="Artist Code" />)}
                    </FormItem>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <FormItem label="Artist Name">
                      {form.getFieldDecorator('name', {
                        rules: [FormUtils.CreateRuleIsRequried('Required name.\n')],
                      })(<Input placeholder="Artist Name" />)}
                    </FormItem>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <FormItem label="Description">
                      {form.getFieldDecorator('description')(
                        <TextArea rows={15} placeholder="description" />,
                      )}
                    </FormItem>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="row float-right">
                <div className="form-group">
                  <Button type="default" className="mr-2">
                    Cancel
                  </Button>
                  <Button type="primary" onClick={this.handleFormSubmit}>
                    {artist.trackingId === -1 ? 'Create new' : 'Edit'}
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

export default ArtistEditor

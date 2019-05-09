import React, { Component } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import UploadAdapterPlugin from './UploadAdapter'

import './style.editor.css'

class CKEditorCustom extends Component {
  onInit = editor => {
    console.log('Editor is ready to use!', editor)
    editor.config.set( 'mediaEmbed.previewsInData', true )
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement())

    // init upload adapter
    UploadAdapterPlugin(editor)
  }

  onChange = (event, editor) => {
    const { onChangeData } = this.props
    const data = editor.getData()
    onChangeData(data)
  }

  onFocus = editor => {
    console.log('Focus.', editor)
  }

  onBlur = editor => {
    console.log('Blur.', editor)
  }

  render() {
    const { defaultData } = this.props
    return (
      <div>
        <CKEditor
          editor={DecoupledEditor}
          data={defaultData}
          onInit={this.onInit}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
        />
      </div>
    )
  }
}

export default CKEditorCustom

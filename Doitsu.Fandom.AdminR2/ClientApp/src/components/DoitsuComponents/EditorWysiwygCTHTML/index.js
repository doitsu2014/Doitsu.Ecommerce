import React from 'react'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styles from './style.module.scss'

export default class EditorWysiwygCTHTML extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
    isBindingDefault: false,
  }

  getHtmlFromContent = editorState => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }

  createContentFromHtml = html => {
    const blocksFromHTML = convertFromHTML(html)
    const content = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    )
    return content
  }

  componentWillReceiveProps = () => {
    const { defaultHtml } = this.props
    const { isBindingDefault } = this.state
    let bindingValue
    console.log(isBindingDefault);
    if (!isBindingDefault) {
      if (!defaultHtml) {
        bindingValue = EditorState.createEmpty()
        this.setState({
          editorState: bindingValue,
        })
      } else {
        try {
          bindingValue = EditorState.createWithContent(convertFromHTML(defaultHtml))
        } catch (e) {
          console.log("Empty state make Empty Editor State");
          bindingValue = EditorState.createEmpty()
        }
        this.setState({
          editorState: bindingValue,
          isBindingDefault: true,
        })
      }
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    })
    let html = ''
    if (editorState.getCurrentContent() != null) {
      html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }
    const { onChangeHtml } = this.props
    onChangeHtml(html)
  }

  render() {
    const { editorState } = this.state
    return (
      <div>
        <Editor
          className={styles.editor}
          editorState={editorState}
          
          wrapperClassName={styles.editor_wrapper}
          editorClassName={styles.editor}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    )
  }
}

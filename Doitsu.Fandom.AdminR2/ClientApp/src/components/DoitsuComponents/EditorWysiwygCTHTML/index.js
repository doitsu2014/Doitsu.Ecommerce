import React from 'react'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './style.editor.css'
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
    console.log(isBindingDefault)
    console.log(defaultHtml)
    if (!isBindingDefault) {
      try {
        const contentState = convertFromHTML(defaultHtml)
        bindingValue = EditorState.createWithContent(contentState)
        this.setState({
          editorState: bindingValue,
          isBindingDefault: true,
        })
      } catch (e) {
        console.log(e)
        bindingValue = EditorState.createEmpty()
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
          wrapperClassName={styles.wrapper_class}
          editorClassName={styles.editor_class}
          toolbarClassName={styles.toolbar_class}
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    )
  }
}

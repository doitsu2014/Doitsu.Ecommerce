import React from 'react'
import { Tag, Input, Tooltip, Icon } from 'antd'

class TagEditor extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
  }

  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        tags: nextProps.value || [],
      }
    }
    return null
  }

  handleClose = removedTag => {
    let { tags } = this.state
    tags = tags.filter(tag => tag !== removedTag)
    this.setState({ tags })
    this.triggerChange(tags)
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state
    let { tags } = this.state
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue.toUpperCase()]
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    })

    this.triggerChange(tags)
  }

  saveInputRef = input => {
    this.input = input
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props
    if (onChange) {
      onChange(changedValue)
    }
  }

  render() {
    const { tags, inputVisible, inputValue } = this.state
    const { name } = this.props
    return (
      <div>
        {tags.map((tag) => {
          const isLongTag = tag.length > 20 
          const tagElem = (
            <Tag name={name} key={tag} closable onClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          )
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    )
  }
}

export default TagEditor

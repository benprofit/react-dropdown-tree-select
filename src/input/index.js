import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames/bind'
import Tag from '../tag'
import styles from './index.css'
import { getDataset, debounce } from '../utils'
import { getAriaLabel } from '../a11y'

const cx = cn.bind(styles)

const getTags = (tags = [], onDelete, readOnly, disabled, labelRemove) =>
  tags.map(tag => {
    const { _id, label, tagClassName, dataset } = tag
    return (
      <li className={cx('tag-item', tagClassName)} key={`tag-item-${_id}`} {...getDataset(dataset)}>
        <Tag
          label={label}
          id={_id}
          onDelete={onDelete}
          readOnly={readOnly}
          disabled={disabled}
          labelRemove={labelRemove}
        />
      </li>
    )
  })

class Input extends PureComponent {
  static propTypes = {
    tags: PropTypes.array,
    placeholderText: PropTypes.string,
    onInputChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onTagRemove: PropTypes.func,
    onKeyDown: PropTypes.func,
    inputRef: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    activeDescendant: PropTypes.string,
    label: PropTypes.string,
    labelRemove: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.delayedCallback = debounce(e => this.props.onInputChange(e.target.value), 300)
  }

  handleInputChange = e => {
    e.persist()
    this.delayedCallback(e)
  }

  render() {
    const {
      tags,
      onTagRemove,
      inputRef,
      placeholderText = 'Choose...',
      onFocus,
      onBlur,
      disabled,
      readOnly,
      onKeyDown,
      activeDescendant,
      label,
      labelRemove,
    } = this.props

    return (
      <ul className={cx('tag-list')}>
        {getTags(tags, onTagRemove, readOnly, disabled, labelRemove)}
        <li className={cx('tag-item')}>
          <input
            type="text"
            disabled={disabled}
            ref={inputRef}
            className={cx('search')}
            placeholder={placeholderText}
            onKeyDown={onKeyDown}
            onChange={this.handleInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={readOnly}
            aria-activedescendant={activeDescendant}
            aria-autocomplete={onKeyDown ? 'list' : undefined}
            {...getAriaLabel(label)}
          />
        </li>
      </ul>
    )
  }
}

export default Input

import pure from 'recompose/pure';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React, { Component } from 'react';

import styles from './Input.scss';
var cx = classNames.bind(styles);


class Input extends Component {

  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    pattern: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    defaultValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.open && !nextProps.value) {
      return false;
    }

    else if (!prevState.open && nextProps.value) {
      return true;
    }
  }

  state = {
    open: false,
  }

  componentDidMount() {
    const { open } = this.state;
    const { value } = this.props;

    if (value && !open) this.setState({ open: true });
  }

  input = React.createRef();

  handleChange = event => {
    const { onChange, name } = this.props;
    const value = event.target.value;

    if (onChange) onChange(value, name);
  }

  handleOpenInput = () => {
    const { disabled } = this.props;

    if (!disabled) {
      this.setState({ open: true });
      this.input.current.focus();
    }
  }

  handleCloseInput = () => {
    const value = this.input.current.value.trim();

    if (!value) this.setState({ open: false });
  }

  render() {
    const {
      type,
      value,
      title,
      error,
      pattern,
      disabled,
      autoFocus,
      defaultValue,
    } = this.props;
    const { open } = this.state;

    return (
      <div
        data-error={error !== true && error}
        className={cx('input', {
          open,
          disabled,
          error: !!error
        })}
      >
        <div
          className={styles.inputTitle}
          onClick={this.handleOpenInput}
        >
          {title}
        </div>
        <input
          type={type}
          value={value}
          ref={this.input}
          pattern={pattern}
          disabled={disabled}
          autoFocus={autoFocus}
          defaultValue={defaultValue}
          className={styles.inputForm}

          onChange={this.handleChange}
          onFocus={this.handleOpenInput}
          onBlur={this.handleCloseInput}
        />
      </div>
    );
  }
}

export default pure(Input);
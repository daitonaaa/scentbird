import pure from 'recompose/pure';
import PropTypes from 'prop-types';
import MaskInput from 'react-maskinput';
import classNames from 'classnames/bind';
import React, { Component } from 'react';

import styles from './Input.scss';
const cx = classNames.bind(styles);


class Input extends Component {

  static propTypes = {
    white: PropTypes.bool,
    mask: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.node, // DOM element
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    defaultValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    onValidate: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '',
    type: 'text',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.success && nextProps.error) {
      return {
        open: true,
        success: false
      };
    }

    return null;
  }

  state = {
    open: false,
    success: false,
  }

  input = React.createRef();

  handleChange = event => {
    const {
      name,
      error,
      onChange,
      onValidate,
    } = this.props;
    const { success } = this.state;
    const value = event.target.value;

    if (onChange instanceof Function) onChange(value, name);
    if (onValidate instanceof Function) onValidate(value, name);

    if (error && success) this.setState({ success: false });
  }

  handleOpenInput = () => {
    const { mask } = this.props;

    this.setState({ open: true, success: false });

    mask
      ? this.input.current.refs.input.focus()
      : this.input.current.focus();
  }

  handleCloseInput = () => {
    const { value, error } = this.props;

    value.trim() && !error
      ? this.setState({ open: false, success: true })
      : this.setState({ open: !!error, success: false });
  }

  renderIcon() {
    const { icon } = this.props;

    if (icon) return icon;
  }

  renderInput() {
    const {
      mask,
      type,
      value,
      defaultValue,
    } = this.props;

    const props = {
      type: type,
      value: value,
      ref: this.input,
      defaultValue: defaultValue,
      className: styles.inputForm,

      onChange: this.handleChange,
      onFocus: this.handleOpenInput,
      onBlur: this.handleCloseInput,
    };

    return mask
      ? <MaskInput mask={mask} {...props} />
      : <input {...props} />;
  }

  render() {
    const {
      white,
      error,
      title,
    } = this.props;
    const { open, success } = this.state;

    return (
      <div
        data-error={error !== true && error}
        className={cx('input', {
          open,
          white,
          success,
          error: !!error
        })}
      >
        <div
          className={styles.inputTitle}
          onClick={this.handleOpenInput}
        >
          {title}
        </div>
        {this.renderIcon()}
        {this.renderInput()}
      </div>
    );
  }
}

export default pure(Input);

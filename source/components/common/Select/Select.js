import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React, { Component } from 'react';
import outsideClick from 'react-click-outside';

import Option from './Option';

import styles from './Select.scss';
const cx = classNames.bind(styles);


class Select extends Component {

  static propTypes = {
    options: PropTypes.array.isRequired,
    white: PropTypes.bool,
    name: PropTypes.string,
    title: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    onValidate: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '',
  };

  state = {
    open: false,
  }

  handleClickOutside() {
    this.setState({ open: false });
  }

  handleValueType(value) {
    const processedValue = + value;

    return processedValue ? value : processedValue;
  }

  handleSelected = value => {
    const {
      name,
      onChange,
      onValidate,
    } = this.props;

    if (onChange instanceof Function) {
      onChange(this.handleValueType(value), name);
    }

    if (onValidate instanceof Function) {
      onValidate(this.handleValueType(value), name);
    }

    this.setState({ open: false });
  }

  handleOpenSelect = () => {
    this.setState({ open: true });
  };

  renderTitle() {
    const { value, options, title } = this.props;

    if (value) {
      const active = options.find(option => option.value === value);

      if (active) return active.label;
    }

    return title;
  }

  renderOptions() {
    const { open } = this.state;
    const { options, value } = this.props;

    if (open && options instanceof Array) {
      return options.map(option =>
        <Option
          {...option}
          key={option.value}
          activeValue={value}
          onSelectOption={this.handleSelected}
        />
      );
    }
  }

  render() {
    const {
      white,
      error,
      value,
    } = this.props;
    const { open } = this.state;
    const active = !!value;

    return (
      <div
        data-error={error !== true && error}
        className={cx('select', {
          open,
          white,
          error: !!error
        })}
      >
        <div
          onClick={this.handleOpenSelect}
          className={cx('select-title', { active })}
        >
          {this.renderTitle()}
        </div>
        <div className={styles.selectForm}>
          {this.renderOptions()}
        </div>
      </div>
    );
  }
}


export default outsideClick(Select);

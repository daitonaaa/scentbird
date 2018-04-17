import React from 'react';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import outsideClick from 'react-click-outside';

import Option from './Option';

import './Select.scss';


class Select extends React.Component {

  static propTypes = {
    error: PropTypes.bool,
    white: PropTypes.bool,
    width: PropTypes.number,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    errorText: PropTypes.string,
    noCancelBtn: PropTypes.bool,
    value: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,

    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '',
  }

  state = {
    showOptions: false,
    open: !!this.props.value || this.props.value === 0,
  }

  componentWillReceiveProps(nextProps) {
    const value = this.props.value;

    if (
      !value &&
      (nextProps.value || nextProps.value === 0)
    ) {
      this.setState({open: true});
    }

    else if (!nextProps.value && nextProps.value !== 0) {
      this.setState({open: false});
    }
  }

  handleOpenSelect = () => {
    const { disabled } = this.props;
    const { showOptions } = this.state;

    if (disabled || showOptions) return;

    this.setState({
      open: true,
      showOptions: true,
    });
  }

  handleSelect = value => {
    const { onChange } = this.props;

    this.setState({
      open: true,
      showOptions: false,
    });

    onChange(value);
  }

  handleSelectNone = () => {
    const { onChange } = this.props;

    this.setState({
      open: false,
      showOptions: false,
    });

    onChange('');
  }

  handleClickOutside() {
    const { value } = this.props;
    const { showOptions } = this.state;

    if (showOptions) this.setState({
      open: !!value,
      showOptions: false,
    });
  }

  renderSelectedTitle() {
    const { options, value } = this.props;

    const selectedOption = options.find(item => {
      const selectedValue = item.id || item.value;

      return selectedValue === value;
    });

    if (selectedOption) return selectedOption.title;
  }

  renderCancelBtn() {
    const { noCancelBtn } = this.props;

    if (!noCancelBtn) return (
      <div
        onClick={this.handleSelectNone}
        className="select__options-item"
      >
        Отмена
      </div>
    );
  }

  renderOptions() {
    const { showOptions } = this.state;
    const { options, value } = this.props;

    if (showOptions && options instanceof Array && options.length) {
      return (
        <div className="select__options">
          <div className="select__options-list">
            {this.renderCancelBtn()}
            {options.map(item =>
              <Option
                key={item.id || item.value}
                item={item}
                value={value}
                onSelectOption={this.handleSelect}
              />
            )}
          </div>
        </div>
      );
    }
  }

  render() {
    const {
      title,
      width,
      error,
      white,
      disabled,
      className,
      errorText,
    } = this.props;
    const { open, showOptions } = this.state;

    return (
      <div
        className={classNames(
          'select',
          {
            open,
            error,
            white,
            disabled,
            'show-options': showOptions,
            [className]: !!className,
          }
        )}
        style={width ? {width: `${width}px`} : null}
      >
        <div
          className="select__box"
          onClick={this.handleOpenSelect}
        >
          <div className="select__selected-title">
            {this.renderSelectedTitle()}
          </div>
          <div
            className="select__title"
            onClick={this.handleOpenSelect}
          >
            {title}
          </div>
          {this.renderOptions()}
        </div>
        <div className="select__error">
          {errorText}
        </div>
      </div>
    );
  }
}

export default outsideClick(pure(Select));

import pure from 'recompose/pure';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';

import styles from './Select.scss';
const cx = classNames.bind(styles);


class Option extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    activeValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    onSelectOption: PropTypes.func.isRequired,
  };

  handleClick = () => {
    const { value, onSelectOption } = this.props;

    onSelectOption(value);
  }

  render() {
    const { label, value, activeValue } = this.props;
    const active = activeValue === value;

    return(
      <div
        onClick={this.handleClick}
        className={cx(styles.selectOption, { active })}
      >
        {label}
      </div>
    );
  }
}

export default pure(Option);

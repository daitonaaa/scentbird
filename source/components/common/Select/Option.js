import pure from 'recompose/pure';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';


class Option extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    onSelectOption: PropTypes.func.isRequired,
  };

  handleClick = () => {
    const { item, onSelectOption } = this.props;
    const value = item.id || item.value;

    onSelectOption(value);
  }

  render() {
    const { item, value } = this.props;
    const optionValue = item.id || item.value;

    return(
      <div
        className={classNames(
          'select__options-item',
          {'active': optionValue === value}
        )}
        onClick={this.handleClick}
      >
        {item.title}
      </div>
    );
  }
}

export default pure(Option);

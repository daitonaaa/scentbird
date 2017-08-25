import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { toggleChildCheckAndSetCount, deleteItemChildAndSetCount } from 'actions/items';


class CreateForm extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    check: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    parentId: PropTypes.number.isRequired,

    deleteItemChildAndSetCount: PropTypes.func.isRequired,
    toggleChildCheckAndSetCount: PropTypes.func.isRequired,
  };

  static defaultProps = {
    id: -1,
    check: false,
    title: '',
    parentId: -1,

    deleteItemChildAndSetCount: () => {},
    toggleChildCheckAndSetCount: () => {},
  };

  render() {
    require('./CreateForm.scss');

    // const {
    //   title, check, id, parentId,
    //   toggleChildCheckAndSetCount, deleteItemChildAndSetCount
    // } = this.props;

    return (
      <div className="create-form">
        <div className="create-form__select">
          <select>
            <option value="item">Элемент</option>
            <option value="child">Дочку</option>
          </select>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = {
  toggleChildCheckAndSetCount, deleteItemChildAndSetCount
};

export default connect(()=>({}), mapDispatchToProps)(CreateForm);

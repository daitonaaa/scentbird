import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import './Controls.scss';

import {
  resetOpenId,
  getItemsList,
  checkedFirstChilds,
  uncheckAllChildsAndResetCount,
} from 'actions/items';


class Controls extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    checkedFirst: PropTypes.bool.isRequired,

    resetOpenId: PropTypes.func.isRequired,
    getItemsList: PropTypes.func.isRequired,
    checkedFirstChilds: PropTypes.func.isRequired,
    uncheckAllChildsAndResetCount: PropTypes.func.isRequired,
  };

  static defaultProps = {
    list: [],
    count: 0,
    request: false,
    errorText: '',
    checkedFirst: false,

    resetOpenId: () => {},
    getItemsList: () => {},
    checkedFirstChilds: () => {},
    uncheckAllChildsAndResetCount: () => {}
  };

  handleResetList = () => {
    const {
      resetOpenId,
      getItemsList,
    } = this.props;

    resetOpenId();
    getItemsList();
  }

  handleCheckedFirstChilds = () => {
    const {
      count,
      checkedFirst,
      checkedFirstChilds,
    } = this.props;

    count === 0
      ? checkedFirstChilds(true)
      : checkedFirstChilds(!checkedFirst);
  }

  render() {
    const {
      count,
      checkedFirst,
      uncheckAllChildsAndResetCount,
    } = this.props;

    const active = checkedFirst;

    return (
      <div className="controls">
        <div
          onClick={this.handleCheckedFirstChilds}
          className={classNames(
            'controls__checked-first-btn', { active }
          )}
        >
          {
            checkedFirst && count !== 0
              ? 'Снять выделение с первых дочерних'
              : 'Выделить первые дочерние'
          }
        </div>
        <div
          onClick={uncheckAllChildsAndResetCount}
          className="controls__uncheck"
        >
          Снять выделение с дочерних
        </div>
        <div
          onClick={this.handleResetList}
          className="controls__reset"
        >
          Вернуться к изначальным данным
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = {
  resetOpenId,
  getItemsList,
  checkedFirstChilds,
  uncheckAllChildsAndResetCount,
};

export default connect(
  ()=>({}),
  mapDispatchToProps
)(Controls);

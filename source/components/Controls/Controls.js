import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Controls.scss';

import {
  resetOpenId,
  getItemsList,
  uncheckChilds,
  checkedFirstChilds,
} from 'actions/items';


export class Controls extends Component {

  static propTypes = {
    resetOpenId: PropTypes.func.isRequired,
    getItemsList: PropTypes.func.isRequired,
    uncheckChilds: PropTypes.func.isRequired,
    checkedFirstChilds: PropTypes.func.isRequired,
  };

  handleResetList = () => {
    const {
      resetOpenId,
      getItemsList,
    } = this.props;

    resetOpenId();
    getItemsList();
  }

  render() {
    const {
      uncheckChilds,
      checkedFirstChilds,
    } = this.props;

    return (
      <div className="controls">
        <div
          className="controls__btn"
          onClick={checkedFirstChilds}
        >
          Выделить первые дочерние элементы
        </div>
        <div
          onClick={uncheckChilds}
          className="controls__btn"
        >
          Снять выделение со всех элементов
        </div>
        <div
          onClick={this.handleResetList}
          className="controls__btn reset"
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
  uncheckChilds,
};

export default connect(
  ()=>({}),
  mapDispatchToProps
)(Controls);

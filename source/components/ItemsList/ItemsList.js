import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import Item from 'components/Item/Item';

import {
  toggleCheckFirstChilds, uncheckAllChilds, getItemsList, setCheckedFirstBtnStatus
} from 'actions/items';


class ItemsList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    request: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,
    checkedFirst: PropTypes.bool.isRequired,

    getItemsList: PropTypes.func.isRequired,
    uncheckAllChilds: PropTypes.func.isRequired,
    toggleCheckFirstChilds: PropTypes.func.isRequired,
    setCheckedFirstBtnStatus: PropTypes.func.isRequired,
  };

  static defaultProps = {
    list: [],
    count: 0,
    request: false,
    errorText: '',
    checkedFirst: false,

    getItemsList: () => {},
    uncheckAllChilds: () => {},
    toggleCheckFirstChilds: () => {},
    setCheckedFirstBtnStatus: () => {},
  };

  state = {
    openId: -1
  }

  handleChangeOpenId = id => {
    const openId = this.state.openId;

    if (id !== openId) this.setState({ openId: id });
    else this.setState({ openId: -1 });
  }

  handleCheckedFirstBtn = () => {
    const {
      checkedFirst, toggleCheckFirstChilds, setCheckedFirstBtnStatus
    } = this.props;

    toggleCheckFirstChilds(!checkedFirst);
    setCheckedFirstBtnStatus(!checkedFirst);
  }

  renderError() {
    const { errorText } = this.props;

    if (errorText && errorText.length) return (
      <div className="items-list__error">
        {errorText}
      </div>
    );
  }

  render() {
    require('./ItemsList.scss');

    const {
      checkedFirst, count, request, list, getItemsList, uncheckAllChilds
    } = this.props;

    return (
      <div className="items-list">
        {this.renderError()}
        <div className="items-list__header">
          <div className="items-list__header-title">
            Это тестовый компонент
          </div>
          <div className="items-list__header-hint">
            Список элементов с дочками и элементам управления
          </div>
        </div>
        <div className="items-list__count">
          {`Выделено дочерних элементов: ${count}`}
        </div>
        <div className="items-list__controls">
          <div
            onClick={this.handleCheckedFirstBtn}
            className={classNames(
              'items-list__controls-checked-first-btn', { 'active': checkedFirst }
            )}
          >
            {
              checkedFirst
              ? 'Снять выделение с дочерних элементов под интексом [0]'
              : 'Выделить дочерние элементы под интексом [0]'
            }
          </div>
          <div
            onClick={uncheckAllChilds}
            className="items-list__controls-uncheck"
          >
            Снять выделение со всех дочерних элементов
          </div>
          <div
            onClick={getItemsList}
            className="items-list__controls-reset"
          >
            Вернуться к изначальным данным (reset)
          </div>
        </div>
        <div
          className={classNames(
            'items-list__list', { 'loading': request }
          )}
        >
          {list.map(item =>
            <Item
              {...item}
              key={item.id}
              open={item.id === this.state.openId}
              handleChangeOpenId={this.handleChangeOpenId}
            />
          )}
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = {
  toggleCheckFirstChilds, uncheckAllChilds, getItemsList, setCheckedFirstBtnStatus
};

export default connect(()=>({}), mapDispatchToProps)(ItemsList);

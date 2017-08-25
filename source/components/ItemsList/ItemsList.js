import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import Item from 'components/Item/Item';

import {
  uncheckAllChildsAndResetCount, getItemsList, checkedFirstChilds
} from 'actions/items';


class ItemsList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    request: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,
    checkedFirst: PropTypes.bool.isRequired,

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

    getItemsList: () => {},
    checkedFirstChilds: () => {},
    uncheckAllChildsAndResetCount: () => {}
  };

  state = {
    openId: -1
  }

  handleChangeOpenId = id => {
    const openId = this.state.openId;

    if (id !== openId) this.setState({ openId: id });
    else this.setState({ openId: -1 });
  }

  handleResetList = () => {
    const { getItemsList } = this.props;

    getItemsList();
    this.setState({openId: -1});
  }

  renderError() {
    const { errorText } = this.props;

    if (typeof errorText === 'string' && errorText.length) {
      return (
        <div className="items-list__error">
          {errorText}
        </div>
      );
    }
  }

  renderItemsList() {
    const { list, request } = this.props;

    if (!Array.isArray(list)) return;

    if (list.length) return (
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
    );

    return (
      <div
        className={classNames(
          'items-list__list', { 'loading': request }
        )}
      >
        <div className="items-list__list-no-items">
          Элементы не найдены
        </div>
      </div>
    );
  }

  renderControls() {
    const {
      checkedFirst, uncheckAllChildsAndResetCount, checkedFirstChilds
    } = this.props;

    return (
      <div className="items-list__controls">
        <div
          onClick={() => checkedFirstChilds(!checkedFirst)}
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
          onClick={uncheckAllChildsAndResetCount}
          className="items-list__controls-uncheck"
        >
          Снять выделение со всех дочерних элементов
        </div>
        <div
          onClick={this.handleResetList}
          className="items-list__controls-reset"
        >
          Вернуться к изначальным данным (reset)
        </div>
      </div>
    );
  }

  renderHeader() {
    const { count } = this.props;

    return (
      <div className="items-list__header">
        <div className="items-list__header-title">
          Это тестовый компонент
        </div>
        <div className="items-list__header-hint">
          Список элементов с дочками, управлением и счётчиком
        </div>
        <div className="items-list__header-count">
          {`Выделено дочерних элементов: ${count}`}
        </div>
      </div>
    );
  }

  render() {
    require('./ItemsList.scss');

    return (
      <div className="items-list">
        {this.renderError()}
        {this.renderHeader()}
        {this.renderControls()}
        {this.renderItemsList()}
      </div>
    );
  }
}


const mapDispatchToProps = {
  checkedFirstChilds, uncheckAllChildsAndResetCount, getItemsList
};

export default connect(()=>({}), mapDispatchToProps)(ItemsList);

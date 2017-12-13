import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './CreateForm.scss';

import {
  createItem,
  createChild
} from 'actions/items';


class CreateForm extends Component {

  static propTypes = {
    parentId: PropTypes.number, // только если childPosition = true

    list: PropTypes.array.isRequired,
    childPosition: PropTypes.bool.isRequired,

    createItem: PropTypes.func.isRequired,
    createChild: PropTypes.func.isRequired,
  };

  static defaultProps = {
    list: [],
    childPosition: false,

    createItem: () => {},
    createChild: () => {},
  };

  state = {
    error: '',
    titleValue: '',
  }

  handleChangeTitle = event => {
    const state = {
      error: '',
      titleValue: event.target.value,
    };

    this.setState({ ...state });
  }

  handleCreateItem = () => {
    const { titleValue } = this.state;
    const {
      list,
      parentId,
      createItem,
      createChild,
      childPosition,
    } = this.props;

    if (titleValue && list instanceof Array) {

      if (childPosition) {
        const parentIndex = list.findIndex(
          item => item.id === parentId
        );

        if (!(parentIndex + 1)) {
          this.setState({ error: 'Родитель не найден' });

          return;
        }

        const childs = list[parentIndex].childs;
        const newId = (
          childs.length
            ? childs[childs.length - 1].id + 1
            : 1
        );

        createChild(parentId, titleValue, newId);
      }

      else {
        const newId = (
          list.length
            ? list[list.length - 1].id + 1
            : 1
        );

        createItem(titleValue, newId);
      }
    }

    else this.setState({
      error: 'Вы должны ввести заголовок',
    });
  }

  renderError() {
    const {
      error,
      titleValue,
    } = this.state;

    if (typeof titleValue === 'string' && titleValue.trim()) {
      return (
        <div className="create-item__form-error">
          {error}
        </div>
      );
    }
  }

  render() {
    const { titleValue } = this.state;

    return (
      <div className="create-item__form">
        <div className="create-item__form-box">
          <input
            value={titleValue}
            onChange={this.handleChangeTitle}
            className="create-item__form-input"
            placeholder="Название нового элемента"
          />
          <div
            onClick={this.handleCreateItem}
            className="create-item__form-add"
          >
            Добавить новый элемент в список
          </div>
        </div>
        {this.renderError()}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  list: state.items.list,
});

const mapDispatchToProps = {
  createItem,
  createChild,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateForm);

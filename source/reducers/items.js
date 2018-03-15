import { helpers } from 'utils';
import Immutable from 'immutable';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  request: false,
  errorText: '',
  openedItem: 0,
  count: 0,
  list: []
});


function items(state = initialState, action) {
  let indexes;

  switch (action.type) {

    case actionTypes.CATALOG_ITEMS_SET_REQUEST_STATUS:
      return state.set('request', action.status);

    case actionTypes.CATALOG_ITEMS_SET_ERROR_TEXT:
      return state.set('errorText', action.text);

    case actionTypes.CATALOG_ITEMS_SET_LIST:
      return state.merge({
        list: action.list,
        request: false
      });

    case actionTypes.CATALOG_ITEMS_SET_OPEN_ID:
      return state.set('openedItem', action.itemId);

    case actionTypes.CATALOG_ITEMS_RESET_OPEN_ID:
      return state.set('openedItem', 0);

    case actionTypes.CATALOG_ITEMS_CHANGE_COUNT:
      return state.set('count', action.count);

    case actionTypes.CATALOG_ITEMS_DELETE_ITEM:
      indexes = getIndexes(state, action.itemId);

      return state.deleteIn(['list', indexes.itemIndex]);

    case actionTypes.CATALOG_ITEMS_DELETE_ITEM_CHILD:
      indexes = getIndexes(state, action.parentId, action.childId);

      return state.deleteIn(
        ['list', indexes.itemIndex, 'childs', indexes.childIndex]
      );

    case actionTypes.CATALOG_ITEMS_TOGGLE_CHILD_CHECK:
      indexes = getIndexes(state, action.parentId, action.childId);

      return state.setIn(
        ['list', indexes.itemIndex, 'childs', indexes.childIndex, 'check'],
        action.status
      );

    case actionTypes.CATALOG_ITEMS_CHECK_CHILDS:
      return state.update('list',
        list => list.map(
          item => item.update('childs',
            list => list.setIn([0, 'check'], true)
          )
        )
      );

    case actionTypes.CATALOG_ITEMS_UNCHECK_ALL:
      return state.update('list',
        list => list.map(
          item => item.update('childs',
            list => list.map(
              item => item.set('check', false)
            )
          )
        )
      );

    case actionTypes.CATALOG_ITEMS_CREATE_ITEM:
      return state.update('list',
        list => list.push({
          childs: [],
          id: action.id,
          title: action.title,
        })
      );

    case actionTypes.CATALOG_ITEMS_CREATE_CHILD: {
      const itemIndex = state.get('list').findIndex(
        elem => elem.get('id') === action.parentId
      );

      return state.updateIn(['list', itemIndex, 'childs'],
        list => list.push({
          id: action.id,
          title: action.title,
        })
      );
    }

    case actionTypes.CATALOG_ITEMS_TOGGLE_ALL_CHILDS_CHECK: {
      const itemIndex = state.get('list').findIndex(
        elem => elem.get('id') === action.itemId
      );

      return state.updateIn(
        ['list', itemIndex, 'childs'],
        list => list.map(item => item.set('check', action.status))
      );
    }

    case actionTypes.CATALOG_ITEMS_RESET:
      return initialState;

    default:
      return state;
  }
}

export default helpers.immutableize(items);


// helpers
const getIndexes = (state, itemId, childId) => {

  const itemIndex = state.get('list').findIndex(
    elem => elem.get('id') === itemId
  );

  let childIndex = null;

  if (childId) childIndex = state
    .getIn(['list', itemIndex, 'childs'])
    .findIndex(elem => elem.get('id') === childId);

  return { itemIndex, childIndex };
};

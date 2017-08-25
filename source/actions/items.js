import api from 'api/items';
import * as actionTypes from 'constants/actionTypes';


export const setRequestStatus = status => ({
  type: actionTypes.CATALOG_ITEMS_SET_REQUEST_STATUS,
  status
});


export const setErrorText = text => ({
  type: actionTypes.CATALOG_ITEMS_SET_ERROR_TEXT,
  text
});


export const resetError = () => ({
  type: actionTypes.CATALOG_ITEMS_RESET_TEXT
});


export const setItemsList = list => ({
  type: actionTypes.CATALOG_ITEMS_SET_LIST,
  list
});


export const changeCount = count => ({
  type: actionTypes.CATALOG_ITEMS_CHANGE_COUNT,
  count
});


export const addItem = item => ({
  type: actionTypes.CATALOG_ITEMS_ADD_ITEM,
  item
});


export const addItemChild = (itemId, childId) => ({
  type: actionTypes.CATALOG_ITEMS_ADD_ITEM_CHILD,
  itemId,
  childId
});


export const resetAll = () => ({
  type: actionTypes.CATALOG_ITEMS_RESET
});


export const toggleChildCheck = (itemId, childId, status) => ({
  type: actionTypes.CATALOG_ITEMS_TOGGLE_CHILD_CHECK,
  itemId,
  childId,
  status
});


export const setCheckedFirstBtnStatus = status => ({
  type: actionTypes.CATALOG_ITEMS_SET_CHECKED_FIRST_BTN_STATUS,
  status
});


export const deleteItem = itemId => ({
  type: actionTypes.CATALOG_ITEMS_DELETE_ITEM,
  itemId
});


export const deleteItemChild = (itemId, childId) => ({
  type: actionTypes.CATALOG_ITEMS_DELETE_ITEM_CHILD,
  itemId,
  childId
});


export const toggleCheckFirstChilds = status => ({
  type: actionTypes.CATALOG_ITEMS_TOGGLE_CHECK_FIRST_CHILDS,
  status
});


export const uncheckAllChilds = () => ({
  type: actionTypes.CATALOG_ITEMS_UNCHECK_ALL
});


export const getItemsList = (params = {}) => dispatch => {
  dispatch(resetAll());
  dispatch(setRequestStatus(true));

  return api.getItemsList(params)
    .then(
      response => dispatch(setItemsList(response)),
      error => {
        dispatch(setErrorText(
          'Ошибка на сервере! Но такого не может быть, ведь сервера то и нет'
        ));
        console.log(error);
      }
    );
};


export const toggleChildCheckAndSetCount = (itemId, childId, status) => (dispatch, getState) => {
  dispatch(toggleChildCheck(itemId, childId, status));
  const list = getState().items.list;
  setChechedCount(list, dispatch);
};


export const deleteItemChildAndSetCount = (itemId, childId) => (dispatch, getState) => {
  dispatch(deleteItemChild(itemId, childId));
  const list = getState().items.list;
  setChechedCount(list, dispatch);
};


export const uncheckAllChildsAndResetCount = () => dispatch => {
  dispatch(uncheckAllChilds());
  dispatch(changeCount(0));
};


export const checkedFirstChilds = status => (dispatch, getState) => {
  dispatch(toggleCheckFirstChilds(status));
  dispatch(setCheckedFirstBtnStatus(status));
  const list = getState().items.list;
  setChechedCount(list, dispatch);
};


export const deleteItemAndSetCount = id => (dispatch, getState) => {
  dispatch(deleteItem(id));
  const list = getState().items.list;
  setChechedCount(list, dispatch);
};


// helpers
const setChechedCount = (list, dispatch) => {
  let count = 0;

  list.map(
    item =>  item.childs && item.childs.map(
      item => {
        if (item.check) count += 1;
      }
    )
  );

  dispatch(changeCount(count));
};

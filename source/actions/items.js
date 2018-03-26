import api from 'api/items';
import * as actionTypes from 'constants/actionTypes';


export const toggleCheckFirstChilds = () => ({
  type: actionTypes.CATALOG_ITEMS_CHECK_CHILDS,
});


export const uncheckAllChilds = () => ({
  type: actionTypes.CATALOG_ITEMS_UNCHECK_ALL,
});


export const resetOpenId = () => ({
  type: actionTypes.CATALOG_ITEMS_RESET_OPEN_ID,
});


export const setRequestStatus = status => ({
  type: actionTypes.CATALOG_ITEMS_SET_REQUEST_STATUS,
  status,
});


export const setErrorText = text => ({
  type: actionTypes.CATALOG_ITEMS_SET_ERROR_TEXT,
  text,
});


export const setItemsList = list => ({
  type: actionTypes.CATALOG_ITEMS_SET_LIST,
  list,
});


export const changeCount = count => ({
  type: actionTypes.CATALOG_ITEMS_CHANGE_COUNT,
  count,
});


export const resetAll = () => ({
  type: actionTypes.CATALOG_ITEMS_RESET,
});


export const setOpenId = itemId => ({
  type: actionTypes.CATALOG_ITEMS_SET_OPEN_ID,
  itemId
});


export const deleteItem = itemId => ({
  type: actionTypes.CATALOG_ITEMS_DELETE_ITEM,
  itemId,
});


export const deleteItemChild = (parentId, childId) => ({
  type: actionTypes.CATALOG_ITEMS_DELETE_ITEM_CHILD,
  parentId,
  childId,
});


export const createItem = (title, id) => ({
  type: actionTypes.CATALOG_ITEMS_CREATE_ITEM,
  title,
  id,
});


export const toggleChildCheck = (parentId, childId, status) => ({
  type: actionTypes.CATALOG_ITEMS_TOGGLE_CHILD_CHECK,
  status,
  childId,
  parentId,
});


export const createChild = (parentId, title, id) => ({
  type: actionTypes.CATALOG_ITEMS_CREATE_CHILD,
  parentId,
  title,
  id,
});


export const checkItemChilds = (itemId, status) => ({
  type: actionTypes.CATALOG_ITEMS_TOGGLE_ALL_CHILDS_CHECK,
  itemId,
  status,
});


export const getItemsList = (params = {}) => dispatch => {
  dispatch(resetAll());
  dispatch(setRequestStatus(true));

  return api.getItemsList(params).then(
    response => dispatch(setItemsList(response)),
    error => dispatch(setErrorText(
      'Ошибка на сервере! Но такого не может быть, ведь сервера то и нет!'
    ))
  );
};


export const setCheckChildStatus = (
  itemId, childId, status
) => (dispatch, getState) => {
  dispatch(toggleChildCheck(itemId, childId, status));

  const count = getState().items.count;

  if (status) dispatch(changeCount(count + 1));
  else {
    dispatch(changeCount(
      count === 0 ? count : count - 1
    ));
  }
};


export const deleteItemChildAndSetCount = (itemId, childId) => (dispatch, getState) => {
  dispatch(deleteItemChild(itemId, childId));

  const list = getState().items.list;
  setCheckedCount(list, dispatch);
};


export const uncheckChilds = () => dispatch => {
  dispatch(uncheckAllChilds());
  dispatch(changeCount(0));
};


export const checkedFirstChilds = () => (dispatch, getState) => {
  dispatch(toggleCheckFirstChilds());

  const list = getState().items.list;
  setCheckedCount(list, dispatch);
};


export const deleteItemAndSetCount = id => (dispatch, getState) => {
  dispatch(deleteItem(id));

  const list = getState().items.list;
  setCheckedCount(list, dispatch);
};


export const toggleItemChildsCheck = (itemId, status) => (dispatch, getState) => {
  dispatch(checkItemChilds(itemId, status));

  const list = getState().items.list;
  setCheckedCount(list, dispatch);
};


// helpers
const setCheckedCount = (list, dispatch) => {
  let count = 0;

  list.forEach(item =>
    item.childs && item.childs.forEach(item => {
      if (item.check) count += 1;
    })
  );

  dispatch(changeCount(count));
};

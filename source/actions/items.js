import api from 'api/items';
import * as actionTypes from 'constants/actionTypes';


const setRequestStatus = status => ({
  type: actionTypes.CATALOG_ITEMS_SET_REQUEST_STATUS,
  status
});


const setErrorText = text => ({
  type: actionTypes.CATALOG_ITEMS_SET_ERROR_TEXT,
  text
});


const resetError = () => ({
  type: actionTypes.CATALOG_ITEMS_RESET_TEXT
});


const setItemsList = list => ({
  type: actionTypes.CATALOG_ITEMS_SET_LIST,
  list
});


const changeCount = list => ({
  type: actionTypes.CATALOG_ITEMS_CHANGE_COUNT,
  list
});


const addItem = item => ({
  type: actionTypes.CATALOG_ITEMS_ADD_ITEM,
  item
});


const addItemChild = (itemId, childId) => ({
  type: actionTypes.CATALOG_ITEMS_ADD_ITEM_CHILD,
  itemId,
  childId
});


const toggleChildCheck = (itemId, childId, status) => ({
  type: actionTypes.CATALOG_ITEMS_TOGGLE_CHILD_CHECK,
  itemId,
  childId,
  status
});


const resetAll = () => ({
  type: actionTypes.CATALOG_ITEMS_RESET
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

import {
  resetAll,
  setOpenId,
  deleteItem,
  createItem,
  changeCount,
  createChild,
  resetOpenId,
  setErrorText,
  setItemsList,
  deleteItemChild,
  checkItemChilds,
  uncheckAllChilds,
  setRequestStatus,
  toggleChildCheck,
  toggleCheckFirstChilds,
} from 'actions/items';
import * as actionTypes from 'constants/actionTypes';


describe('> > > ACTIONS - items.js', () => {
  it('#action: resetAll', () => {
    expect(resetAll())
      .toEqual({ type: actionTypes.CATALOG_ITEMS_RESET});
  });

  it('#action: setOpenId', () => {
    expect(setOpenId(15))
      .toEqual({
        type: actionTypes.CATALOG_ITEMS_SET_OPEN_ID,
        itemId: 15,
      });
  });

  it('#action: deleteItem', () => {
    expect(deleteItem(15))
      .toEqual({
        type: actionTypes.CATALOG_ITEMS_DELETE_ITEM,
        itemId: 15,
      });
  });

  it('#action: createItem', () => {
    expect(createItem('something', 15))
      .toEqual({
        type: actionTypes.CATALOG_ITEMS_CREATE_ITEM,
        title: 'something',
        id: 15,
      });
  });

  it('#action: changeCount', () => {
    expect(changeCount(15))
      .toEqual({
        type: actionTypes.CATALOG_ITEMS_CHANGE_COUNT,
        count: 15,
      });
  });

  it('#action: createChild', () => {
    expect(createChild(15, 'something', 20))
      .toEqual({
        type: actionTypes.CATALOG_ITEMS_CREATE_CHILD,
        title: 'something',
        parentId: 15,
        id: 20,
      });
  });

  it('#action: resetOpenId', () => {
    expect(resetOpenId())
      .toEqual({
        type: actionTypes.CATALOG_ITEMS_RESET_OPEN_ID,
      });
  });

  it('#action: setErrorText', () => {
    expect(setErrorText('something'))
      .toEqual({
        type: actionTypes.CATALOG_ITEMS_SET_ERROR_TEXT,
        text: 'something',
      });
  });

  it('#action: setItemsList', () => {
    expect(setItemsList([]))
      .toEqual({
        type: actionTypes.CATALOG_ITEMS_SET_LIST,
        list: [],
      });
  });

  it('#action: deleteItemChild', () => {
    expect(deleteItemChild(15, 20))
      .toEqual({
        type: actionTypes.CATALOG_ITEMS_DELETE_ITEM_CHILD,
        parentId: 15,
        childId: 20,
      });
  });

  it('#action: checkItemChilds', () => {
    expect(checkItemChilds(15, true))
      .toEqual({
        type: actionTypes.CATALOG_ITEMS_TOGGLE_ALL_CHILDS_CHECK,
        status: true,
        itemId: 15,
      });
  });

  it('#action: uncheckAllChilds', () => {
    expect(uncheckAllChilds())
      .toEqual({
        type: actionTypes.CATALOG_ITEMS_UNCHECK_ALL,
      });
  });

  it('#action: setRequestStatus', () => {
    expect(setRequestStatus(true))
      .toEqual({
        type: actionTypes.CATALOG_ITEMS_SET_REQUEST_STATUS,
        status: true,
      });
  });

  it('#action: toggleChildCheck', () => {
    expect(toggleChildCheck(20, 15, true))
      .toEqual({
        type: actionTypes.CATALOG_ITEMS_TOGGLE_CHILD_CHECK,
        childId: 15,
        parentId: 20,
        status: true,
      });
  });

  it('#action: toggleCheckFirstChilds', () => {
    expect(toggleCheckFirstChilds())
      .toEqual({
        type: actionTypes.CATALOG_ITEMS_CHECK_CHILDS,
      });
  });
});

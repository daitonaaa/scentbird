import reducer from 'reducers/items';
import * as actionTypes from 'constants/actionTypes';


describe('> > > REDUCER - items.js', () => {

  it(`#case: ${actionTypes.CATALOG_ITEMS_SET_REQUEST_STATUS}`, () => {
    let state = { request: false };
    state = reducer(state, {
      type: actionTypes.CATALOG_ITEMS_SET_REQUEST_STATUS,
      status: true,
    });

    expect(state).toEqual({ request: true });
  });

  it(`#case: ${actionTypes.CATALOG_ITEMS_SET_ERROR_TEXT}`, () => {
    let state = { errorText: '' };
    state = reducer(state, {
      type: actionTypes.CATALOG_ITEMS_SET_ERROR_TEXT,
      text: 'something',
    });

    expect(state).toEqual({ errorText: 'something' });
  });

  it(`#case: ${actionTypes.CATALOG_ITEMS_SET_LIST}`, () => {
    let state = { list: [], request: true };
    state = reducer(state, {
      type: actionTypes.CATALOG_ITEMS_SET_LIST,
      list: [1, 2],
    });

    expect(state).toEqual({ list: [1, 2], request: false });
  });

  it(`#case: ${actionTypes.CATALOG_ITEMS_SET_OPEN_ID}`, () => {
    let state = { openedItem: 0 };
    state = reducer(state, {
      type: actionTypes.CATALOG_ITEMS_SET_OPEN_ID,
      itemId: 21,
    });

    expect(state).toEqual({ openedItem: 21 });
  });

  it(`#case: ${actionTypes.CATALOG_ITEMS_RESET_OPEN_ID}`, () => {
    let state = { openedItem: 21 };
    state = reducer(state, {
      type: actionTypes.CATALOG_ITEMS_RESET_OPEN_ID
    });

    expect(state).toEqual({ openedItem: 0 });
  });

  it(`#case: ${actionTypes.CATALOG_ITEMS_CHANGE_COUNT}`, () => {
    let state = { count: 0 };
    state = reducer(state, {
      type: actionTypes.CATALOG_ITEMS_CHANGE_COUNT,
      count: 21,
    });

    expect(state).toEqual({ count: 21 });
  });

  it(`#case: ${actionTypes.CATALOG_ITEMS_DELETE_ITEM}`, () => {
    let state = { list: [
      { id: 1 }, { id: 2 }, { id: 3 }
    ] };
    state = reducer(state, {
      type: actionTypes.CATALOG_ITEMS_DELETE_ITEM,
      itemId: 2,
    });

    expect(state).toEqual({ list: [
      { id: 1 }, { id: 3 }
    ] });
  });

  it(`#case: ${actionTypes.CATALOG_ITEMS_DELETE_ITEM_CHILD}`, () => {
    let state = { list: [
      { id: 1 },
      { id: 2, childs: [
        { id: 1 }, { id: 2 }, { id: 3 }
      ] },
      { id: 3 }
    ] };
    state = reducer(state, {
      type: actionTypes.CATALOG_ITEMS_DELETE_ITEM_CHILD,
      parentId: 2,
      childId: 2,
    });

    expect(state).toEqual({ list: [
      { id: 1 },
      { id: 2, childs: [
        { id: 1 }, { id: 3 }
      ] },
      { id: 3 }
    ] });
  });

  it(`#case: ${actionTypes.CATALOG_ITEMS_TOGGLE_CHILD_CHECK}`, () => {
    let state = { list: [
      { id: 1 },
      { id: 2, childs: [
        { id: 1, check: false, },
      ] },
      { id: 3 }
    ] };
    state = reducer(state, {
      type: actionTypes.CATALOG_ITEMS_TOGGLE_CHILD_CHECK,
      parentId: 2,
      childId: 2,
      status: true,
    });

    expect(state).toEqual({ list: [
      { id: 1 },
      { id: 2, childs: [
        { id: 1, check: true, },
      ] },
      { id: 3 }
    ] });
  });

  it(`#case: ${actionTypes.CATALOG_ITEMS_CHECK_CHILDS}`, () => {
    let state = { list: [
      { id: 1, childs: [
        { id: 1, check: false, },
        { id: 2, check: false, },
      ] },
      { id: 2, childs: [
        { id: 1, check: false, },
        { id: 2, check: false, },
      ] }
    ] };
    state = reducer(state, {
      type: actionTypes.CATALOG_ITEMS_CHECK_CHILDS,
    });

    expect(state).toEqual({ list: [
      { id: 1, childs: [
        { id: 1, check: true, },
        { id: 2, check: false, },
      ] },
      { id: 2, childs: [
        { id: 1, check: true, },
        { id: 2, check: false, },
      ] }
    ] });
  });

  it(`#case: ${actionTypes.CATALOG_ITEMS_UNCHECK_ALL}`, () => {
    let state = { list: [
      { id: 1, childs: [
        { id: 1, check: true, },
        { id: 2, check: true, },
      ] },
      { id: 2, childs: [
        { id: 1, check: true, },
        { id: 2, check: true, },
      ] }
    ] };
    state = reducer(state, {
      type: actionTypes.CATALOG_ITEMS_UNCHECK_ALL,
    });

    expect(state).toEqual({ list: [
      { id: 1, childs: [
        { id: 1, check: false, },
        { id: 2, check: false, },
      ] },
      { id: 2, childs: [
        { id: 1, check: false, },
        { id: 2, check: false, },
      ] }
    ] });
  });

  it(`#case: ${actionTypes.CATALOG_ITEMS_CREATE_ITEM}`, () => {
    let state = { list: [
      { id: 1, childs: [], title: '' },
      { id: 2, childs: [], title: '' },
    ] };
    state = reducer(state, {
      type: actionTypes.CATALOG_ITEMS_CREATE_ITEM,
      id: 3,
      title: 'item',
    });

    expect(state).toEqual({ list: [
      { id: 1, childs: [], title: '' },
      { id: 2, childs: [], title: '' },
      { id: 3, childs: [], title: 'item' },
    ] });
  });

  it(`#case: ${actionTypes.CATALOG_ITEMS_CREATE_CHILD}`, () => {
    let state = { list: [
      { id: 1, childs: [] },
      { id: 2, childs: [] },
    ] };
    state = reducer(state, {
      type: actionTypes.CATALOG_ITEMS_CREATE_CHILD,
      parentId: 2,
      title: 'item',
      id: 1,
    });

    expect(state).toEqual({ list: [
      { id: 1, childs: [] },
      { id: 2, childs: [
        { id: 1, title: 'item', check: false }
      ] },
    ] });
  });

  it(`#case: ${actionTypes.CATALOG_ITEMS_TOGGLE_ALL_CHILDS_CHECK}`, () => {
    let state = { list: [
      { id: 1, childs: [
        { id: 1, title: 'item', check: true, },
        { id: 2, title: 'item', check: true, }
      ], },
      { id: 2, childs: [
        { id: 1, title: 'item', check: true, },
        { id: 2, title: 'item', check: true, }
      ], },
    ] };
    state = reducer(state, {
      type: actionTypes.CATALOG_ITEMS_TOGGLE_ALL_CHILDS_CHECK,
      itemId: 1,
      status: false,
    });

    expect(state).toEqual({ list: [
      { id: 1, childs: [
        { id: 1, title: 'item', check: false, },
        { id: 2, title: 'item', check: false, }
      ], },
      { id: 2, childs: [
        { id: 1, title: 'item', check: true, },
        { id: 2, title: 'item', check: true, }
      ], },
    ] });
  });

  it(`#case: ${actionTypes.CATALOG_ITEMS_RESET}`, () => {
    let state = {
      request: true,
      errorText: 'something',
      openedItem: 1,
      count: 2,
      list: [{ id: 1, child: []}]
    };
    state = reducer(state, {
      type: actionTypes.CATALOG_ITEMS_RESET,
      itemId: 1,
      status: false,
    });

    expect(state).toEqual({
      request: false,
      errorText: '',
      openedItem: 0,
      count: 0,
      list: []
    });
  });
});

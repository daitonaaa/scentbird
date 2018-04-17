import reducer from 'reducers/productInfo';
import * as actionTypes from 'constants/actionTypes';


describe('> > > REDUCER - productInfo.js', () => {

  it(`#case: ${actionTypes.PRODUCT_INFO_SET_DATA}`, () => {
    let state = { loading: false };
    state = reducer(state, {
      type: actionTypes.PRODUCT_INFO_SET_DATA,
      payload: { something: 'something' },
    });

    expect(state).toEqual({
      loading: false,
      something: 'something',
    });
  });

  it(`#case: ${actionTypes.PRODUCT_INFO_SET_LOADING_STATUS}`, () => {
    let state = { loading: false };
    state = reducer(state, {
      type: actionTypes.PRODUCT_INFO_SET_LOADING_STATUS,
      status: true,
    });

    expect(state).toEqual({ loading: true });
  });
});

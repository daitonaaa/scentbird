import {
  setProductInfo,
  resetProductInfo,
  setLoadingStatus,
} from 'actions/productInfo';
import * as actionTypes from 'constants/actionTypes';


describe('> > > ACTIONS - productInfo.js', () => {
  it('#action: setProductInfo', () => {
    expect(setProductInfo({}))
      .toEqual({
        type: actionTypes.PRODUCT_INFO_SET_DATA,
        payload: {}
      });
  });

  it('#action: resetProductInfo', () => {
    expect(resetProductInfo())
      .toEqual({
        type: actionTypes.PRODUCT_INFO_RESET,
      });
  });

  it('#action: setLoadingStatus', () => {
    expect(setLoadingStatus(true))
      .toEqual({
        type: actionTypes.PRODUCT_INFO_SET_LOADING_STATUS,
        status: true,
      });
  });
});


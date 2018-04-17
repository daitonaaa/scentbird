import { helpers } from 'utils';
import Immutable from 'immutable';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  loading: false,
  imageUrl: '',
  tax: 0,
  credit: 0,
  balance: 0,
  discount: 0,
  shipping: 0,
  subscription: 0,
  total: 0, // по уму бы на фронте посчитать, но не ясен алгоритм
});


function productInfo(state = initialState, action) {
  switch (action.type) {

    case actionTypes.PRODUCT_INFO_SET_LOADING_STATUS:
      return state.set('loading', action.status);

    case actionTypes.PRODUCT_INFO_SET_DATA:
      return state.merge({
        loading: false,
        ...action.payload
      });

    case actionTypes.PRODUCT_INFO_RESET:
      return initialState;

    default:
      return state;
  }
}

export default helpers.immutableize(productInfo);


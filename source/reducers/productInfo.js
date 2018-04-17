import { helpers } from 'utils';
import Immutable from 'immutable';

import * as actionTypes from 'constants/actionTypes';


const initialState = Immutable.fromJS({
  loading: false,
  // ...
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


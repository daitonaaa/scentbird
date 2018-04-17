import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import paymentForm from './paymentForm';
import productInfo from './productInfo';

export const reducers = {
  paymentForm,
  productInfo,
};

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

export default rootReducer;


import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import items from './items';

export const reducers = {
  items
};

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

export default rootReducer;


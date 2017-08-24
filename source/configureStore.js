import rootReducer from 'reducers';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Формируем главное хранилище
export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    devTools(
      applyMiddleware(
        routerMiddleware(browserHistory),
        thunkMiddleware
      )
    )
  );

  return store;
}

const devTools = process.env.NODE_ENV === 'production'
  ? middleware => middleware
  : composeWithDevTools;

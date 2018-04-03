import rootReducer from 'reducers';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createBrowserHistory  from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';

const history = createBrowserHistory();
const middleware = routerMiddleware(history);

// Формируем главное хранилище
export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    devTools(
      applyMiddleware(
        middleware,
        thunkMiddleware
      )
    )
  );

  return store;
}

const devTools = process.env.NODE_ENV === 'production'
  ? middleware => middleware
  : composeWithDevTools;

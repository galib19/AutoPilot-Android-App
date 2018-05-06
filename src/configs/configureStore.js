import {createStore, applyMiddleware} from 'redux';
import appReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// if multiple middleware exist just push ex: middleware.push(loggerMiddleWare)
if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

export default function configureStore() {
    const store = createStore(appReducer, applyMiddleware(...middleware));
    sagaMiddleware.run(rootSaga);
    return store;
}
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import phoneReducer from './store/reducers/phone'
import userReducer from './store/reducers/user'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    phoneReducer,
    userReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

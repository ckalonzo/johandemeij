import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import indexReducer from 'redux/reducers/index.reducer'
import {asyncDispatchMiddleware} from 'utils/reducerAsyncHelper'
import { loadState } from "utils/localStorage.js"

const persistedState = loadState();
const store = createStore(
    indexReducer,
    persistedState,
   composeWithDevTools(applyMiddleware(thunk,asyncDispatchMiddleware)),
);

window.screenChange = true;
//config.register().then(() => {
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
//});

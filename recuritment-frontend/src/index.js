import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store/storeConfig";
import { Route, BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import orgHome from './components/orgHome';

// include css
import './css/index.css';



ReactDOM.render(
    
    <Provider store={store}>
        <BrowserRouter>
            <Route  path="/" component={orgHome} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
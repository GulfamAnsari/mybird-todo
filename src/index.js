import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Axios from 'axios';
import { createStore } from 'redux';
import Reducer from './store/reducer';
import { Provider } from 'react-redux';

Axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
const store = createStore(Reducer);

ReactDOM.render(<Provider store={store}><App title="My Bird" /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

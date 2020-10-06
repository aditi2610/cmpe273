import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './js/store';


var url = "http://localhost:3001"
if (process.env.BACKEND_URL) {
    console.log("URL incoming from environment variable")
    url = process.env.BACKEND_URL;
}

const Constants = {
    BACKEND_URL: "http://localhost:3001",
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();

export default Constants
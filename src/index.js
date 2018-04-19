import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route} from 'react-router-dom';

const render = (
    <BrowserRouter>
        <Route path='/' name='Home' component={App} />
    </BrowserRouter>
);

ReactDOM.render(render, document.getElementById('root'));
registerServiceWorker();

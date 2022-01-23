import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/home' component={App}></Route>
            <Route component={()=><Redirect to='/home'/>}></Route>
        </Switch>
    </BrowserRouter>, 
    document.getElementById('root')
);

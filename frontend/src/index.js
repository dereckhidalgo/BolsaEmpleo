//Librerias necesarias
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//Paginas para llamar
import Inicio from './Inicio/Inicio';
import './index.css';
import App from './App';
import Admin from './admin/admin';
import Vacantes from './admin/vacantes';
import Login from './admin/Login';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Switch>
          <Route path="/inicio" component={Inicio}/>
          <Route path="/admin/" component={Vacantes}/>
          <Route path="/login" component={Login}/>
          <Redirect from="/" to="/inicio" />
        </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


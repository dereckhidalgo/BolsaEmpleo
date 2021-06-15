import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Admin from './admin/admin'
import Create from './admin/create'
import Admin_Vacante from './admin/vacantes'


ReactDOM.render(
  <React.StrictMode>
    <Admin_Vacante />
  </React.StrictMode>,
  document.getElementById('root')
);


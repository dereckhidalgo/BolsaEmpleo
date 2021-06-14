import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Admin from './admin/admin'
import Create from './admin/create'

ReactDOM.render(
  <React.StrictMode>
    <Create />
  </React.StrictMode>,
  document.getElementById('root')
);


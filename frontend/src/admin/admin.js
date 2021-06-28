import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Components/Navbar';
import Usuarios from '../admin/usuarios';
import Vacantes from '../admin/vacantes';
import Categorias from '../admin/categoria';

function Admin() {
    return (
      <>
      <Navbar/>
      <hr/>
      <center>
      <h1>ADMINISTRAR VACANTES</h1>
      </center>
      <hr/>
      <Vacantes/>
      <hr/>
      <center>
      <h1>ADMINISTRAR USUARIOS</h1>
      </center>
      <hr/>
      <Usuarios/><br/>
      <hr/>
      <center>
      <h1>ADMINISTRAR CATEGORIAS</h1>
      </center>
      <hr/>
      <Categorias/>
      </>
    );
  }
  
  export default Admin;
  
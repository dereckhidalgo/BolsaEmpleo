import React,{useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Components/Navbar';
import Usuarios from '../admin/usuarios';
import Vacantes from '../admin/vacantes';
import Categorias from '../admin/categoria';
import axios from 'axios';
import {Link} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';

function Admin() {
    const URL = "https://localhost:44375/api/Postulaciones";
    const [data,setData]= useState([])

    const [gestorseleccionado, setGestorseleccionado] = useState({
        id:'',
        nombre:''
    })
   
    const peticionGet= async()=>{
        await axios.get(URL)
        .then(response =>{
            setData(response.data);
        }).catch(error=>{
            console.log(error)
        });
    }

    useEffect(()=>{
        peticionGet()
    },[])


    return (
      <>
      <Navbar/>
      <br/>
      <h6 style={{marginLeft:"10%"}}>Postulaciones existentes:</h6>
      <Link to="/postular" style={{marginLeft:"10%"}}><button className="btn btn-secondary">{data.length}{"   "}{<VisibilityIcon/>} ver </button></Link>
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
  
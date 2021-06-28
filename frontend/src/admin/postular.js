import React , { useState, useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import {Modal, ModalBody,ModalFooter,ModalHeader} from 'reactstrap'

function ListaPostulaciones() {
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
      <div className="create">
          <br/>
          
          <br></br>
          <table className="table table-bordered">
            <thead>
                <tr>
                    <th> ID</th>
                    <th> Usuario</th>
                    <th> Vacante</th>
                    <th> Fecha de Postulacion</th>

                </tr>
            </thead>
            <tbody>
                {data.map(g=>(
                   <tr key={g.id}>
                      <td>{g.id}</td> 
                      <td>{g.iD_USUARIO_FK}</td>
                      <td>{g.iD_VACANTE_FK}</td>
                      <td>{g.fechA_POSTULACION}</td>
                   </tr> 
                ))}
            </tbody>
          </table>

      </div>
      </>
    );
  }
  export default ListaPostulaciones;
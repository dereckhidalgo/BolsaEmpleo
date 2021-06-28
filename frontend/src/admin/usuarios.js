import React , { useState, useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import {Modal, ModalBody,ModalFooter,ModalHeader} from 'reactstrap'

function ListaUsuario() {
    const URL = "https://localhost:44375/api/Usuarios";
    const [data,setData]= useState([])
    const [modalEliminar, setModalEliminar]=useState(false);

    const [gestorseleccionado, setGestorseleccionado] = useState({
        id:'',
        nombre:''
    })
   
    
    const controlModalEliminar=()=>{
        setModalEliminar(!modalEliminar)
    }

    const peticionGet= async()=>{
        await axios.get(URL)
        .then(response =>{
            setData(response.data);
        }).catch(error=>{
            console.log(error)
        });
    }

    const peticionDelete= async()=>{
        await axios.delete(URL+"/"+gestorseleccionado.id)
        .then(response =>{
           setData(data.filter(gestor=> gestor.id!==response.data));
            controlModalEliminar();
        }).catch(error=>{
            console.log(error)
        });
    }

    const seleccionarGestor=(gestorr,caso)=>{
        setGestorseleccionado(gestorr);
        (caso==="Eliminar")&&
        controlModalEliminar();
    }
    useEffect(()=>{
        peticionGet()
    },[])
    return (
      <>
      <div className="create">
          <br/><center>
          <table className="table table-bordered" style={{width:"80%"}}>
            <thead>
                <tr>
                    <th> ID</th>
                    <th> Nombre</th>
                    <th> Apellido</th>
                    <th> Direccion</th>
                    <th> Numero de Telefono</th>
                    <th> Biografia</th>
                    <th> Correo</th>
                    <th> Acciones</th>

                </tr>
            </thead>
            <tbody>
                {data.map(g=>(
                   <tr key={g.id}>
                      <td>{g.id}</td> 
                      <td>{g.nombre}</td>
                      <td>{g.apellido}</td>
                      <td>{g.direccion}</td>
                      <td>{g.numerO_TEL}</td>
                      <td>{g.biografia}</td>
                      <td>{g.correo}</td>
                      <td>
                          <button className="btn btn-dark"onClick={()=>seleccionarGestor(g,'Eliminar')}>Eliminar</button>
                      </td>
                   </tr> 
                ))}
            </tbody>
          </table>
          </center>
          <Modal isOpen={modalEliminar}>
              
              <ModalBody>
                  Estas seguro que desea eliminar el Usuario {gestorseleccionado && gestorseleccionado.nombre} ?
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-primary"onClick={()=>peticionDelete()} >Si</button> {""}
                <button className="btn btn-secondary" onClick={()=>controlModalEliminar()} >No</button>
              </ModalFooter>
          </Modal>

      </div>
      </>
    );
  }
  export default ListaUsuario;
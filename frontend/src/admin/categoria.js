import React , { useState, useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import {Modal, ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import swal from 'sweetalert';


function ListaCategoria() {
    const URL = "https://localhost:44375/api/Categoria";
    const [data,setData]= useState([])
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);

    const AlertaRegistrado=()=>{
        swal({
            title:"Categoria Registrada!",
            icon:"success",
            button:"Aceptar",
        })
    }
    const AlertaEditada=()=>{
        swal({
            title:"Categoria Editada!",
            icon:"success",
            button:"Aceptar",
        })
    }
    const AlertaEliminado=()=>{
        swal({
            title:"Categoria Eliminada!",
            icon:"success",
            button:"Aceptar",
        })
    }
    const [gestorseleccionado, setGestorseleccionado] = useState({
        id:'',
        nombre:''
    })
    const handleChange=e=>{
        const {name,value}=e.target;
        setGestorseleccionado({
            ...gestorseleccionado,
            [name]:value
        })
        console.log(gestorseleccionado);
    }

    const controlModalInsertar=()=>{
        setModalInsertar(!modalInsertar)
    }
    const controlModalEditar=()=>{
        setModalEditar(!modalEditar)
    }
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

    const peticionPost= async()=>{
        delete gestorseleccionado.id
        await axios.post(URL, gestorseleccionado)
        .then(response =>{
            setData(data.concat(response.data));
            AlertaRegistrado();
            controlModalInsertar();
        }).catch(error=>{
            console.log(error)
        });
    }
    const peticionPut= async()=>{
        await axios.put(URL+"/"+gestorseleccionado.id, gestorseleccionado)
        .then(response =>{
            var respuesta = response.data;
            var dataAux = data
            dataAux.map(gestor =>{
                if(gestor.id===gestorseleccionado.id)
                {
                    gestor.nombre=respuesta.nombre;
                }

            })
            AlertaEditada();
            controlModalEditar();
        }).catch(error=>{
            console.log(error)
        });
    }

    const peticionDelete= async()=>{
        await axios.delete(URL+"/"+gestorseleccionado.id)
        .then(response =>{
           setData(data.filter(gestor=> gestor.id!==response.data));
           AlertaEliminado();
            controlModalEliminar();
        }).catch(error=>{
            console.log(error)
        });
    }

    const seleccionarGestor=(gestorr,caso)=>{
        setGestorseleccionado(gestorr);
        (caso==="Editar")?
        controlModalEditar():controlModalEliminar() ;
    }
    useEffect(()=>{
        peticionGet()
    },[])
    return (
      <>
      <div className="create">
          <br/>
          <center>
          <table className="table table-bordered" style={{width:"80%"}}>
            <thead>
                <tr>
                    <th> ID</th>
                    <th> Nombre</th>
                    <th> Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map(g=>(
                   <tr key={g.id}>
                      <td>{g.id}</td> 
                      <td>{g.nombre}</td>
                      <td>
                          <button className="btn btn-info" onClick={()=>seleccionarGestor(g,'Editar')}>Editar</button> {""}
                          <button className="btn btn-dark"onClick={()=>seleccionarGestor(g,'Eliminar')}>Eliminar</button>

                      </td>
                   </tr> 
                ))}
            </tbody>
          </table>
          </center>
          <button onClick={()=>controlModalInsertar()} className=" btn btn-light" style={{marginLeft:"10%"}}>Agregar Categoria</button>
          <br/>
          <br/>
          <Modal isOpen={modalInsertar}>
              <ModalHeader> Agregar Categoria</ModalHeader>
              <ModalBody>
                  <div className="form-group">
                      <label>Nombre Categoria</label>
                      <br/>
                      <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
                  </div>
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-primary" onClick={()=>peticionPost()}>Guardar</button> {""}
                <button className="btn btn-danger" onClick={()=>controlModalInsertar()}>Cancelar</button>
              </ModalFooter>
          </Modal>

          <Modal isOpen={modalEditar}>
              <ModalHeader> Editar Categoria</ModalHeader>
              <ModalBody>
                  <div className="form-group">
                      <label>ID:</label>
                      <input type="text" className="form-control" name="nombre" readOnly/>
                      <label>Nombre Categoria:</label>
                      <br/>
                      <input type="text" className="form-control" name="nombre" onChange={handleChange} value ={gestorseleccionado && gestorseleccionado.nombre}/>
                  </div>
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button> {""}
                <button className="btn btn-danger" onClick={()=>controlModalEditar()}>Cancelar</button>
              </ModalFooter>
          </Modal>

          <Modal isOpen={modalEliminar}>
              
              <ModalBody>
                  Estas seguro que desea eliminar de la Categoria {gestorseleccionado && gestorseleccionado.nombre} ?
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
  export default ListaCategoria;
import React , { useState, useEffect, Component}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import {Modal, ModalBody,ModalFooter,ModalHeader} from 'reactstrap'


function ListaVacantes() {

    const URL = "https://localhost:44375/api/Vacante";
    const [data,setData]= useState([])
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);

   
    const [gestorseleccionado, setGestorseleccionado] = useState({
        id:'',
        compania:'',
        tipo:'',
        urL_LOGO:'',
        Url_O:'',
        posicion:'',
        iD_CATEGORIA_FK:'',
        ubicacion:'',
        descripcion:'',
        fechA_PUBLICACION:''
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
            console.log(data)
        }).catch(error=>{
            console.log(error)
        });
    }

    const peticionPost= async()=>{
        delete gestorseleccionado.id
        gestorseleccionado.tipo=parseInt(gestorseleccionado.tipo);
        gestorseleccionado.iD_CATEGORIA_FK=parseInt(gestorseleccionado.iD_CATEGORIA_FK);
       
        await axios.post(URL, gestorseleccionado)
        .then(response =>{
            setData(data.concat(response.data));
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
                    gestor.compania=respuesta.compania;
                    gestor.tipo = respuesta.tipo;
                    gestor.urL_LOGO=respuesta.urL_LOGO
                    gestor.Url_O=respuesta.Url_O
                    gestor.posicion=respuesta.posicion
                    gestor.iD_CATEGORIA_FK=respuesta.iD_CATEGORIA_FK
                    gestor.ubicacion=respuesta.ubicacion
                    gestor.descripcion=respuesta.descripcion
                    gestor.fechA_PUBLICACION=respuesta.fechA_PUBLICACION

                }
            })
            controlModalEditar();
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
        (caso==="Editar")?
        controlModalEditar():controlModalEliminar() ;
    }
    useEffect(()=>{
        peticionGet()
    },[])
   
    return (
      <>
      <div>
      <center>
      <div className="create" style={{width:"80%"}}>
          <br/>
          <table className="table table-bordered">
            <thead>
                <tr>
                    <th> ID</th>
                    <th> Compania</th>
                    <th> Tipo</th>
                    <th> Logo</th>
                    <th> Posicion</th>
                    <th> Ubicacion</th>
                    <th> Descripcion</th>
                    <th> Fecha_Publicacion</th>
                    <th>Acciones </th>
                </tr>
            </thead>
            <tbody>
                {data.map(g=>(
                   <tr key={g.id}>
                      <td>{g.id}</td> 
                      <td>{g.compania}</td>
                      <td>{g.tipo}</td>
                      <td><img src={g.urL_LOGO}width="70px" height="70px"/></td>
                      <td>{g.posicion}</td>
                      <td>{g.ubicacion}</td>
                      <td>{g.descripcion}</td>
                      <td>{g.fechA_PUBLICACION}</td>
                      <td>
                          <button className="btn btn-info" onClick={()=>seleccionarGestor(g,'Editar')}>Editar</button> {""}
                          <button className="btn btn-dark"onClick={()=>seleccionarGestor(g,'Eliminar')}>Eliminar</button>
                      </td>
                   </tr> 
                ))}
            </tbody> 
          </table>
          </div>
          </center>

          <button onClick={()=>controlModalInsertar()} className=" btn btn-light" style={{marginLeft:"10%"}}>Agregar Vacante</button>                    
          <Modal isOpen={modalInsertar} className="modal-lg 3500px">
              <ModalHeader> Agregar Vacante</ModalHeader>
              <ModalBody>
                  <div className="form-group row">
                      <div class="form-group col-md-6">
                      <label>Compania</label>
                      <br/>
                      <input type="text" className="form-control" name="compania" onChange={handleChange}/>
                      </div>
                      <div class="form-group col-md-6">
                      <label>Tipo</label>
                      <br/>
                      <input type="text" className="form-control" name="tipo" onChange={handleChange}/>
                      </div>
                      <br></br>
                      <div class="form-group col-md-6">
                      <label>Logo</label>
                      <br/>
                      <input type="text" className="form-control" name="urL_LOGO" onChange={handleChange}/>
                      </div>
                      <br></br>
                      <div class="form-group col-md-6">
                      <label>Posicion</label>
                      <br/>
                      <input type="text" className="form-control" name="posicion" onChange={handleChange}/>
                      </div>
                      <div class="form-group col-md-6">
                      <label>Categoria</label>
                      <br/>
                      <input type="text" className="form-control" name="iD_CATEGORIA_FK" onChange={handleChange}/>
                      </div>
                      <br></br>
                      <div class="form-group col-md-7">
                      <label>Ubicacion</label>
                      <br/>
                      <textarea className="form-control" name="ubicacion" onChange={handleChange}></textarea>
                      </div>
                      <br></br>
                      <br></br>
                      <div class="form-group col-md-7">
                      <label>Descripcion</label>
                      <br/>
                      <textarea className="form-control" name="descripcion" onChange={handleChange}></textarea>
                      </div>
                      <br></br>
                      <div class="form-group col-md-7">
                      <label>Fecha de Publicacion</label>
                      <br/>
                      <input type="date" className="form-control" name="fechA_PUBLICACION" onChange={handleChange}/>
                      </div>  
                      </div>
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-info" onClick={()=>peticionPost()}>Guardar</button> {""}
                <button className="btn btn-dark" onClick={()=>controlModalInsertar()}>Cancelar</button>
              </ModalFooter>
          </Modal>

          <Modal isOpen={modalEditar} className="modal-lg 3500px">
              <ModalHeader> Editar Categoria</ModalHeader>
              <ModalBody>
                  <div className="form-group row">
                      <div class="form-group col-md-6">
                      <label>Compania</label>
                      <br/>
                      <input type="text" className="form-control" name="compania" onChange={handleChange} value ={gestorseleccionado && gestorseleccionado.compania}/>
                      </div>
                      <div class="form-group col-md-6">
                      <label>Tipo</label>
                      <br/>
                      <input type="text" className="form-control" name="tipo" onChange={handleChange} value ={gestorseleccionado && gestorseleccionado.tipo}/>
                      </div>
                      <br></br>
                      <div class="form-group col-md-6">
                      <label>Logo</label>
                      <br/>
                      <input type="text" className="form-control" name="urL_LOGO" onChange={handleChange} value ={gestorseleccionado && gestorseleccionado.urL_LOGO}/>
                      </div>
                      <br></br>
                      <div class="form-group col-md-6">
                      <label>Posicion</label>
                      <br/>
                      <input type="text" className="form-control" name="posicion" onChange={handleChange}  value ={gestorseleccionado && gestorseleccionado.posicion}/>
                      </div>
                      <div class="form-group col-md-7">
                      <label>Categoria</label>
                      <br/>
                      <input type="text" className="form-control" name="iD_CATEGORIA_FK" onChange={handleChange}  value ={gestorseleccionado && gestorseleccionado.iD_CATEGORIA_FK}/>
                      </div>
                      <br></br>
                      <div class="form-group col-md-7">
                      <label>Ubicacion</label>
                      <br/>
                      <textarea className="form-control" name="ubicacion" onChange={handleChange}  value ={gestorseleccionado && gestorseleccionado.ubicacion}></textarea>
                      </div>
                      <br></br>
                      <br></br>
                      <div class="form-group col-md-7">
                      <label>Descripcion</label>
                      <br/>
                      <textarea className="form-control" name="descripcion" onChange={handleChange}  value ={gestorseleccionado && gestorseleccionado.descripcion}></textarea>
                      </div>
                      <br></br>
                      <div class="form-group col-md-7">
                      <label>Fecha de Publicacion</label>
                      <br/>
                      <input type="date" className="form-control" name="fechA_PUBLICACION" onChange={handleChange}  value ={gestorseleccionado && gestorseleccionado.fechA_PUBLICACION}/>
                      </div>
                  </div>
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-info" onClick={()=>peticionPut()}>Editar</button> {""}
                <button className="btn btn-dark" onClick={()=>controlModalEditar()}>Cancelar</button>
              </ModalFooter>
          </Modal>

          <Modal isOpen={modalEliminar}>
              
              <ModalBody>
                  Estas seguro que desea eliminar de la Vacante: {gestorseleccionado && gestorseleccionado.compania} ?
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-info"onClick={()=>peticionDelete()} >Si</button> {""}
                <button className="btn btn-dark" onClick={()=>controlModalEliminar()} >No</button>
              </ModalFooter>
          </Modal>

      </div>
      </>
    );
  }
  export default ListaVacantes;
  
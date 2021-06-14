import React, {useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal,ModalBody,ModalHeader, ModalFooter} from 'reactstrap';
import swal from 'sweetalert';



function Tables() {
  const URL = "https://localhost:44375/api/Roles";
  //----------------------------------DEFINICIONES------------------------------
  const [data, setData]=useState([]);
  const [RolSeleccionado, setRolSeleccionado]=useState({
    id: '',
    nombre: '',
  });
  const [modalInsertar,setModalInsertar]=useState(false);
  const [modalEditar,setModalEditar]=useState(false);

//--------------------------------------------FUNCIONES------------------------
  const ToggleModal =()=>{
    setModalInsertar(!modalInsertar);
  }
  const ToggleModalEditar =()=>{
    setModalEditar(!modalEditar);
  }
  //---------------------------------------Mostrar Peliculas
  const GetRol=async()=>{
    await axios.get(URL)
    .then(response=>{
      setData(response.data);
      console.log(data);
    }).catch(error => {
      console.log(error);   
    })
  }
  
//-----------------------------------------
  const AgregarPeliculas=async()=>{
    delete RolSeleccionado.id;
    await axios.post(URL,RolSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      swal("Correcto!", "El Rol ha sido añadido!", "success");
      ToggleModal();
    }).catch(error => {
      console.log(error);   
    })
  }

  //----------Conseguir Pelicula para edit y Eliminar
  const SeleccionarRol =(Rol,accion)=>{
    setRolSeleccionado(Rol);
    console.log(Rol);
    if(accion==="Editar"){
      ToggleModalEditar();
    }else{
      swal({
        title: "¿Está seguro?",
        text: "Una vez borrado, No podrás recuperar este archivo.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Rol eliminado!", {
            icon: "success",
            
          });
          EliminarPelicula(Rol.id);
        } else {
          swal("Acción descartada!");
        }
      });
    }
  }
  //----------------------------EDITAR PELICULA
  const EditarPelicula=async()=>{
    await axios.put(URL+"/"+RolSeleccionado.ID,RolSeleccionado)
    .then(response=>{
      var respuesta = response.data;
      var dato = data;
      dato.map(dat =>{
        if(dat.id===RolSeleccionado.id){
          dat.nombre = respuesta.nombre; 
        }
      })
      swal("Correcto!", "El rol ha sido editado!", "success");
      ToggleModalEditar();
    }).catch(error => {
      console.log(error);   
    })
  }
  //---------------------Eliminar Pelicula
  const EliminarPelicula=async(id)=>{
    console.log(id);
    await axios.delete(URL+"/"+id)
    .then(response=>{
      setData(data.filter(Rol=>Rol.id !== response.data))
      GetRol();
    }).catch(error => {
      console.log(error);   
    })
  }
  //---Manejar cada cambio en los inputs
  const ControlarInputs =e=>{
    const {name, value}=e.target;
    if(name==="video"){
      setRolSeleccionado({
        ...RolSeleccionado,
        [name]:value
      });
    }else{
      setRolSeleccionado({
        ...RolSeleccionado,
        [name]:value
      });
    }
    console.log(RolSeleccionado);
  }


  useEffect(()=>{
    GetRol(); 
  },[])


  return (
    <>
      <div className="App">
      <br/>
      <br/>
      <button style={{marginLeft:"20%"}} className="btn btn-secondary Agregar" onClick={()=>ToggleModal()}>Añadir</button>
      <br/>
      <br/>
      <div className="Tabla">
    <table className="table table-bordered table-striped table-hover">
      <thead className="HeaderTable text-center">
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className="BodyTable text-center">
        {data.map(dato=>(
          <tr key={dato.id}>
            <td>dato.id</td>
            <td>{dato.nombre}</td>
          </tr>
        ))}
      </tbody>
    </table>


    <Modal isOpen={modalInsertar}>
      <ModalHeader>Añadir Pelicula</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Titulo:</label>
          <input type="text" name="titulo" className="form-control text-dark" placeholder="Ex: Liga de la justicia" onChange={ControlarInputs}/>
          <textarea rows="4" cols="50" name="descripcion" className="form-control text-dark" placeholder="Ex: La pelicula trata de..." onChange={ControlarInputs}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-info" onClick={()=>AgregarPeliculas()}><i className="tim-icons icon-check-2"/> Insertar</button>
        <button className="btn btn-danger" onClick={()=>ToggleModal()}><i className="tim-icons icon-simple-remove"/> Cancelar</button>
      </ModalFooter>
    </Modal>

<center>
    <Modal className="Modal" isOpen={modalEditar}>
      <ModalHeader>Actualizar Pelicula</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>ID:</label>
          <input type="text" name="idPelicula" className="form-control text-light" readOnly   value={RolSeleccionado && RolSeleccionado.id} onChange={ControlarInputs}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-info glyphicon glyphicon-pencil" onClick={()=>EditarPelicula()}> <i className="tim-icons icon-check-2"/> Guardar</button>
        <button className="btn btn-danger" onClick={()=>ToggleModalEditar()}><i className="tim-icons icon-simple-remove"/> Cancelar</button>
      </ModalFooter>
    </Modal>
    </center>
    </div>
    </div>
    </>
  );
}

export default Tables;

import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import '../admin/Login.css';
import swal from 'sweetalert';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {Modal, ModalBody,ModalFooter,ModalHeader} from 'reactstrap';



export default function Login(props) {
  const URL = "https://localhost:44375/api/usuarios";

  const cookies = new Cookies();
  const [form, setForm]=useState({
    nombre:'',
    contra:'',
    id:'',
    apellido:'',
    fechA_NACIMIENTO:'',
    direccion:'',
    numerO_TEL:'',
    biografia:'',
    correo:'',
    url_IMG_PERFIL:'',
    ID_ROL_FK:'',
  });

  const handleChange =e=>{
    const {name,value}= e.target;
    setForm({
      ...form,
      [name]:value
    })
  }
  //--------------------------Ver que los campos esten llenos-----------------------------
  const validarFormulario=()=>{
    if(form.nombre==="" || form.contra===""){
      swal(`Todos los campos son obligatorios!`, "Pruebe otra vez!", "error");
    }else{
      IniciarSesion();
    }
  }
  //-------------------------------------Iniciar sesion------------------------------------
  const IniciarSesion =async()=>{
    await axios.get(URL+`/${form.nombre}/${form.contra}`)
    .then(response=>{
      return response.data;
    }).then(response=>{
      if(response.length>0){
        let respuesta = response[0];
        cookies.set('id',respuesta.id, {path:'/'});
        cookies.set('nombre',respuesta.nombre,{path: '/'});
        cookies.set('correo',respuesta.correo,{path: '/'});
        cookies.set('contra',respuesta.contra,{path: '/'});
        console.log(cookies);
        console.log(props);
        swal(`Bienvenido ${respuesta.nombre}!`, "Disfrute!", "success");
        props.history.push('/admin');
      }else{
        swal("Datos invalidos!", "Intente otra vez!", "info");
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  //------------------------------CONTROLAR ENTRADAS DONDE NO DEBE----------------------------------------
  useEffect(() => {
    if(cookies.get('id')){
      props.history.push('/admin');
    }else{
      props.history.push('/login');
    }
  }, [])
  const [gestorseleccionado, setGestorseleccionado] = useState({
    
   
   

})
const [data, setData]=useState([]);

const [modalInsertar,setModalInsertar]=useState(false);
const controlModalInsertar=()=>{
  setModalInsertar(!modalInsertar)
 }


 const peticionPostt= async()=>{
  delete form.id
  form.ID_ROL_FK=3
  await axios.post(URL, form)
  .then(response =>{
      setData(data.concat(response.data));
      controlModalInsertar();
  }).catch(error=>{
      console.log(error)
  });
}


  return (
    <div className="todo">
      <nav className="flex">
        <li>HIRED{"  |"}</li>
        <li><Link to="/inicio">Inicio</Link></li>
        <li></li>

      </nav>
      <center>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4 contenedor-principal">
              <div className="relative cuadro flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6 Cabecera-login">
                  <div className="text-center mb-3">
                    <h6 className="text-sm titulo-cabecera" >
                      Iniciar Sesión
                    </h6>
                  </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0 Body-login">
                  <form id="formulario">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Nombre de Usuario
                      </label>
                      <input
                      name="nombre"
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        placeholder="ex: Fulanito06"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2 pswrd"
                        htmlFor="grid-password"
                      >
                      Contraseña
                      </label>
                      <br/>
                      <input
                      name="contra"
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        placeholder="**********"
                      />
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="boton-login bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        onClick={()=>validarFormulario()}
                        type="button"
                      >
                        Iniciar Sesion
                      </button>
                    </div>
                    <br></br>
                    <p onClick={()=>controlModalInsertar()}>Registrar</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        </center>
        <Modal isOpen={modalInsertar} className="modal-lg 3500px">
           <ModalHeader>
               <center>
                   <h3 style={{marginLeft:'0%',fontFamily:'monospace',color:'#19A7AE'}}> Agregar usuarios</h3>
               </center>
           </ModalHeader>
            <ModalBody>
            
            <div className="form-group row">
                      <div class="form-group col-md-6">
                      <label>Nombre</label>
                      <br/>
                      <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
                      </div>
                      <div class="form-group col-md-6">
                      <label>Apellido</label>
                      <br/>
                      <input type="text" className="form-control" name="apellido" onChange={handleChange}/>
                      </div>
                      <br></br>
                      <div class="form-group col-md-6">
                      <label>Fecha de Nacimiento</label>
                      <br/>
                      <input type="date" className="form-control" name="fechA_NACIMIENTO" onChange={handleChange}/>
                      </div>
                      <br></br>
                      <div class="form-group col-md-6">
                      <label>Direccion</label>
                      <br/>
                      <input type="text" className="form-control" name="direccion" onChange={handleChange}/>
                      </div>
                      <div class="form-group col-md-6">
                      <label>Telefono</label>
                      <br/>
                      <input type="text" className="form-control" name="numerO_TEL" onChange={handleChange}/>
                      </div>
                      <br></br>
                      <div class="form-group col-md-6">
                      <label>Biografia</label>
                      <br/>
                      <textarea className="form-control" name="biografia" onChange={handleChange}></textarea>
                      </div>
                      <br></br>
                      <br></br>
                      <div class="form-group col-md-6">
                      <label>Correo</label>
                      <br/>
                      <input type="text" className="form-control" name="correo" onChange={handleChange}/>
                      </div>
                      <br></br>
                      <div class="form-group col-md-6">
                      <label>Imagen Perfil</label>
                      <br/>
                      <input type="text" className="form-control" name="url_IMG_PERFIL" onChange={handleChange}/>
                      </div>
                      <div class="form-group col-md-6">
                      <label>Clave</label>
                      <br/>
                      <input type="text" className="form-control" name="contra" onChange={handleChange}/>
                      </div>  
                      </div>
            </ModalBody>

            <ModalFooter>
              <button className="btn btn-info" onClick={()=>peticionPostt()} >Agregar</button> {""}
             <button className="btn btn-dark" onClick={()=>controlModalInsertar()}>Cancelar</button>
            </ModalFooter>
    </Modal>
      </div>
  );
}

import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import '../admin/Login.css';
import swal from 'sweetalert';
import axios from 'axios';
import Cookies from 'universal-cookie';


export default function Login(props) {
  const URL = "https://localhost:44375/api/usuarios";
  const cookies = new Cookies();
  const [form, setForm]=useState({
    nombre:'',
    contra:''
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        </center>
      </div>

  );
}

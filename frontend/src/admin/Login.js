import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import '../admin/Login.css';



export default function Login(props) {
  return (
    <div className="todo">
      <nav className="flex">
        <li>HIRED{"  |"}</li> 
        <li><Link to="/inicio">Inicio</Link></li>
        <li></li>
      </nav>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4 contenedor-principal">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
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
                      name="Nombre"
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="ex: Fulanito06"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Contraseña
                      </label>
                      <input
                      name="Password"
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="**********"
                      />
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="boton-login bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
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
      </div>
  );
}

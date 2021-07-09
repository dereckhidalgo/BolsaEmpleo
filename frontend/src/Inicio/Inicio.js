import React,{useEffect,useState} from 'react';
import {Modal, ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import Portada from '../imgs/Portada.jpg';
import axios from 'axios';
import Footer from '../Components/Footer';
import swal from 'sweetalert';
import Navbar from '../Components/Navbar';


function Inicio() {
    const URL = "https://localhost:44375/api/Vacante";
    const URL2 = "https://localhost:44375/api/Postulaciones";
    const URL3 = "https://localhost:44375/api/usuarios"
    const Alerta=()=>{
        swal({
            title:"Solicitud enviada!",
            icon:"success",
            button:"Aceptar",
        })
    }
    const [data, setData]=useState([]);
    const [datos,setDatos]= useState([])
    const [VacanteSeleccionada, setVacanteSeleccionada]=useState({
        id: '',
        compania: '',
        tipo:'',
    });
    const [nuevo, setNuevo] = useState([]);
    const [modalInsertar,setModalInsertar]=useState(false);
    const [modalEditar,setModalEditar]=useState(false);
    const [modalDetalles, setModalDetalles]=useState(false);
    const [modalPostular, setModalPostular]=useState(false);
    const [modalver, setModalver]=useState(false);


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
        fechA_PUBLICACION:'',
        iD_USUARIO_FK:'',
        iD_VACANTE_FK:'',
        fechA_POSTULACION:'',

        nombre:'',
        apellido:'',
        fechA_NACIMIENTO:'',
        direccion:'',
        numerO_TEL:'',
        biografia:'',
        correo:'',
        url_IMG_PERFIL:'',
        ID_ROL_FK:'',



    })
    const seleccionarGestor=(gestorr,caso)=>{
        setGestorseleccionado(gestorr);
        console.log(gestorseleccionado);
        if(caso==="Detalles"){
            controlModalDetalles();
        }
    }
    const controlModalVer=()=>{
        setModalver(!modalver)
       }
    
    const controlModalInsertar=()=>{
        setModalInsertar(!modalInsertar)
       }
    const controlModalDetalles=()=>{
        setModalDetalles(!modalDetalles)
       }

    const controlModalPostular=()=>{
        setModalPostular(!modalPostular)
        if(modalDetalles==true){
            setModalDetalles(!modalDetalles)
        }
       }

       const peticionPostt= async()=>{
        delete gestorseleccionado.id
        gestorseleccionado.ID_ROL_FK=2
        gestorseleccionado.ID_ROL_FK=parseInt(gestorseleccionado.ID_ROL_FK);
        await axios.post(URL3, gestorseleccionado)
        .then(response =>{
            setData(data.concat(response.data));
            controlModalInsertar();
        }).catch(error=>{
            console.log(error)
        });
    }

    const GetVacante=async()=>{
        await axios.get(URL)
        .then(response=>{
          setData(response.data);
        }).catch(error => {
          console.log(error);
        })
      }
      const peticionGet= async()=>{
        await axios.get(URL3)
        .then(response =>{
            setDatos(response.data);
            console.log(datos)
        }).catch(error=>{
            console.log(error)
        });
    }

      const peticionPost= async()=>{
        gestorseleccionado.iD_USUARIO_FK=parseInt(gestorseleccionado.iD_USUARIO_FK);
        console.log(gestorseleccionado.iD_USUARIO_FK);
        gestorseleccionado.iD_VACANTE_FK=parseInt(gestorseleccionado.id);
        delete gestorseleccionado.id;
        await axios.post(URL2, gestorseleccionado)
        .then(response =>{
            setData(data.concat(response.data));
            Alerta();
            controlModalPostular();
        }).catch(error=>{
            console.log(error)
        });
    }
      const handleChange=e=>{
        const {name,value}=e.target;
        setGestorseleccionado({
            ...gestorseleccionado,
            [name]:value
        })
        console.log(gestorseleccionado);
    }
      const ControlarInputs =e=>{
        const {name, value}=e.target;
          setVacanteSeleccionada({
            ...VacanteSeleccionada,
            [name]:value
          });
          console.log(VacanteSeleccionada);
        }

    useEffect(()=>{
        GetVacante();
        peticionGet();
        console.log(datos)
      },[])

    return (
      <>
      <Navbar/>
        <div >
            <img src={Portada} width='100%' style={{opacity:""}}></img>
            <div style={{top:'86px', position:'absolute',width:'100%', background:'black',opacity:'50%',height:"90.2%"}}>

            </div>
            <div style={{top:"40%",left:"30%",position:'absolute', color:"white"}}>
                <h1 style={{color:"white"}}>TU <i style={{color:'#19A7AE'}}>FUTURO</i> EMPIEZA AQUI</h1>
            </div>
        </div>
        <h1 style={{margin:'5% 32%'}}>VACANTES DISPONIBLES</h1>
        <div style={{width:'80%', margin:'5% 10%'}}>
        <hr/>
            <h4 style={{marginLeft:'42%',fontFamily:'monospace',color:'#19A7AE'}}>FULL-TIME</h4>
        <hr/>
        <table className="table table-bordered table-hover" id="Vacantes">
            <thead className="HeaderTable text-center table-secondary">
                <tr>
                    <th>Compañía</th>
                    <th>Ubicación</th>
                    <th>Posición</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody className="BodyTable text-center">
                {data.map(dato=>(
                    dato.tipo===1
                    ?
                    <tr>
                        <td>{dato.compania}</td>
                        <td>{dato.ubicacion}</td>
                        <td>{dato.posicion}</td>
                        <td><button className="btn btn-info" onClick={()=>seleccionarGestor(dato,"Detalles")}>Ver más...</button> {""}</td>
                    </tr>
                    :""
                ))}
            </tbody>
        </table>
        <hr style={{marginTop:'7%'}}/>
            <h4 style={{marginLeft:'42%',fontFamily:'monospace',color:'#19A7AE'}}>PART-TIME</h4>
        <hr/>
        <table className="table table-bordered table-hover">
            <thead className="HeaderTable text-center table-secondary">
                <tr>
                    <th>Compañía</th>
                    <th>Ubicación</th>
                    <th>Posición</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody className="BodyTable text-center">
                {data.map(dato=>(
                    dato.tipo===2
                    ?
                    <tr>
                        <td>{dato.compania}</td>
                        <td>{dato.ubicacion}</td>
                        <td>{dato.posicion}</td>
                        <td><button className="btn btn-info"  onClick={()=>seleccionarGestor(dato,"Detalles")}>Ver más...</button> {""}</td>
                    </tr>
                    :""
                ))}
            </tbody>
        </table>
        <hr style={{marginTop:'7%'}}/>
            <h4 style={{marginLeft:'42%', fontFamily:'monospace',color:'#19A7AE'}}>Freelance</h4>
        <hr/>
        <table className="table table-bordered table-hover">
            <thead className="HeaderTable text-center table-secondary">
                <tr>
                    <th>Compañía</th>
                    <th>Ubicación</th>
                    <th>Posición</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody className="BodyTable text-center">
                {data.map(dato=>(
                    dato.tipo===3
                    ?
                    <tr>
                        <td>{dato.compania}</td>
                        <td>{dato.ubicacion}</td>
                        <td>{dato.posicion}</td>
                        <td><button className="btn btn-info"  onClick={()=>seleccionarGestor(dato,"Detalles")}>Ver más...</button> {""}</td>
                    </tr>
                    :""
                ))}
            </tbody>
        </table>


    <Modal isOpen={modalPostular}>
        <ModalHeader>
        <h3 style={{marginLeft:'42%',fontFamily:'monospace',color:'#19A7AE'}}> Postulate</h3>

        </ModalHeader>

        <ModalBody>
        <div className="form-group row">
                      <div class="form-group col-md-6">
                      <label>Usuario</label>
                      <br/>
                      <input type="text" name="iD_USUARIO_FK" className="form-control" onChange={handleChange} />
                      <h2>
                      {nuevo}
                      </h2>
                      </div>
                      <div class="form-group col-md-6">
                      <label>Vacante</label>
                      <br/>
                      <label>{gestorseleccionado && gestorseleccionado.id}</label>
                      </div>
                      <br></br>
                      <div class="form-group col-md-6">
                      <label>Fecha Postulacion</label>
                      <br/>
                      <input type="date" className="form-control" name="fechA_POSTULACION" onChange={handleChange}/>
                      </div>
            </div>
        </ModalBody>
      <ModalFooter>
            <button className="btn btn-info" onClick={()=>peticionPost()}>Guardar</button> {""}
             <button className="btn btn-dark" onClick={()=>controlModalPostular()}>Cancelar</button>
             <button className="btn btn-info" onClick={()=>controlModalVer()}>Ver Usuarios</button> {""}
             <button className="btn btn-dark"  onClick={()=>controlModalInsertar()}>Crear Usuarios</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalver}className="modal-lg 3500px" >
        <ModalHeader>
        <h3 style={{marginLeft:'100%',fontFamily:'monospace',color:'#19A7AE'}}> Usuarios Disponibles</h3>
        </ModalHeader>

        <ModalBody>
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
                   
                </tr>
            </thead>
            <tbody>
                {datos.map(g=>(
                   <tr key={g.id}>
                      <td>{g.id}</td> 
                      <td>{g.nombre}</td>
                      <td>{g.apellido}</td>
                      <td>{g.direccion}</td>
                      <td>{g.numerO_TEL}</td>
                      <td>{g.biografia}</td>
                      <td>{g.correo}</td>
                   </tr> 
                ))}
            </tbody>
          </table>
          </center>
          </div>
        </ModalBody>
      <ModalFooter>
             <button className="btn btn-info"onClick={()=>controlModalVer()}>Volver</button> {""}
      </ModalFooter>
    </Modal>


    <Modal isOpen={modalDetalles} className="modal-lg 3500px">
           <ModalHeader>
               <center>
                   <h3 style={{marginLeft:'250%',fontFamily:'monospace',color:'#19A7AE'}}> Detalles </h3>
               </center>
           </ModalHeader>
            <ModalBody>
            <div className="form-group row">

                      <div class="form-group col-md-6">
                      <img width="350" height="350" src={gestorseleccionado && gestorseleccionado.urL_LOGO}/>
                       </div>
                       <br></br>







                <div class="form-group col-md-6">
                <center>

                <h3><strong>{gestorseleccionado && gestorseleccionado.compania}</strong></h3>
                </center>
                 <br/>
                 <p>{gestorseleccionado && gestorseleccionado.descripcion}</p>


                 <br/>


                      <p>Nuestra vacante es de tipo {gestorseleccionado && gestorseleccionado.tipo},
                       buscamos a un  {gestorseleccionado && gestorseleccionado.posicion},
                      y estamos ubicados en {gestorseleccionado && gestorseleccionado.ubicacion}</p>


                      <strong>
                      <p>Categoria: {gestorseleccionado && gestorseleccionado.iD_CATEGORIA_FK}</p>
                      <p>Publicado el {gestorseleccionado && gestorseleccionado.fechA_PUBLICACION}</p>
                      </strong>
                  </div>
                      </div>


            </ModalBody>

            <ModalFooter>
              <button className="btn btn-info"onClick={()=>controlModalPostular()} >Postular</button> {""}
             <button className="btn btn-dark" onClick={()=>controlModalDetalles()}>Cancelar</button>
            </ModalFooter>
    </Modal>


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
                      </div>
            </ModalBody>

            <ModalFooter>
              <button className="btn btn-info" onClick={()=>peticionPostt()} >Agregar</button> {""}
             <button className="btn btn-dark" onClick={()=>controlModalInsertar()}>Cancelar</button>
            </ModalFooter>
    </Modal>

        </div>
        <Footer/>
      </>
    );
  }
  export default Inicio;

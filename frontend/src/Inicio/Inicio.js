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

    const Alerta=()=>{
        swal({
            title:"Solicitud enviada!",
            icon:"success",
            button:"Aceptar",
        })
    }
    const [data, setData]=useState([]);
    const [VacanteSeleccionada, setVacanteSeleccionada]=useState({
        id: '',
        compania: '',
        tipo:'',
    });
    const [modalInsertar,setModalInsertar]=useState(false);
    const [modalEditar,setModalEditar]=useState(false);
    const [modalDetalles, setModalDetalles]=useState(false);
    const [modalPostular, setModalPostular]=useState(false);

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
        fechA_POSTULACION:''

    })
    const seleccionarGestor=(gestorr,caso)=>{
        setGestorseleccionado(gestorr);
        if(caso==="Detalles"){
            controlModalDetalles();
        }
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

    const ToggleModal =()=>{
        setModalInsertar(!modalInsertar);
    }
    const ToggleModalEditar =()=>{
        setModalEditar(!modalEditar);
    }

    const GetVacante=async()=>{
        await axios.get(URL)
        .then(response=>{
          setData(response.data);
          console.log(data);
        }).catch(error => {
          console.log(error);   
        })
      }
      const peticionPost= async()=>{
        gestorseleccionado.iD_USUARIO_FK=parseInt(gestorseleccionado.iD_USUARIO_FK);
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
                      <input type="text" className="form-control" name="iD_USUARIO_FK" onChange={handleChange}/>
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
      </ModalFooter>
    </Modal>


    <Modal isOpen={modalDetalles} className="modal-lg 3500px">
           <ModalHeader>
               <center>
                   <h3 style={{marginLeft:'0%',fontFamily:'monospace',color:'#19A7AE'}}> Vacantes HIRED</h3>
               </center>
           </ModalHeader>
            <ModalBody>
            <div className="form-group row">
                  
                      <div class="form-group col-md-6">
                     <h2>Compania</h2>
                      <br/>
                      <label>{gestorseleccionado && gestorseleccionado.compania}</label>
                      </div>

                      <div class="form-group col-md-6">
                      <br/>
                      <img width="150" height="100" src={gestorseleccionado && gestorseleccionado.urL_LOGO}/>
                      </div>
                      
                      <br></br>
                      <div class="form-group col-md-6">
                      <h4>Tipo</h4>
                      
                      <label>{gestorseleccionado && gestorseleccionado.tipo}</label>
                      </div>
                      <br></br>
                      <div class="form-group col-md-6">
                      <h4>Posicion</h4>
                      
                      <label>{gestorseleccionado && gestorseleccionado.posicion}</label>
                      </div>
                      <div class="form-group col-md-6">
                      <h4>Categoria</h4>
                      
                      <label>{gestorseleccionado && gestorseleccionado.iD_CATEGORIA_FK}</label>
                      </div>
                      <br></br>
                      <div class="form-group col-md-6">
                      <h4>Ubicacion:</h4>
                      
                     <label>{gestorseleccionado && gestorseleccionado.ubicacion}</label>
                      </div>
                      <div class="form-group col-md-6">
                      <h4>Descripcion:</h4>
                      
                      <label>{gestorseleccionado && gestorseleccionado.descripcion}</label>
                      </div>
                      <br></br>
                    
                    <div class="form-group col-md-6">
                      <h4>Fecha de Publicacion</h4>
                      <label>{gestorseleccionado && gestorseleccionado.fechA_PUBLICACION}</label>
                      </div>
                      </div>
            </ModalBody>

            <ModalFooter>
              <button className="btn btn-info"onClick={()=>controlModalPostular()} >Postular</button> {""}
             <button className="btn btn-dark" onClick={()=>controlModalDetalles()}>Cancelar</button>
            </ModalFooter>
    </Modal>

        </div>
        <Footer/>
      </>
    );
  }
  export default Inicio;

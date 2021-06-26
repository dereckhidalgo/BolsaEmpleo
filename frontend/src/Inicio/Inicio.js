import React,{useEffect,useState} from 'react';
import { Navbar, Nav, Form, FormControl, Button,Modal,ModalBody, ModalFooter } from 'react-bootstrap';
import Portada from '../imgs/Portada.jpg';
import Logo from '../imgs/Logo.png';
import {Link} from "react-router-dom";
import axios from 'axios';
function Inicio() {
    const URL = "https://localhost:44375/api/Vacante";

    const [data, setData]=useState([]);
    const [VacanteSeleccionada, setVacanteSeleccionada]=useState({
        id: '',
        compania: '',
        tipo:'',
    });
    const [modalInsertar,setModalInsertar]=useState(false);
    const [modalEditar,setModalEditar]=useState(false);

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
        <Navbar bg="dark" variant="dark" style={{width:"100%",margin:"0",borderRadius:"0"}}>
            <Navbar.Brand href="#home" style={{marginLeft:'1%', marginTop:'-10px'}}><img src={Logo} width="90px" height="70px"/></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Inicio</Nav.Link>
                <Nav.Link href="#features">Vacantes</Nav.Link>
            </Nav>
            <Nav style={{marginLeft:"50%"}}>
                <Link to="/Login"><Button className="bg-dark">Login</Button></Link>
                <Button className="bg-dark">Sign Up</Button>
            </Nav>
            <Form className="inline" style={{display:'flex', marginLeft:"1%"}}>
                <FormControl type="text" placeholder="Buscar..." style={{marginRight:'2%', border:'2px solid #19A7AE'}}/>
                <Button variant="outline-info">Buscar</Button>
            </Form>
        </Navbar>
        <div style={{height:'44.3rem'}}>
            <img src={Portada} width='100%' height='100%' style={{opacity:""}}></img>
            <div style={{top:'86px', position:'absolute',width:'100%', background:'black',opacity:'50%',height:"89.2%"}}>
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
                    dato.tipo===1
                    ?
                    <tr>
                        <td>{dato.compania}</td>
                        <td>{dato.ubicacion}</td>
                        <td>{dato.posicion}</td>
                        <td><button className="btn btn-info">Ver más...</button> {""}</td>
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
                        <td><button className="btn btn-info">Ver más...</button> {""}</td>
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
                        <td><button className="btn btn-info">Ver más...</button> {""}</td>
                    </tr>
                    :""
                ))}
            </tbody>
        </table>
    <Modal isOpen={modalInsertar}>
      <ModalBody>
        <div className="form-group">
          <label>Titulo:</label>
          <input type="text" name="titulo" className="form-control text-dark" placeholder="Ex: Liga de la justicia" onChange={ControlarInputs}/>
          <textarea rows="4" cols="50" name="descripcion" className="form-control text-dark" placeholder="Ex: La pelicula trata de..." onChange={ControlarInputs}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-info"><i className="tim-icons icon-check-2"/> Insertar</button>
        <button className="btn btn-danger" onClick={()=>ToggleModal()}><i className="tim-icons icon-simple-remove"/> Cancelar</button>
      </ModalFooter>
    </Modal>
        </div>
        <Footer/>
      </>
    );
  }
  export default Inicio;

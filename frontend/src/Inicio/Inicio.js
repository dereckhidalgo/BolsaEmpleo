import React,{useEffect,useState} from 'react';
import { Navbar, Nav, Form, FormControl, Button,Modal,ModalBody, ModalFooter } from 'react-bootstrap';
import Portada from '../imgs/Portada.jpg';
import Logo from '../imgs/Logo.png';
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
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home" style={{marginLeft:'1%', marginTop:'-10px'}}><img src={Logo} width="90px" height="70px"/></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Inicio</Nav.Link>
                <Nav.Link href="#features">Vacantes</Nav.Link>
            </Nav>
            <Nav style={{marginLeft:"50%"}}>
                <Button className="bg-dark">Login</Button>
                <Button className="bg-dark">Sign Up</Button>
            </Nav>
            <Form className="inline" style={{display:'flex', marginLeft:"1%"}}>
                <FormControl type="text" placeholder="Buscar..." style={{marginRight:'2%', border:'2px solid #19A7AE'}} />
                <Button variant="outline-info">Buscar</Button>
            </Form>
        </Navbar>
        <div >
            <img src={Portada} width='100%' style={{opacity:""}}></img>
            <div style={{top:'86px', position:'absolute',width:'100%', background:'black',opacity:'50%',height:"90.2%"}}>
                
            </div>
            <div style={{top:"40%",left:"30%",position:'absolute', color:"white"}}>
                <h1 style={{color:"white"}}>TU <i style={{color:'#19A7AE'}}>FUTURO</i> EMPIEZA AQUI</h1>
            </div>
        </div>
        <h1 style={{margin:'5% 30%'}}>VACANTES DISPONIBLES</h1>
        <div style={{width:'80%', margin:'5% 10%'}}>
        <table className="table table-bordered table-striped table-hover">
            <thead className="HeaderTable text-center">
                <tr>
                    <th>Compañía</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Posicion</th>
                    <th>Ubicacion</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody className="BodyTable text-center">
                {data.map(dato=>(
                <tr key={dato.id}>
                    <td><img src={dato.urL_LOGO} width="50px" height="50px"/></td>
                    <td>{dato.compania}</td>
                    <td>{dato.tipo===1? "Full Time":dato.tipo===2?"Part-time":"Freelance"}</td>
                    <td>{dato.posicion}</td>
                    <td>{dato.ubicacion}</td>   
                    <td><button className="btn btn-success">Postular</button></td>
                </tr>
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
      </>
    );
  }
  export default Inicio;

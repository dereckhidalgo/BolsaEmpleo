import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Portada from '../imgs/Portada.jpg';
import Logo from '../imgs/Logo.png';
import {Link} from "react-router-dom";
function Inicio() {
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
      </>
    );
  }
  export default Inicio;

import React from "react";
import { Navbar, Nav, Button} from 'react-bootstrap';
import Logo from '../imgs/Logo.png';
import {Link} from 'react-router-dom';
const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" style={{width:"100%", margin:"0", borderRadius:"0"}}>
    <Navbar.Brand href="#home" style={{marginLeft:'1%', marginTop:'-10px'}}><img src={Logo} width="90px" height="70px"/></Navbar.Brand>
    <Nav className="mr-auto">
        <Link to="/inicio"><Nav.Link href="#home">Inicio</Nav.Link></Link>
        <Nav.Link href="#Vacantes">Vacantes</Nav.Link>
    </Nav>
    <Nav style={{marginLeft:"50%"}}>
        <Link to="/admin"><Button className="bg-dark" variant="outline-info">Login</Button></Link>
    </Nav>
    </Navbar>
  );
}

export default NavBar;
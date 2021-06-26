import React from "react";

const Footer = () => {
  return (
        <div className="bg-dark text-white p-4">
            <center>
             Desarrollado en su totalidad por:
            <div style={{ display:'flex', margin:'2% 35% '}}>
                <center>
                <ul style={{ textDecoration:'none'}}>
                    <li>Dereck Hidalgo 2019-8762</li>
                    <li>Jenrry Monegro</li>
                    <li>Eduardo Acosta</li>
                </ul>
                </center>
                <ul>
                    <li>Pieranyela Carrasco</li>
                    <li>Jennifer Pilarte</li>
                    <li>Brian</li>
                </ul>
            </div>
            <hr/>
          &copy; {new Date().getFullYear()} Copyright:  Hired Company
          </center>
        </div>
  );
}

export default Footer;
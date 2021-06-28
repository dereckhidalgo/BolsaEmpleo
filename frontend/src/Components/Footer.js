import React from "react";

const Footer = () => {
  return (
        <div className="bg-dark text-white p-4">
            <center>
             Desarrollado en su totalidad por:
            <div style={{ display:'flex', margin:'2% 42% '}}>
                <center>
                <ul style={{ textDecoration:'none'}}>
                    <li>Dereck</li>
                    <li>Jenrry</li>
                    <li>Eduardo</li>
                </ul>
                </center>
                <ul>
                    <li>Pieranyela</li>
                    <li>Jennifer</li>
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
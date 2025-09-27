import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Investigación:</h4>
        <p>Pamela Huerta y José Luis Huacles</p>
        <h4>Coordinación general:</h4>
        <p>Alonso Marín Jimenez</p>
        <h4>Diseño web:</h4>
        <p>Jazmín Ceras</p>
        <h4>Desarrollo:</h4>
        <p>Anna Absi y José Luis Huacles (coordinación)</p>
      </div>
      
      {/* <div className="footer-section">
        <h4>Fondos de Financiamiento:</h4>
        <p>Lorem ipsum</p>
      </div> */}
    </footer>
  );
};

export default Footer;
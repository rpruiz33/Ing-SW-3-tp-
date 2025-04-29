import React from "react";

const Footer = () => {
  return (
    
    <footer className="bg-dark text-center text-white py-3 mt-auto">
           
         
        
      <div className="container h-100 ">
        <section className="mb-4">
          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fab fa-twitter"></i>
          </a>
          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fab fa-instagram"></i>
          </a>
        </section>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        © 2025 Copyright:
       
        <a className="text-white" href="#!">
          SISTEMA-RECARGA-TRANSPORTE
        </a>

       
      </div>
    </footer>
  );
};

export default Footer; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/navbar/navBar';
import Footer from './componentes/footer/footer';
import Login from './componentes/login/login';
import Recarga from './componentes/recarga/recarga'; // Asegurate de tener este componente
import Home from './componentes/home/home'; // Asegurate de tener este componente
import Home2 from './componentes/home2/home2'; // Asegurate de tener este componente
import PagarBoleto from './componentes/pagar-boleto/pagar-boleto'
import Historial from './componentes/historial/historial';

function App() {
  return (
    <Router>
      <div >
        <Navbar />
 
        <div >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recarga" element={<Recarga />} />
            <Route path="/home2" element={<Home2 />} />
            <Route path="/pagar-boleto" element={<PagarBoleto />} />
            <Route path="/historial" element={<Historial />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

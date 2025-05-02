import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/navbar/navBar';
import Footer from './componentes/footer/footer';
import Login from './componentes/login/login';
import Recarga from './componentes/recarga/recarga'; // Asegurate de tener este componente

function App() {
  return (
    <Router>
      <div >
        <Navbar />
        <div >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/recarga" element={<Recarga />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

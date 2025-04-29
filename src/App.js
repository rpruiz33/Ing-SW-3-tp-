import React from 'react';
import './App.css';
import Footer from './componentes/footer/footer';
import Navbar from './componentes/navbar/navBar';
import Saldo from './componentes/recarga/recarga';
function App() {
  return (
  
        <div className="bg-black">
    <Navbar/>
    <Saldo/>
   <Footer/>
   </div>
  );
}

export default App;

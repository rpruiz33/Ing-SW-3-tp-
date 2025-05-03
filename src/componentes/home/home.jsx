import React from "react";
import './home.css';
const Home = () => {
    return (
        <div className="container h-100 bg-black">
            <h1 className="text-center text-light">Bienvenido al Sistema de Transporte Público</h1>
            <p className="text-center text-secondary ">Aquí puedes gestionar tus recargas y consultar información sobre el sistema.</p>
        <div className="text-center mt-5">
        <img
            src="https://www.cmu.edu/news/sites/default/files/styles/hero_full_width_desktop_1x/public/stories/archives/2022/june/images/mass-transit-photo-2000x1000-min.jpg.webp?itok=-3Uuj-LS.PNG"
            alt="Autobús"
            className="home1 img-fluid mx-auto my-5 d-flex"

        />
        </div>
        
        </div>
    );
}
export default Home;
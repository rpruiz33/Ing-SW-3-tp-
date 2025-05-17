import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DISTANCIAS = [
  { km: 1, label: "1 km", monto: 400 },
  { km: 6, label: "6 km", monto: 800 },
  { km: 10, label: "10 km", monto: 1200 },
];

const PagarBoleto = () => {
  const [linea, setLinea] = useState("");
  const [distancia, setDistancia] = useState(DISTANCIAS[0].km);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const montoPagar = DISTANCIAS.find(d => d.km === Number(distancia))?.monto || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("¡Pagaste exitosamente el boleto!");

    // Guardar en historial
    const movimiento = {
      tipo: "boleto",
      monto: montoPagar,
      linea,
      distancia,
      fecha: new Date().toISOString(),
    };
    const historial = JSON.parse(localStorage.getItem("historialMovimientos")) || [];
    historial.push(movimiento);
    localStorage.setItem("historialMovimientos", JSON.stringify(historial));
  };

  const volverHome2 = () => {
    navigate("/home2");
  };

  const desloguear = () => {
    // Ya no se borra el historial al desloguear
    navigate("/login");
  };

  return (
    <div className="h-100 bg-black mb-90 p-5 pb-1000">
      <div className="row h-100">
        <div className="col-md-6 offset-md-3">
          <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-secondary" onClick={volverHome2}>Volver a Home</button>
            <button className="btn btn-danger" onClick={desloguear}>Desloguear</button>
          </div>
          <h2 className="text-light">Pagar Boleto</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="linea" className="form-label text-secondary">
                Ingrese número de línea:
              </label>
              <input
                type="text"
                className="form-control"
                id="linea"
                name="linea"
                value={linea}
                onChange={(e) => setLinea(e.target.value)}
                placeholder="Ej: 60"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="distancia" className="form-label text-secondary">
                Selecciona distancia recorrida:
              </label>
              <select
                id="distancia"
                className="form-select"
                value={distancia}
                onChange={(e) => setDistancia(Number(e.target.value))}
              >
                {DISTANCIAS.map((op) => (
                  <option key={op.km} value={op.km}>{op.label}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <div
                className="card text-center bg-info text-dark shadow-lg"
                style={{
                  minHeight: "100px",
                  fontSize: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="card-body">
                  <strong>Monto a pagar: ${montoPagar}</strong>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100">
              Pagar Boleto
            </button>
          </form>
          {mensaje && (
            <div className="alert alert-success mt-4 text-center" role="alert">
              {mensaje}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PagarBoleto;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Función para obtener el saldo disponible desde el historial
const obtenerSaldoDisponible = () => {
  const historial = JSON.parse(localStorage.getItem("historialMovimientos")) || [];
  let saldo = 0;
  historial.forEach((mov) => {
    if (mov.tipo === "recarga") {
      saldo += Number(mov.monto);
    } else if (mov.tipo === "boleto") {
      saldo -= Number(mov.monto);
    }
  });
  return saldo;
};

const Hombe2 = () => {
  const navigate = useNavigate();
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    setSaldo(obtenerSaldoDisponible());

    // Escuchar cambios en el localStorage (por si hay varias ventanas abiertas)
    const recalc = () => setSaldo(obtenerSaldoDisponible());
    window.addEventListener("storage", recalc);
    return () => window.removeEventListener("storage", recalc);
  }, []);

  // Para actualizar el saldo cuando venimos de recarga o boleto
  useEffect(() => {
    const update = () => setSaldo(obtenerSaldoDisponible());
    window.addEventListener("focus", update);
    return () => window.removeEventListener("focus", update);
  }, []);

  const irARecarga = () => {
    navigate("/recarga");
  };

  const irAPagarBoleto = () => {
    navigate("/pagar-boleto");
  };

  const irAHistorial = () => {
    navigate("/historial");
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#181818",
      }}
    >
      {/* Cuadro de saldo disponible */}
      <div
        className="mb-4 mt-2"
        style={{
          background: "#262b4b",
          color: "#fff",
          padding: "1.5rem 3rem",
          borderRadius: "1.5rem",
          boxShadow: "0 0 24px #000a",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        Monto disponible: ${saldo}
      </div>

      <h2 className="mb-5 text-light">Bienvenido</h2>
      <div className="d-flex gap-5 flex-wrap justify-content-center align-items-center w-100">
        <div
          className="card text-center bg-primary text-white shadow-lg"
          style={{
            cursor: "pointer",
            minHeight: "260px",
            minWidth: "260px",
            fontSize: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "1.5rem",
          }}
          onClick={irARecarga}
        >
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <span role="img" aria-label="recarga" style={{ fontSize: "3.5rem" }}>
              💳
            </span>
            <span>Recargar</span>
          </div>
        </div>
        <div
          className="card text-center bg-success text-white shadow-lg"
          style={{
            cursor: "pointer",
            minHeight: "260px",
            minWidth: "260px",
            fontSize: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "1.5rem",
          }}
          onClick={irAPagarBoleto}
        >
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <span role="img" aria-label="pagar" style={{ fontSize: "3.5rem" }}>
              🎫
            </span>
            <span>Pagar Boleto</span>
          </div>
        </div>
        <div
          className="card text-center bg-warning text-dark shadow-lg"
          style={{
            cursor: "pointer",
            minHeight: "260px",
            minWidth: "260px",
            fontSize: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "1.5rem",
          }}
          onClick={irAHistorial}
        >
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <span role="img" aria-label="historial" style={{ fontSize: "3.5rem" }}>
              📑
            </span>
            <span>Historial</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hombe2;
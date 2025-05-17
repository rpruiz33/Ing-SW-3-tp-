import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Utiliza localStorage para guardar y leer el historial
const leerHistorial = () => {
  const data = localStorage.getItem("historialMovimientos");
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
};

// Procesa el historial para obtener el resumen por línea
const obtenerResumenPorLinea = (movimientos) => {
  const resumen = {};
  movimientos.forEach((mov) => {
    if (mov.tipo === "boleto" && mov.linea) {
      if (!resumen[mov.linea]) {
        resumen[mov.linea] = { pasajeros: 0, monto: 0 };
      }
      resumen[mov.linea].pasajeros += 1;
      resumen[mov.linea].monto += Number(mov.monto);
    }
  });
  return resumen;
};

const Historial = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [resumenLineas, setResumenLineas] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const movs = leerHistorial();
    setMovimientos(movs);
    setResumenLineas(obtenerResumenPorLinea(movs));
  }, []);

  const volverHome2 = () => {
    navigate("/home2");
  };

  const desloguear = () => {
    // Ya no se borra el historial al desloguear
    navigate("/login");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={volverHome2}>Volver a Home</button>
        <button className="btn btn-danger" onClick={desloguear}>Desloguear</button>
      </div>
      <h2 className="mb-4 text-center text-light">Historial de movimientos</h2>
      {movimientos.length === 0 ? (
        <div className="alert alert-info text-center">
          No hay movimientos registrados aún.
        </div>
      ) : (
        <>
          <div className="table-responsive mb-5">
            <table className="table table-dark table-striped table-bordered">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Detalle</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {movimientos.map((mov, idx) => (
                  <tr key={idx}>
                    <td>
                      {mov.tipo === "recarga" ? "Recarga" : "Boleto"}
                    </td>
                    <td>
                      {mov.tipo === "recarga"
                        ? `Medio: ${mov.medioPago} | Transporte: ${mov.medioTransporte}`
                        : `Línea: ${mov.linea}, Distancia: ${mov.distancia} km`
                      }
                    </td>
                    <td>
                      ${mov.monto}
                    </td>
                    <td>
                      {new Date(mov.fecha).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-light mb-3">Resumen por línea (Boletos Pagados)</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-sm table-light">
              <thead>
                <tr>
                  <th>Línea</th>
                  <th>Pasajeros</th>
                  <th>Monto total generado</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(resumenLineas).length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center">No hay boletos registrados.</td>
                  </tr>
                ) : (
                  Object.entries(resumenLineas).map(([linea, datos]) => (
                    <tr key={linea}>
                      <td>{linea}</td>
                      <td>{datos.pasajeros}</td>
                      <td>${datos.monto}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Historial;
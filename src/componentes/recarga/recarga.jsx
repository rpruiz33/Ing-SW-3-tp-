import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecargaSaldo = () => {
    const [saldo, setSaldo] = useState(0);
    const [mensaje, setMensaje] = useState('');
    const [medio, setMedio] = useState(''); 
    const [formulario, setFormulario] = useState({
        recarga: '',
        medioPago: ''
    });
    const navigate = useNavigate();

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const recargarSaldo = (e) => {
        e.preventDefault();

        const montoRecarga = parseFloat(formulario.recarga);

        if (
            isNaN(montoRecarga) ||
            montoRecarga <= 0 ||
            formulario.medioPago === "" ||
            medio === ""
        ) {
            let errorMsg = 'Por favor ';
            const errores = [];
            if (isNaN(montoRecarga) || montoRecarga <= 0) {
                errores.push("ingresa un monto válido");
            }
            if (formulario.medioPago === "") {
                errores.push("selecciona un medio de pago");
            }
            if (medio === "") {
                errores.push("selecciona un medio de transporte");
            }
            errorMsg += errores.join(", ") + ".";
            setMensaje(errorMsg);
            return;
        }

        const nuevoSaldo = saldo + montoRecarga;
        setSaldo(nuevoSaldo);
        setMensaje(`¡Recarga realizada con éxito a través de ${formulario.medioPago}! Tu saldo es ahora: $${nuevoSaldo} y seleccionaste el medio de transporte ${medio}`);

        // Guardar en historial
        const movimiento = {
            tipo: "recarga",
            monto: montoRecarga,
            medioPago: formulario.medioPago,
            medioTransporte: medio,
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
                    <h2 className="text-light">Recargar</h2>
                    <form onSubmit={recargarSaldo}>
                        <div className="mb-3">
                            <label htmlFor="recarga" className="form-label text-secondary">Ingrese monto:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="recarga"
                                name="recarga"
                                value={formulario.recarga}
                                onChange={manejarCambio}
                                placeholder="$0.00"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="medioPago" className="form-label text-secondary">Seleccione medio de pago:</label>
                            <select
                                className="form-select"
                                id="medioPago"
                                name="medioPago"
                                value={formulario.medioPago}
                                onChange={manejarCambio}
                                required
                            >
                                <option value="">-- Elegir --</option>
                                <option value="Mercadopago">Mercadopago</option>
                                <option value="Cuenta DNI">Cuenta DNI</option>
                                <option value="MODO">MODO</option>
                                <option value="App Santander">App Santander</option>
                                <option value="App Galcia">App Galcia</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="medio" className="form-label text-secondary">Selecciona un medio de transporte:</label>
                            <select
                                id="medio"
                                className="form-select"
                                value={medio}
                                onChange={(e) => setMedio(e.target.value)}
                                required
                            >
                                <option value="">-- Elegir --</option>
                                <option value="colectivo">Colectivo</option>
                                <option value="tren">Tren</option>
                                <option value="subte">Subte</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Recargar
                        </button>
                    </form>
                    {mensaje && <div className="mt-3 text-secondary">{mensaje}</div>}
                </div>
            </div>
        </div>
    );
};

export default RecargaSaldo;
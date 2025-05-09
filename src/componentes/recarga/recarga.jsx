import React, { useState } from "react";

const RecargaSaldo = () => {
    const [saldo, setSaldo] = useState(0);
    const [mensaje, setMensaje] = useState('');
    const [medio, setMedio] = useState(''); 
    const [formulario, setFormulario] = useState({
        recarga: '',
        medioPago: ''
    });

  

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
        if (!isNaN(montoRecarga) && montoRecarga > 0) {
            const nuevoSaldo = saldo + montoRecarga;
            setSaldo(nuevoSaldo);
            setMensaje(`¡Recarga realizada con éxito a través de ${formulario.medioPago}! Tu saldo es ahora: $${nuevoSaldo} y seleccionate el medio de transporte ${medio}`);
        } else {
            setMensaje('Por favor ingresa un monto válido.');
        }
    };

    return (
        <div className="h-100 bg-black mb-90 p-5 pb-1000">
            <div className="row h-100">
                <div className="col-md-6 offset-md-3">
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

import React, { useState } from "react";

const RecargaSaldo = () => {
    const [saldo, setSaldo] = useState(0);
    const [mensaje, setMensaje] = useState('');
    const [recarga, setRecarga] = useState(''); 

    const manejarCambio = (e) => {
        setRecarga(e.target.value); 
    };

    const recargarSaldo = (e) => {
        e.preventDefault(); 

       
        const montoRecarga = parseFloat(recarga);
        if (!isNaN(montoRecarga) && montoRecarga > 0) {
            const nuevoSaldo = saldo + montoRecarga;
            setSaldo(nuevoSaldo);
            setMensaje(`¡Recarga realizada con éxito! Tu saldo es ahora: $${nuevoSaldo}`);
        } else {
            setMensaje('Por favor ingresa un monto válido.');
        }
    };

    return (
        <>
            <div className="container h-100 bg-black"> 
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2>Recargar</h2>
                        <form onSubmit={recargarSaldo}>
                            <div className="mb-3">
                                <label htmlFor="saldo" className="form-label">Ingrese monto:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="recarga"
                                    value={recarga}
                                    onChange={manejarCambio}
                                    placeholder="$0.00"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Recargar
                            </button>
                        </form>
                        {mensaje && <div className="mt-3">{mensaje}</div>}
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default RecargaSaldo;

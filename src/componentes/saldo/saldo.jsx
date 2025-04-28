import React from "react";

const Saldo = () => {
    return (
        <>
        <h1>Saldo</h1>
        <div className="container mb-4">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2>Consulta tu saldo</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="saldo" className="form-label">Saldo:</label>
                            <input type="text" className="form-control" id="saldo" placeholder="$0.00" readOnly />
                        </div>
                        <button type="submit" className="btn btn-primary">Consultar</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}
export default Saldo;
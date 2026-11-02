import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddProprietario = () => {
    const [proprietario, setProprietario] = useState({
        nome: "",
        cpf: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setProprietario((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8081/proprietario", proprietario);
            navigate("/proprietario");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="w-100 d-flex justify-content-center p-3">Adicionando Proprietário</h2>
            <div className="row">
                <div className="col-md-12">
                    <form>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Nome:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="nome" 
                                placeholder="Digite o nome do Proprietario" 
                                name="nome" 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="mb-3 mt-3">
                            <label className="form-label">CPF:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="cpf" 
                                placeholder="Digite o CPF do Proprietario" 
                                name="cpf" 
                                onChange={handleChange} 
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={handleClick}>
                            Cadastrar
                        </button>
                        <br /><br />
                        <Link to="/proprietario">Listar Proprietarios</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProprietario;
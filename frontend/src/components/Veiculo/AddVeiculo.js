import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddVeiculo = () => {
    const [veiculo, setVeiculo] = useState({
        placa: "",
        ano: "",
        mensalidade: "",
        fk_proprietario: ""
    });

    const [proprietarios, setProprietarios] = useState([]);
    const navigate = useNavigate();

    // Busca a lista de proprietários para preencher o <select>
    useEffect(() => {
        const fetchProprietarios = async () => {
            try {
                const res = await axios.get("http://localhost:8081/proprietario");
                setProprietarios(res.data);
            } catch (err) {
                console.log("Erro ao buscar proprietários:", err);
            }
        };
        fetchProprietarios();
    }, []);

    const handleChange = (e) => {
        setVeiculo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8081/veiculo", veiculo);
            navigate("/veiculo");
        } catch (err) {
            console.log("Erro ao cadastrar veículo:", err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="w-100 d-flex justify-content-center p-3">Adicionando Veículo</h2>
            <div className="row">
                <div className="col-md-12">
                    <form>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Placa:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite a placa do veículo" 
                                name="placa" 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="mb-3 mt-3">
                            <label className="form-label">Ano:</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder="Digite o ano do veículo" 
                                name="ano" 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="mb-3 mt-3">
                            <label className="form-label">Mensalidade:</label>
                            <input 
                                type="number" 
                                step="0.01" 
                                className="form-control" 
                                placeholder="Digite o valor da mensalidade" 
                                name="mensalidade" 
                                onChange={handleChange} 
                            />
                        </div>

                        {/* Select dinâmico para escolher o Proprietário */}
                        <div className="mb-3 mt-3">
                            <label className="form-label">Proprietário:</label>
                            <select 
                                className="form-control" 
                                name="fk_proprietario" 
                                onChange={handleChange}
                                defaultValue=""
                            >
                                <option value="" disabled>Selecione um proprietário</option>
                                {proprietarios.map((prop) => (
                                    <option key={prop.id_proprietario} value={prop.id_proprietario}>
                                        {prop.nome} (CPF: {prop.cpf})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={handleClick}>
                            Cadastrar Veículo
                        </button>
                        <br /><br />
                        <Link to="/veiculo">Listar Veículos</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVeiculo;
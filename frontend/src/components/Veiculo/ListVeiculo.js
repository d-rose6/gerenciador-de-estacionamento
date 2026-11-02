import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListVeiculo = () => {
    const [veiculos, setVeiculos] = useState([]);

    useEffect(() => {
        const fetchVeiculos = async () => {
            try {
                const res = await axios.get("http://localhost:8081/veiculo");
                setVeiculos(res.data);
            } catch (err) {
                console.log("Erro ao buscar veículos:", err);
            }
        };
        fetchVeiculos();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/veiculo/${id}`);
            window.location.reload();
        } catch (err) {
            console.log("Erro ao deletar veículo:", err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="w-100 d-flex justify-content-center p-3">Listando Veículos</h2>
            <div className="row">
                <div className="col-md-12">
                    <p className="d-flex gap-2">
                        <Link to="/addVeiculo" className="btn btn-success">
                            Adicionar novo Veículo
                        </Link>
                        <Link to="/proprietario" className="btn btn-secondary">
                            Gerenciar Proprietários
                        </Link>
                    </p>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Placa</th>
                                <th>Ano</th>
                                <th>Mensalidade</th>
                                <th>Proprietário</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {veiculos.map((veiculo) => {
                                // Trata tanto minúsculo quanto maiúsculo caso o Sequelize altere o alias
                                const nomeProprietario = veiculo.proprietario?.nome || veiculo.Proprietario?.nome || 'N/A';
                                
                                return (
                                    <tr key={veiculo.id_veiculo}>
                                        <td>{veiculo.id_veiculo}</td>
                                        <td>{veiculo.placa}</td>
                                        <td>{veiculo.ano}</td>
                                        <td>R$ {veiculo.mensalidade}</td>
                                        <td>{nomeProprietario}</td>
                                        <td>
                                            <button onClick={() => handleDelete(veiculo.id_veiculo)} className="btn btn-danger">
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ListVeiculo;
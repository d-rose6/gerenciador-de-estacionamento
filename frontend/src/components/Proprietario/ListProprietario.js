import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListProprietario = () => {
    const [proprietarios, setProprietarios] = useState([]);

    // Listar Proprietarios
    useEffect(() => {
        const fetchAllProprietarios = async () => {
            try {
                const res = await axios.get("http://localhost:8081/proprietario");
                setProprietarios(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllProprietarios();
    }, []);

    // Deletar Proprietarios
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/proprietario/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="w-100 d-flex justify-content-center p-3">Listando Proprietários</h2>
            <div className="row">
                <div className="col-md-12">
                    <p className="d-flex gap-2">
                        <Link to="/addProprietario" className="btn btn-success">
                            Adicionar novo Proprietário
                        </Link>
                        <Link to="/veiculo" className="btn btn-primary">
                            Ir para Veículos
                        </Link>
                    </p>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Data Cadastro</th>
                                <th>Data Alteração</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proprietarios.map((proprietario) => {
                                return (
                                    <tr key={proprietario.id_proprietario}>
                                        <td>{proprietario.id_proprietario}</td>
                                        <td>{proprietario.nome}</td>
                                        <td>{proprietario.cpf}</td>
                                        <td>{new Date(proprietario.createdAt).toLocaleDateString()}</td>
                                        <td>{new Date(proprietario.updatedAt).toLocaleDateString()}</td>
                                        <td>
                                            <Link to={`/readProprietario/${proprietario.id_proprietario}`} className="btn btn-success mx-2">
                                                Ler
                                            </Link>
                                            <Link to={`/updateProprietario/${proprietario.id_proprietario}`} className="btn btn-info mx-2">
                                                Editar
                                            </Link>
                                            <button onClick={() => handleDelete(proprietario.id_proprietario)} className="btn btn-danger">
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

export default ListProprietario;
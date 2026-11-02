import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateProprietario = () => {
    const { id } = useParams();
    const [proprietario, setProprietario] = useState({
        nome: "",
        cpf: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setProprietario((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        axios.get(`http://localhost:8081/proprietario/${id}`)
            .then(res => {
                console.log(res.data);
                setProprietario(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/proprietario/${id}`, proprietario);
            navigate("/proprietario");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h2 className="w-100 d-flex justify-content-center p-3">Formulário para Editar o Proprietário</h2>
            <form>
                <div className="mb-3 mt-3">
                    <label className="form-label">ID:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="id" 
                        placeholder="ID" 
                        name="id" 
                        value={proprietario.id_proprietario || ''} 
                        disabled 
                    />
                </div>

                <div className="mb-3 mt-3">
                    <label className="form-label">Nome:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nome" 
                        placeholder="Nome do Proprietario" 
                        name="nome" 
                        value={proprietario.nome || ''} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="mb-3 mt-3">
                    <label className="form-label">CPF:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="cpf" 
                        placeholder="CPF do Proprietario" 
                        name="cpf" 
                        value={proprietario.cpf || ''} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="mb-3 mt-3">
                    <label className="form-label">Data de Criação:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="createdAt" 
                        placeholder="Data da criação" 
                        name="createdAt" 
                        value={proprietario.createdAt ? new Date(proprietario.createdAt).toLocaleDateString() : ''} 
                        disabled 
                    />
                </div>

                <div className="mb-3 mt-3">
                    <label className="form-label">Data de Alteração:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="updatedAt" 
                        placeholder="Data de Alteração" 
                        name="updatedAt" 
                        value={proprietario.updatedAt ? new Date(proprietario.updatedAt).toLocaleDateString() : ''} 
                        disabled 
                    />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleClick}>
                    Alterar
                </button>
            </form>
            <div className="container d-flex justify-content-center mt-3">
                <Link to="/proprietario">Veja todos os proprietários</Link>
            </div>
        </div>
    );
};

export default UpdateProprietario;
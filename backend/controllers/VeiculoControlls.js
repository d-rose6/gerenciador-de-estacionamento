const express = require('express');
const router = express.Router();

// Importando os modelos do Veículo e do Proprietário
const Veiculo = require('../models/Veiculos');
const Proprietario = require('../models/Proprietario');

// Busca Veiculos com os dados do Proprietário (GET com INNER JOIN)
router.get('/', async (req, res) => {
    try {
        const veiculos = await Veiculo.findAll({
            include: [{ model: Proprietario }]
        });
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cadastra Veiculo (POST)
router.post('/', async (req, res) => {
    try {
        const { placa, ano, mensalidade, fk_proprietario } = req.body;
        await Veiculo.create({ placa, ano, mensalidade, fk_proprietario });
        res.status(201).json({ message: 'Cadastrado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Busca Por id a Veiculo (GET)
router.get('/:id', async (req, res) => {
    try {
        const veiculo = await Veiculo.findByPk(req.params.id, {
            include: [{ model: Proprietario }]
        });
        if (!veiculo) {
            return res.status(404).json({ message: 'Veículo não encontrado' });
        }
        res.status(200).json(veiculo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Deleta Veiculo por id (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Veiculo.destroy({
            where: { id_veiculo: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Veículo não encontrado' });
        }
        res.status(200).json({ message: 'Excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Altera Veiculo por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const { placa, ano, mensalidade, fk_proprietario } = req.body;
        const [updated] = await Veiculo.update(
            { placa, ano, mensalidade, fk_proprietario },
            { where: { id_veiculo: req.params.id } }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Veículo não encontrado' });
        }
        res.status(200).json({ message: 'Atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();

// Importando o modelo do Proprietário (ajustado o caminho para ../models/Proprietario)
const Proprietario = require('../models/Proprietario');

// Busca Proprietario (GET)
router.get('/', async (req, res) => {
    try {
        const proprietarios = await Proprietario.findAll();
        res.status(200).json(proprietarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cadastra Proprietario (POST)
router.post('/', async (req, res) => {
    try {
        const { nome, cpf } = req.body;
        await Proprietario.create({ nome, cpf });
        res.status(201).json({ message: 'Cadastrado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Busca Por id a Proprietario (GET)
router.get('/:id', async (req, res) => {
    try {
        const proprietario = await Proprietario.findByPk(req.params.id);
        if (!proprietario) {
            return res.status(404).json({ message: 'Proprietário não encontrado' });
        }
        res.status(200).json(proprietario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Deleta Proprietario por id (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Proprietario.destroy({
            where: {
                id_proprietario: req.params.id
            }
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Proprietário não encontrado' });
        }
        res.status(200).json({ message: 'Excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Altera Proprietario por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const { nome, cpf } = req.body;
        const [updated] = await Proprietario.update(
            { nome, cpf },
            { where: { id_proprietario: req.params.id } }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Proprietário não encontrado' });
        }
        res.status(200).json({ message: 'Atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
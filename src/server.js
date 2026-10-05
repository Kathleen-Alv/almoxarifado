require('dotenv').config();

const express = require('express');
const cors = require('cors');

const pool = require('./config/database.js');

const usuarioRoutes = require('./routes/usuario.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);

app.get('/', async (req, res) => {
    let conexao;

    try {
        conexao = await pool.getConnection();

        const resultado = await conexao.query(
            'SELECT DATABASE() AS banco'
        );

        res.json({
            message: 'API do Sistema de Almoxarifado funcionando.',
            banco: resultado[0].banco
        });

    } catch (error) {

        console.error('Erro ao conectar ao banco:', error);

        res.status(500).json({
            message: 'Erro ao conectar ao banco de dados.'
        });

    } finally {

        if (conexao) {
            conexao.release();
        }
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
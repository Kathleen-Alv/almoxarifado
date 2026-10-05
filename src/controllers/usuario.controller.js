const usuarioService = require('../services/usuario.service');

async function cadastrarConta(req, res) {
    try {

        const usuario = await usuarioService.cadastrarConta(req.body);

        return res.status(201).json({
            message: 'Usuário cadastrado com sucesso.',
            usuario
        });

    } catch (error) {

        console.error(error);

        return res.status(400).json({
            message: error.message
        });
    }
}

module.exports = {
    cadastrarConta
};
const bcrypt = require('bcrypt');

const usuarioRepository = require('../repositories/usuario.repository');

async function cadastrarConta({ nome, email, senha, roleId }) {

    if (!nome || !email || !senha || !roleId) {
        throw new Error('Nome, e-mail, senha e perfil são obrigatórios.');
    }

    const usuarioExistente =
        await usuarioRepository.buscarPorEmail(email);

    if (usuarioExistente) {
        throw new Error('Já existe um usuário cadastrado com este e-mail.');
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    return await usuarioRepository.criarConta({
        nome,
        email,
        senhaHash,
        roleId
    });
}

module.exports = {
    cadastrarConta
};
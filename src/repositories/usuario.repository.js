const pool = require('../config/database');

async function buscarPorEmail(email) {
    let conexao;

    try {
        conexao = await pool.getConnection();

        const resultado = await conexao.query(
            `SELECT
                u.id,
                u.nome,
                u.email,
                u.senha_hash,
                u.role_id,
                r.nome AS role
             FROM usuarios u
             INNER JOIN roles r ON r.id = u.role_id
             WHERE u.email = ?`,
            [email]
        );

        return resultado[0] || null;

    } finally {
        if (conexao) {
            conexao.release();
        }
    }
}

async function buscarPorId(id) {
    let conexao;

    try {
        conexao = await pool.getConnection();

        const resultado = await conexao.query(
            `SELECT
                u.id,
                u.nome,
                u.email,
                u.role_id,
                r.nome AS role
             FROM usuarios u
             INNER JOIN roles r ON r.id = u.role_id
             WHERE u.id = ?`,
            [id]
        );

        return resultado[0] || null;

    } finally {
        if (conexao) {
            conexao.release();
        }
    }
}

async function criarConta({ nome, email, senhaHash, roleId }) {
    let conexao;

    try {
        conexao = await pool.getConnection();

        const resultado = await conexao.query(
            `INSERT INTO usuarios
                (nome, email, senha_hash, role_id)
             VALUES (?, ?, ?, ?)`,
            [nome, email, senhaHash, roleId]
        );

        return {
            id: Number(resultado.insertId),
            nome,
            email,
            role_id: roleId
        };

    } finally {
        if (conexao) {
            conexao.release();
        }
    }
}

module.exports = {
    buscarPorEmail,
    buscarPorId,
    criarConta
};
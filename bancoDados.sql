USE almoxarifado;

CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome ENUM('OPERADOR', 'ADMIN') NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    role_id BIGINT NOT NULL,

    CONSTRAINT fk_usuario_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SELECT id, nome FROM almoxarifado.roles ORDER BY id;
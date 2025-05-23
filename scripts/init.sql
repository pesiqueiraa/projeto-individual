CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS carro CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS marca CASCADE;

CREATE TABLE IF NOT EXISTS marca (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    logo_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS carro (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    modelo VARCHAR(100) NOT NULL,
    potencia INT NOT NULL,
    ano_fabricacao INT,
    marca_id UUID,
    user_id UUID,

    FOREIGN KEY (marca_id) REFERENCES marca(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO marca (nome, logo_url) VALUES
('Toyota', 'https://upload.wikimedia.org/wikipedia/commons/4/44/Toyota.png'),
('BMW', 'https://logospng.org/download/bmw/logo-bmw-2048.png'),
('Audi', 'https://static.vecteezy.com/system/resources/previews/019/766/236/non_2x/audi-logo-audi-icon-transparent-free-png.png');

INSERT INTO users (nome, email, senha) VALUES 
('Admin Teste', 'admin@teste.com', '123456');

INSERT INTO carro (modelo, potencia, ano_fabricacao, marca_id, user_id) VALUES
('Supra', 324, 2023, (SELECT id FROM marca WHERE nome = 'Toyota'), (SELECT id FROM users WHERE email = 'admin@teste.com')),
('M3 Competition', 510, 2022, (SELECT id FROM marca WHERE nome = 'BMW'), (SELECT id FROM users WHERE email = 'admin@teste.com')),
('RS6', 630, 2023, (SELECT id FROM marca WHERE nome = 'Audi'), (SELECT id FROM users WHERE email = 'admin@teste.com'));

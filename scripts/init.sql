CREATE TABLE marca (
    id INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    logo_url VARCHAR(255)
);

CREATE TABLE "user" (
    id INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE carro (
    id INT PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    potencia INT NOT NULL,
    ano_fabricacao INT,
    marca_id INT,
    user_id INT,
    

    FOREIGN KEY (marca_id) REFERENCES Marca(id),
    FOREIGN KEY (user_id) REFERENCES "User"(id)
);

INSERT INTO Marca (id, nome, logo_url) VALUES
(1, 'Toyota', 'https://upload.wikimedia.org/wikipedia/commons/4/44/Toyota.png'),
(2, 'BMW', 'https://logospng.org/download/bmw/logo-bmw-2048.png'),
(3, 'Audi', 'https://static.vecteezy.com/system/resources/previews/019/766/236/non_2x/audi-logo-audi-icon-transparent-free-png.png');

INSERT INTO "User" (id, nome, email, senha) VALUES 
(1, 'Admin Teste', 'admin@teste.com', '123456');

INSERT INTO Carro (id, modelo, potencia, ano_fabricacao, marca_id, user_id) VALUES 
(1, 'Supra',324, 2023, 1, 1),
(2, 'M3 Competition', 510, 2022, 2, 1),
(3, 'RS6', 630, 2023, 3, 1);

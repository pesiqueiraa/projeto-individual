# Sistema de Cadastro de Carros

&ensp; Este projeto é um sistema básico de cadastro de carros, no qual um usuário pode colocar a foto, modelo, marca e potência do carro. Após o envio, o carro é exibido em um card no front-end.



---
# Sobre o Projeto
O sistema permite que usuários cadastrem informações sobre carros, incluindo:

- Foto do veículo
- Modelo
- Marca
- Potência

Estas informações são exibidas em formato de cards na interface do usuário, proporcionando uma visualização organizada e intuitiva dos veículos cadastrados.


# Tecnologias Utilizadas

- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript, 
- **Arquitetura:** Padrão MVC (Model-View-Controller)

## Estrutura de Pastas

```
projeto-individual/
│
├── config/                # Arquivos de configuração (ex: conexão com banco)
│   └── database.js
├── controllers/           # Lógica de controle das requisições
│   └── HomeController.js
├── models/                # Definição de modelos de dados (estrutura do banco)
│   └── User.js
├── routes/                # Definição das rotas do sistema
│   └── index.js
├── services/              # Serviços auxiliares do sistema
│   └── userService.js
├── assets/                # Arquivos públicos como imagens e fontes
├── scripts/               # Arquivos de JavaScript públicos
├── styles/                # Arquivos CSS públicos
├── tests/                 # Arquivos de testes unitários
│   └── example.test.js
├── .gitignore             # Arquivo para ignorar arquivos no Git
├── .env.example           # Arquivo de exemplo para variáveis de ambiente
├── jest.config.js         # Arquivo de configuração do Jest
├── package-lock.json      # Gerenciador de dependências do Node.js
├── package.json           # Gerenciador de dependências do Node.js
├── readme.md              # Documentação do projeto (Markdown)
├── server.js              # Arquivo principal que inicializa o servidor
└── rest.http              # Teste de endpoints (opcional)

```

---

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/pesiqueiraa/projeto-individual.git
   cd seu-repositorio
2. Instale as dependências:

   ```bash
   npm install
3. Inicie o servidor:

   ```bash
   npm run dev
4. Acesse no navegador: [http://localhost:3000](http://localhost:3000)

# Sistema de Cadastro de Carros

&ensp; Este projeto é um sistema básico de cadastro de carros, no qual um usuário pode colocar a foto, modelo, marca e potência do carro. Após o envio, o carro é exibido em um card no front-end.



---
# Sobre o Projeto
&ensp; O sistema permite que usuários cadastrem e gerenciem informações completas sobre carros, incluindo:

- **Gerenciamento de Usuários:** Cadastro, login e autenticação
- **Cadastro de Carros:** Modelo, potência, ano de fabricação
- **Gerenciamento de Marcas:** Cadastro de marcas com logos

&ensp; As informações são armazenadas em banco PostgreSQL e exibidas através de uma interface React moderna, proporcionando uma experiência completa de gerenciamento de veículos.


# Tecnologias Utilizadas

- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, JavaScript, 
- **Arquitetura:** Padrão MVC (Model-View-Controller)

## Estrutura de Pastas

```
projeto-individual/
│
├── config/                # Arquivos de configuração
│   └── database.js        # Configuração de conexão PostgreSQL
├── controllers/           # Lógica de controle das requisições
│   ├── UserController.js  # Controle de usuários e autenticação
│   ├── CarroController.js # Controle de veículos
│   └── MarcaController.js # Controle de marcas
├── models/                # Definição de modelos de dados
│   ├── User.js           # Modelo de usuários
│   ├── Carro.js          # Modelo de carros
│   └── Marca.js          # Modelo de marcas
├── routes/                # Definição das rotas do sistema
│   └── index.js          # Rotas da API RESTful
├── services/              # Serviços auxiliares do sistema
│   └── userService.js    # Serviços de usuário
├── scripts/               # Scripts de banco de dados
│   ├── runSQLScripts.js  # Script para executar DDL
│   └── sql/              # Arquivos SQL de criação
├── assets/                # Arquivos públicos como imagens
├── styles/                # Arquivos CSS públicos
├── tests/                 # Arquivos de testes unitários
├── .env                   # Variáveis de ambiente (criar baseado no .env.example)
├── .env.example           # Exemplo de configuração de ambiente
├── .gitignore             # Arquivo para ignorar arquivos no Git
├── jest.config.js         # Configuração do Jest
├── package-lock.json      # Lock de dependências do Node.js
├── package.json           # Gerenciador de dependências
├── readme.md              # Documentação do projeto
├── server.js              # Arquivo principal do servidor
└── rest.http              # Testes de endpoints da API

```

---

## Instalação

**1. Clone este repositório:**
   ```bash
   git clone https://github.com/pesiqueiraa/projeto-individual.git
   cd projeto-individual
   ```

**2. Instale as dependências:**

   ```bash
   npm install
   ```

**3. Configure as Variáveis de Ambiente:**
&ensp;Crie um arquivo .env para armazenar as variáveis de conexão com o banco de dados:

   ```bash
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco
   ```
**4. Execute os scripts de criação das tabelas:**

   ```bash
   node scripts/runSQLScripts.js
   ```

**5. Digite:**

   ```bash
cd .\views\frontend\
   ```

**6. Após entrar na pasta frontend, digite:**

   ```bash
npm install
   ```
**7. Agora volte para a raiz do projeto com:**

   ```bash
cd ../..
   ```

**8. Inicie o projeto:**

   ```bash
   npm run dev
   ```
**9. Acesse no navegador:** [http://localhost:5173](http://localhost:5173/)

## Endpoints
#### Usuários

- `POST /users` - Criar usuário
- `GET /users` - Listar usuários
- `GET /users/:id` - Buscar usuário específico
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário
- `POST /users/login` - Login de usuário

#### Carros

- `GET /carros` - Listar carros
- `POST /carros` - Criar carro
- `PUT /carros/:id` - Atualizar carro
- `DELETE /carros/:id` - Deletar carro

#### Marcas

- `GET /marcas` - Listar marcas
- `GET /marcas/:id` - Buscar marca específica
- `POST/marcas` - Criar marca
- 

## Demonstração

&ensp; Veja este vídeo para ver o funcionamento da plataforma e especificações técnicas <a href="https://youtu.be/Fu4zhPPh2Hs?si=QGRt_PNlcIJvppUT">Link</a>.

# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Garagem dos sonhos

#### Pedro Siqueira de Souza

## 1. Introdução
&ensp; Este documento descreve a implementação de um sistema web para adição de informações sobre carros dos usuários. A aplicação permitirá que usuários cadastrados incluam, visualizem, atualizem e removam dados sobre os carros adicionados na apliacação. O sistema foi projetado para que os usuários mostrem seus carros para outros usuários intusiastas do tema em cards dentro de seu perfil, sendo uma plataforma intuitiva e de fácil utilização.

## 2. Projeto da Aplicação Web
### 2.1 Diagrama do banco de dados
<div align="center">
<sub>Figura X - Diagrama do banco de dados</sub>
<img src="../assets/diagrama-carros.png" width="100%">
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

&ensp;O banco de dados é composto por três tabelas principais:

1. **User** - Armazena informações dos usuários cadastrados
   - UniqueID (PK): UUID - Identificador único do usuário
   - nome: VARCHAR(100) - Nome completo do usuário
   - email: VARCHAR(100) - Endereço de email para login
   - senha: VARCHAR(255) - Senha de acesso.

2. **Marca** - Registra as marcas de carros disponíveis
   - UniqueID (PK): UUID - Identificador único da marca
   - nome: VARCHAR(50) - Nome da marca (ex: Toyota, Ford, BMW)
   - logo_url: VARCHAR(255) - URL para a imagem do logotipo da marca

3. **Carro** - Contém as informações específicas de cada modelo de carro
   - UniqueID (PK): UUID - Identificador único do carro
   - modelo: VARCHAR(100) - Nome/modelo do carro
   - potencia: INT - Potência do motor (em cavalos)
   - ano_fabricacao: INT - Ano em que o carro foi fabricado
   - marca_id (FK): UUID - Referência ao ID da marca do carro
   - user_id (FK): UUID - Referência ao ID do usuário que cadastrou o carro

### 2.2 Models 
&ensp;O sistema web implementa três models principais que representam as entidades do domínio e gerenciam a interação com o banco de dados PostgreSQL:
#### Model User
O model User representa os usuários do sistema e possui os seguintes atributos:

- **id:** Identificador único do usuário
- **nome:** Nome completo do usuário
- **email:** Endereço de email (usado para autenticação)
- **senha:** Senha do usuário 

##### Funcionalidades implementadas:

`findAll()`: Busca todos os usuários cadastrados
`findById(id)`: Busca um usuário específico pelo ID
`findByEmail(email)`: Busca um usuário pelo email (usado na autenticação)
`create(userData)`: Cria um novo usuário no sistema
`update(id, userData)`: Atualiza os dados de um usuário existente
`delete(id)`: Remove um usuário do sistema

### Model Marca
&ensp; O model Marca representa as marcas de veículos disponíveis no sistema e possui os seguintes atributos:

- **id:** Identificador único da marca
- **nome:** Nome da marca
- **logo_url:** URL da imagem da logo da marca

#### Funcionalidades implementadas:

`findAll()`: Busca todas as marcas cadastradas, ordenadas por nome
`findById(id)`: Busca uma marca específica pelo ID
`create(marcaData)`: Cadastra uma nova marca no sistema

### Model Carro
&ensp;O model Carro representa os veículos cadastrados pelos usuários e possui os seguintes atributos:

- **id:** Identificador único do carro
- **modelo:** Modelo do veículo
- **potencia:** Potência do motor do veículo
- **ano_fabricacao:** Ano de fabricação do veículo
- **marca_id:** Chave estrangeira referenciando a marca do veículo
- **user_id:** Chave estrangeira referenciando o proprietário do veículo
- **marca_nome:** Nome da marca 
- **marca_logo:** URL do logo da marca 

#### Funcionalidades implementadas:

`findAll()`: Busca todos os carros com informações da marca 
`findById(id)`: Busca um carro específico pelo ID com dados da marca
`findByUserId(userId)`: Busca todos os carros de um usuário específico
`create(carroData)`: Cadastra um novo carro no sistema
`update(id, carroData)`: Atualiza os dados de um carro existente
`delete(id)`: Remove um carro do sistema



### 2.3 Arquitetura
&ensp;Este diagrama descreve a arquitetura de uma aplicação web para gerenciamento de usuários e carros, baseada no padrão MVC e utilizando React para o front-end, Node.js e Express para o back-end e PostgreSQL como banco de dados.


<div align="center">
<sub>Figura X - Arquitetura do projeto</sub>
<img src="../assets/arquitetura.png" width="100%">
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

#### View 

&ensp;A camada de visualização utiliza React.js como tecnologia. Essa camada é responsável por renderizar a interface interativa, que permite a visualização e manipulação dos dados de usuários, carros e marcas. Além disso, o frontend realiza requisições HTTP para o backend e atualiza a interface de acordo com as respostas recebidas, proporcionando uma experiência dinâmica e responsiva para o usuário.

#### Controller

&ensp; A camada de controle foi implementada com Express.js e atua como intermediária entre o frontend e a camada de modelo. Essa camada processa e valida os dados recebidos nas requisições, executa a lógica de negócio necessária e aciona os métodos dos modelos. As respostas são devolvidas no formato JSON, acompanhadas de códigos de status HTTP apropriados. 

&ensp; Foram criados três controllers principais: o UserController, que gerencia o CRUD de usuários e autenticação, o CarroController, responsável por operações relacionadas a veículos, e o MarcaController, que administra as informações das marcas de carros.

#### Model

&ensp; A camada de modelo é o núcleo da lógica de negócio e da persistência de dados no sistema. Nela, são definidas as estruturas de dados e as regras de negócio. Os modelos implementados são o User Model, que gerencia dados de usuários e autenticação, o Carro Model, que lida com as informações dos veículos e seus relacionamentos com usuários e marcas, e o Marca Model, que armazena os dados das marcas. No banco de dados, os relacionamentos são bem definidos: cada carro pertence a uma marca e a um usuário, estabelecendo relações N:1 entre as tabelas.

#### API

A aplicação implementa endpoints que permitem o gerenciamento de usuários (incluindo autenticação via login), carros e marcas. As validações são realizadas nos Controllers, garantindo a integridade dos dados antes de qualquer operação no banco de dados. As respostas seguem os padrões HTTP, com códigos como 200 (sucesso), 201 (recurso criado), 400 (dados inválidos), 404 (recurso não encontrado) e 500 (erro interno do servidor).

&ensp; **Legenda do Diagrama:** No diagrama de arquitetura, as setas não-pontilhadas representam o fluxo de requisições e as setas pontilhadas indicam o fluxo de respostas que retornam com os dados processados.

### 2.4 Interface e Navegação

[Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.]### 2.4 Interface e Navegação

&ensp; O frontend do sistema foi desenvolvido utilizando React.js, proporcionando uma experiência de usuário moderna, responsiva e intuitiva. A interface foi estruturada em componentes reutilizáveis, facilitando a manutenção e a escalabilidade do projeto.

#### Arquitetura Frontend

&ensp; A aplicação utiliza um conjunto robusto de tecnologias e bibliotecas modernas. O React Router DOM é responsável pela navegação entre páginas sem recarregamento, proporcionando uma experiência fluida ao usuário. Para a comunicação HTTP com a API REST, utilizamos o Axios, que oferece uma interface simples e confiável para requisições. A biblioteca Lucide React fornece ícones modernos e consistentes em toda a aplicação, enquanto o Tailwind CSS atua como framework CSS utilitário para estilização.

#### Estrutura de Navegação

&ensp; A navegação principal é realizada por meio de um sistema de rotas protegidas, garantindo que apenas usuários autenticados tenham acesso às funcionalidades principais. 

#####  Página de Login
&ensp; A interface de autenticação apresenta campos para email e senha com validação de formulário em tempo real. O sistema fornece feedback visual específico para erros de login, facilitando a identificação de problemas pelo usuário. Adicionalmente, existe um link direto para a página de cadastro, permitindo que novos usuários se registrem facilmente na plataforma.

<div align="center">
<sub>Figura X - Tela de Login</sub>
<img src="../assets/tela-login.png" width="100%">
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

##### Página de Cadastro

&ensp; O formulário de cadastro é completo e intuitivo, contendo os campos essenciais: Nome, Email, Senha e Confirmação de Senha. As validações são realizadas do lado cliente, verificando aspectos como comprimento mínimo da senha e confirmação correta. Após um cadastro bem-sucedido, o sistema realiza redirecionamento automático para a área logada.

<div align="center">
<sub>Figura X - Página de Cadastro</sub>
<img src="../assets/tela-cadastro.png" width="100%">
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

##### Home Page
&ensp; O dashboard personalizado exibe informações detalhadas do usuário logado, incluindo uma listagem dos carros cadastrados em formato de cards. Os usuários têm acesso a botões de ação para adicionar, ou remover carros.

<div align="center">
<sub>Figura X - HomePage</sub>
<img src="../assets/homepage.png" width="100%">
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

##### Cadastro de Carro

&ensp; Ao clicar no botão de adicionar carro na homepage, abre-se um modal contendo um formulário para o preenchimento das informações. O formulário permite a inclusão de veículos na plataforma. Os campos obrigatórios incluem Modelo, Marca, Ano e Potência, todos com validação de dados antes do envio. A seleção de marca é realizada através de um dropdown conectado diretamente à API, garantindo dados atualizados e consistentes.

<div align="center">
<sub>Figura X - Formulário</sub>
<img src="../assets/modal.png" width="100%">
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

<div align="center">
<sub>Figura X - Formulário exemplo</sub>
<img src="../assets/exemplo.png" width="100%">
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

&ensp; A interface proporciona uma experiência fluida e intuitiva, com navegação clara e feedback constante ao usuário, garantindo alta usabilidade e satisfação na utilização do sistema de gestão automotiva.
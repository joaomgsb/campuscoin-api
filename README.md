# CampusCoin API

CampusCoin é uma API baseada em Node.js projetada para gerenciar tokens digitais em um ambiente de campus. Ela fornece rotas para lidar com a autenticação de usuários, operações comuns e ações relacionadas a jornadas.

## Estrutura do Projeto

O projeto está estruturado da seguinte maneira:

- **`package.json`**: Contém as dependências e metadados do projeto.
- **`server.js`**: O ponto de entrada para iniciar o servidor.
- **`routes/`**: Contém os diferentes manipuladores de rotas da API:
  - `auth.js`: Gerencia as rotas de autenticação de usuários.
  - `common.js`: Contém operações comuns usadas em toda a API.
  - `journey.js`: Lida com rotas relacionadas a jornadas ou ações dos usuários.

### Dependências

Este projeto é construído usando Node.js e as seguintes dependências principais:
- `express`: Um framework web rápido, minimalista e não opinativo para Node.js.
- `jsonwebtoken`: Utilizado para gerar e verificar tokens JWT.
- `bcryptjs`: Biblioteca para hashing de senhas.
- `mongoose`: Ferramenta de modelagem de objetos do MongoDB para trabalhar em um ambiente assíncrono.
- `dotenv`: Carrega variáveis de ambiente de um arquivo `.env`.

Para a lista completa de dependências, veja o arquivo `package.json`.

## Primeiros Passos

### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados:
- [Node.js](https://nodejs.org/) (versão 12 ou superior)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/silveiradle/campuscoin-api.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd campuscoin-api
   ```
3. Instale dependências:
   ```bash
   npm install
   ```

### Executando o projeto
   ```bash
   node server.js
   ```

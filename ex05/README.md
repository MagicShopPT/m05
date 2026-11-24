Trabalho realizado por: *Vitor Silva* **13422**. Licenciatura em Informática, 24/11/2026.

# Módulo 05 — NODE.JS e EXPRESS

Este ficheiro documenta o progresso do Módulo 05 da unidade curricular de Programação WEB do Instituto Superior Miguel Torga (ISMT) até ao **EX05 — First Express API**.

## Lista de Exercícios Realizados
- [x] **EX01 — First Node Program** *(Nível L1)*: Primeiro programa em Node.js com leitura de argumentos da linha de comandos (`process.argv`) e comandos extra.
- [x] **EX02 — File System** *(Nível L2)*: Operações de leitura, escrita, atualização e eliminação de ficheiros (incluindo manipulação de dados em formato JSON).
- [x] **EX03 — JSON Data Manager** *(Nível L2)*: Gestor de dados persistido em ficheiro JSON com operações `add`, `list`, `search`, `update` e `remove`.
- [x] **EX04 — HTTP Server** *(Nível L3)*: Servidor HTTP nativo (`node:http`, sem Express) respondendo a diferentes URLs e métodos HTTP.
- [x] **EX05 — First Express API** *(Nível L1)*: API REST inicial com Express (`GET`, respostas JSON, códigos de estado HTTP e endpoint `GET /health`).

## Descrição dos Exercícios e Tomadas de Decisão

### EX01 — First Node Program
* **Objetivo:** Compreender a execução de JavaScript fora do navegador com Node.js e processar argumentos passados pela linha de comandos.
* **Decisões tomadas:**
  * Criação da diretoria `ex01/` dentro de `m05/` e inicialização do projeto com `npm init --yes`.
  * Utilização de `process.argv.slice(2)` para suportar `node app.js <nome>` e comandos adicionais.

### EX02 — File System
* **Objetivo:** Interagir com o sistema de ficheiros através do Node.js para ler, escrever, atualizar e eliminar ficheiros, trabalhando também com JSON.
* **Decisões tomadas:**
  * Utilização de `node:fs` e `node:path` com serialização e desserialização JSON (`JSON.stringify` / `JSON.parse`) e tratamento de erros.

### EX03 — JSON Data Manager
* **Objetivo:** Implementar um gestor de dados sobre um ficheiro JSON com operações completas de manipulação (`add`, `list`, `search`, `update` e `remove`).
* **Decisões tomadas:**
  * Persistência em `data/items.json` com geração incremental de `id` e timestamps (`createdAt` / `updatedAt`).
  * Validação de argumentos e IDs inexistentes antes de atualizar ou remover registos.

### EX04 — HTTP Server
* **Objetivo:** Construir um servidor HTTP diretamente com o módulo nativo `node:http` (sem Express), tratando diferentes caminhos/URLs, métodos HTTP e códigos de estado.
* **Decisões tomadas:**
  * Análise do URL com `new URL(req.url, ...)` e leitura assíncrona do corpo dos pedidos via eventos `data` e `end` do `IncomingMessage`.
  * Respostas estruturadas em JSON/HTML com códigos HTTP adequados (`200`, `201`, `400`, `404`, `405`).

### EX05 — First Express API
* **Objetivo:** Criar uma API com Express devolvendo respostas JSON, utilizando rotas `GET`, códigos de estado HTTP apropriados e um endpoint de *health check*.
* **Decisões tomadas:**
  * Inicialização do projeto com `npm init --yes` e instalação do pacote `express` (`npm install express`).
  * Implementação das rotas `GET /`, `GET /health`, `GET /api/info`, `GET /api/items` e `GET /api/items/:id` com status codes explícitos (`200` e `404`) e middleware final `404`.

## Tecnologias Utilizadas
* Node.js
* Express (`express`)
* JavaScript (JSON)

## Como Executar
1. Abrir a pasta `m05/ex05` no Visual Studio Code.
2. No terminal integrado, instalar dependências (`npm install`) e iniciar o servidor (`node index.js`).
3. Testar os endpoints em `http://localhost:3001` (ex.: `/health`, `/api/items`).

## Estrutura do Projeto
```text
m05/
├── ex01/ ... ex04/
├── ex05/
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── README.md
└── README.md
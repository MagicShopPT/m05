Trabalho realizado por: *Vitor Silva* **13422**. Licenciatura em Informática, 24/11/2026.

# Módulo 05 — NODE.JS e EXPRESS

Este ficheiro documenta o progresso do Módulo 05 da unidade curricular de Programação WEB do Instituto Superior Miguel Torga (ISMT) até ao **EX03 — JSON Data Manager**[cite: 13, 14].

## Lista de Exercícios Realizados
- [x] **EX01 — First Node Program** *(Nível L1)*: Primeiro programa em Node.js com leitura de argumentos da linha de comandos (`process.argv`) e comandos extra[cite: 14].
- [x] **EX02 — File System** *(Nível L2)*: Operações de leitura, escrita, atualização e eliminação de ficheiros (incluindo manipulação de dados em formato JSON)[cite: 14].
- [x] **EX03 — JSON Data Manager** *(Nível L2)*: Gestor de dados persistido em ficheiro JSON com operações `add`, `list`, `search`, `update` e `remove`[cite: 14].

## Descrição dos Exercícios e Tomadas de Decisão

### EX01 — First Node Program
* **Objetivo:** Compreender a execução de JavaScript fora do navegador com Node.js e processar argumentos passados pela linha de comandos[cite: 14, 18].
* **Decisões tomadas:**
  * Criação da diretoria `ex01/` dentro de `m05/` e inicialização do projeto com `npm init --yes`[cite: 13, 19].
  * Utilização de `process.argv.slice(2)` para suportar `node app.js <nome>` e comandos adicionais[cite: 14].

### EX02 — File System
* **Objetivo:** Interagir com o sistema de ficheiros através do Node.js para ler, escrever, atualizar e eliminar ficheiros, trabalhando também com JSON[cite: 14].
* **Decisões tomadas:**
  * Utilização de `node:fs` e `node:path` com serialização e desserialização JSON (`JSON.stringify` / `JSON.parse`) e tratamento de erros.

### EX03 — JSON Data Manager
* **Objetivo:** Implementar um gestor de dados sobre um ficheiro JSON com operações completas de manipulação (`add`, `list`, `search`, `update` e `remove`)[cite: 14].
* **Decisões tomadas:**
  * Persistência em `data/items.json` com geração incremental de `id` e timestamps (`createdAt` / `updatedAt`).
  * Validação de argumentos e IDs inexistentes antes de atualizar ou remover registos.

## Tecnologias Utilizadas
* Node.js[cite: 18]
* JavaScript (`node:fs`, `node:path`, JSON)[cite: 14, 18]

## Como Executar
1. Abrir a pasta `m05/ex03` no Visual Studio Code[cite: 13].
2. No terminal integrado, executar operações como `node app.js add "<título>" "<categoria>"`, `node app.js list`, `node app.js search "<termo>"`, `node app.js update <id> "<novoTítulo>"` ou `node app.js remove <id>`[cite: 14].

## Estrutura do Projeto
```text
m05/
├── ex01/
│   ├── app.js
│   ├── package.json
│   └── README.md
├── ex02/
│   ├── app.js
│   ├── package.json
│   └── README.md
├── ex03/
│   ├── app.js
│   ├── package.json
│   └── README.md
└── README.md
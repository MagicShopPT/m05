Trabalho realizado por: *Vitor Silva* **13422**. Licenciatura em Informática, 24/11/2026.

# Módulo 05 — NODE.JS e EXPRESS

Este ficheiro documenta o progresso do Módulo 05 da unidade curricular de Programação WEB do Instituto Superior Miguel Torga (ISMT) até ao **EX02 — File System**[cite: 13, 14].

## Lista de Exercícios Realizados
- [x] **EX01 — First Node Program** *(Nível L1)*: Primeiro programa em Node.js com leitura de argumentos da linha de comandos (`process.argv`) e comandos extra (`greet`, `upper`, `info`, `help`).
- [x] **EX02 — File System** *(Nível L2)*: Operações de leitura, escrita, atualização e eliminação de ficheiros (incluindo manipulação de dados em formato JSON)[cite: 14].

## Descrição dos Exercícios e Tomadas de Decisão

### EX01 — First Node Program
* **Objetivo:** Compreender a execução de JavaScript fora do navegador com Node.js e processar argumentos passados pela linha de comandos[cite: 14, 18].
* **Decisões tomadas:**
  * Criação da diretoria `ex01/` dentro de `m05/` e inicialização do projeto com `npm init --yes`[cite: 13, 19].
  * Utilização de `process.argv.slice(2)` para suportar o formato `node app.js <nome>` e comandos adicionais (`greet`, `upper`, `info`, `help`)[cite: 14].

### EX02 — File System
* **Objetivo:** Interagir com o sistema de ficheiros através do Node.js para ler, escrever, atualizar e eliminar ficheiros, trabalhando também com JSON[cite: 14].
* **Decisões tomadas:**
  * Utilização dos módulos nativos `node:fs` e `node:path` para gerir ficheiros de texto e JSON dentro de uma subpasta `data/`.
  * Serialização e desserialização com `JSON.stringify` e `JSON.parse`, incluindo tratamento de erros e verificação de existência antes de ler, atualizar ou eliminar.

## Tecnologias Utilizadas
* Node.js[cite: 18]
* JavaScript (`node:fs`, `node:path`, JSON)[cite: 14, 18]

## Como Executar
1. Abrir a pasta `m05/ex02` no Visual Studio Code[cite: 13].
2. No terminal integrado, executar os comandos de leitura, escrita ou gestão de JSON (ex.: `node app.js help`)[cite: 14].

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
└── README.md
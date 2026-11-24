// EX03 — JSON Data Manager (Módulo 05 - Node.js e Express)
// Operações sobre ficheiro JSON: add, list, search, update, remove

const fs = require('node:fs');
const path = require('node:path');

const dataDir = path.join(__dirname, 'data');
const dbFile = path.join(dataDir, 'items.json');

const ensureDatabase = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify([], null, 2), 'utf-8');
  }
};

const readItems = () => {
  ensureDatabase();
  const raw = fs.readFileSync(dbFile, 'utf-8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
};

const writeItems = (items) => {
  ensureDatabase();
  fs.writeFileSync(dbFile, JSON.stringify(items, null, 2), 'utf-8');
};

const getNextId = (items) => {
  if (items.length === 0) return 1;
  const maxId = items.reduce((max, item) => (item.id > max ? item.id : max), 0);
  return maxId + 1;
};

const showHelp = () => {
  console.log('=== EX03 — JSON Data Manager ===');
  console.log('Comandos disponíveis:');
  console.log('  node app.js add "<título>" "<categoria>"   -> Adiciona um registo');
  console.log('  node app.js list                           -> Lista todos os registos');
  console.log('  node app.js search "<termo>"               -> Pesquisa por título ou categoria');
  console.log('  node app.js update <id> "<novoTítulo>"     -> Atualiza um registo pelo ID');
  console.log('  node app.js remove <id>                    -> Remove um registo pelo ID');
};

const [, , operation, arg1, arg2] = process.argv;

try {
  if (!operation || operation === 'help') {
    showHelp();
  } else if (operation === 'add') {
    if (!arg1) {
      console.log('Erro: indica um título. Ex.: node app.js add "Aprender Express" "Estudo"');
    } else {
      const items = readItems();
      const newItem = {
        id: getNextId(items),
        title: arg1.trim(),
        category: (arg2 || 'Geral').trim(),
        createdAt: new Date().toISOString(),
      };
      items.push(newItem);
      writeItems(items);
      console.log('Registo adicionado com sucesso:', newItem);
    }
  } else if (operation === 'list') {
    const items = readItems();
    if (items.length === 0) {
      console.log('Não existem registos em data/items.json.');
    } else {
      console.log(`Total de registos (${items.length}):`);
      console.table(items);
    }
  } else if (operation === 'search') {
    if (!arg1) {
      console.log('Erro: indica um termo de pesquisa. Ex.: node app.js search "Express"');
    } else {
      const query = arg1.trim().toLowerCase();
      const items = readItems();
      const matches = items.filter(
        (item) =>
          String(item.title).toLowerCase().includes(query) ||
          String(item.category).toLowerCase().includes(query)
      );
      if (matches.length === 0) {
        console.log(`Nenhum registo encontrado para "${arg1}".`);
      } else {
        console.log(`Resultados para "${arg1}" (${matches.length}):`);
        console.table(matches);
      }
    }
  } else if (operation === 'update') {
    const targetId = Number(arg1);
    if (!arg1 || Number.isNaN(targetId) || !arg2) {
      console.log('Erro: indica ID e novo título. Ex.: node app.js update 1 "Título Atualizado"');
    } else {
      const items = readItems();
      const index = items.findIndex((item) => item.id === targetId);
      if (index === -1) {
        console.log(`Registo com ID ${targetId} não encontrado.`);
      } else {
        items[index] = {
          ...items[index],
          title: arg2.trim(),
          updatedAt: new Date().toISOString(),
        };
        writeItems(items);
        console.log('Registo atualizado com sucesso:', items[index]);
      }
    }
  } else if (operation === 'remove') {
    const targetId = Number(arg1);
    if (!arg1 || Number.isNaN(targetId)) {
      console.log('Erro: indica o ID a remover. Ex.: node app.js remove 1');
    } else {
      const items = readItems();
      const index = items.findIndex((item) => item.id === targetId);
      if (index === -1) {
        console.log(`Registo com ID ${targetId} não encontrado.`);
      } else {
        const [removed] = items.splice(index, 1);
        writeItems(items);
        console.log('Registo removido com sucesso:', removed);
      }
    }
  } else {
    console.log(`Operação desconhecida "${operation}".`);
    showHelp();
  }
} catch (err) {
  console.error('Erro no JSON Data Manager:', err.message);
}
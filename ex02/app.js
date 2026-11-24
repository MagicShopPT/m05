// EX02 — File System (Módulo 05 - Node.js e Express)
// Leitura, escrita, atualização e eliminação de ficheiros (texto e JSON)

const fs = require('node:fs');
const path = require('node:path');

const dataDir = path.join(__dirname, 'data');
const defaultJsonFile = path.join(dataDir, 'notas.json');
const defaultTextFile = path.join(dataDir, 'mensagem.txt');

const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const showHelp = () => {
  console.log('=== EX02 — File System ===');
  console.log('Comandos disponíveis:');
  console.log('  node app.js write-text "<texto>"          -> Escreve em data/mensagem.txt');
  console.log('  node app.js read-text                     -> Lê data/mensagem.txt');
  console.log('  node app.js write-json "<titulo>" "<nota>" -> Cria/guarda objeto em data/notas.json');
  console.log('  node app.js read-json                     -> Lê e faz parse de data/notas.json');
  console.log('  node app.js update-json "<novoTexto>"     -> Atualiza o JSON existente');
  console.log('  node app.js delete <ficheiro>             -> Elimina um ficheiro em data/ (ex: notas.json)');
};

const [, , command, arg1, arg2] = process.argv;

try {
  if (!command || command === 'help') {
    showHelp();
  } else if (command === 'write-text') {
    if (!arg1) {
      console.log('Erro: indica o texto a escrever. Ex.: node app.js write-text "Olá Node FS"');
    } else {
      ensureDataDir();
      fs.writeFileSync(defaultTextFile, arg1, 'utf-8');
      console.log('Ficheiro de texto escrito com sucesso:', defaultTextFile);
    }
  } else if (command === 'read-text') {
    if (!fs.existsSync(defaultTextFile)) {
      console.log('Aviso: data/mensagem.txt ainda não existe.');
    } else {
      const content = fs.readFileSync(defaultTextFile, 'utf-8');
      console.log('Conteúdo de mensagem.txt:', content);
    }
  } else if (command === 'write-json') {
    if (!arg1 || !arg2) {
      console.log('Erro: indica título e nota. Ex.: node app.js write-json "Aula 07" "Express e REST"');
    } else {
      ensureDataDir();
      const payload = {
        titulo: arg1,
        nota: arg2,
        atualizadoEm: new Date().toISOString(),
      };
      fs.writeFileSync(defaultJsonFile, JSON.stringify(payload, null, 2), 'utf-8');
      console.log('Ficheiro JSON escrito com sucesso:', defaultJsonFile);
    }
  } else if (command === 'read-json') {
    if (!fs.existsSync(defaultJsonFile)) {
      console.log('Aviso: data/notas.json ainda não existe.');
    } else {
      const raw = fs.readFileSync(defaultJsonFile, 'utf-8');
      const parsed = JSON.parse(raw);
      console.log('Dados JSON lidos:', parsed);
    }
  } else if (command === 'update-json') {
    if (!arg1) {
      console.log('Erro: indica o novo conteúdo. Ex.: node app.js update-json "Nota atualizada"');
    } else if (!fs.existsSync(defaultJsonFile)) {
      console.log('Aviso: data/notas.json não existe. Usa primeiro write-json.');
    } else {
      const raw = fs.readFileSync(defaultJsonFile, 'utf-8');
      const currentData = JSON.parse(raw);
      const updatedData = {
        ...currentData,
        nota: arg1,
        atualizadoEm: new Date().toISOString(),
      };
      fs.writeFileSync(defaultJsonFile, JSON.stringify(updatedData, null, 2), 'utf-8');
      console.log('JSON atualizado com sucesso:', updatedData);
    }
  } else if (command === 'delete') {
    if (!arg1) {
      console.log('Erro: indica o nome do ficheiro em data/. Ex.: node app.js delete notas.json');
    } else {
      const targetPath = path.join(dataDir, path.basename(arg1));
      if (!fs.existsSync(targetPath)) {
        console.log('Aviso: o ficheiro não existe:', targetPath);
      } else {
        fs.unlinkSync(targetPath);
        console.log('Ficheiro eliminado com sucesso:', targetPath);
      }
    }
  } else {
    console.log(`Comando desconhecido "${command}".`);
    showHelp();
  }
} catch (err) {
  console.error('Erro na operação de ficheiros:', err.message);
}
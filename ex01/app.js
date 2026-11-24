// EX01 — First Node Program (Módulo 05 - Node.js e Express)
// Leitura de argumentos da linha de comandos via process.argv

const args = process.argv.slice(2);
const command = args[0];
const restText = args.slice(1).join(' ');

const showHelp = () => {
  console.log('=== EX01 — First Node Program ===');
  console.log('Uso:');
  console.log('  node app.js <nome>          -> Cumprimenta <nome>');
  console.log('  node app.js greet <nome>    -> Saudação personalizada');
  console.log('  node app.js upper <texto>   -> Converte texto para maiúsculas');
  console.log('  node app.js info            -> Mostra informações do ambiente Node.js');
  console.log('  node app.js help            -> Mostra esta ajuda');
};

if (!command || command === 'help' || command === '--help') {
  showHelp();
} else if (command === 'info') {
  console.log('Versão do Node.js:', process.version);
  console.log('Sistema operativo:', process.platform);
  console.log('Data e hora:', new Date().toLocaleString('pt-PT'));
} else if (command === 'greet') {
  if (!restText) {
    console.log('Erro: indica um nome. Exemplo: node app.js greet Vitor');
  } else {
    console.log(`Olá, ${restText}! Bem-vindo ao Módulo 05 com Node.js.`);
  }
} else if (command === 'upper') {
  if (!restText) {
    console.log('Erro: indica um texto. Exemplo: node app.js upper programacao web');
  } else {
    console.log(restText.toUpperCase());
  }
} else {
  const name = args.join(' ');
  console.log(`Olá, ${name}! O teu primeiro programa Node.js está a funcionar.`);
}
// EX05 — First Express API (Módulo 05 - Node.js e Express)
// Servidor Express com GET, respostas JSON, status codes e endpoint /health

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const sampleItems = [
  { id: 1, title: 'Introdução ao Express', completed: true },
  { id: 2, title: 'Rotas GET e JSON', completed: true },
  { id: 3, title: 'Códigos de estado HTTP', completed: false },
];

// Rota raiz
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Bem-vindo à First Express API (EX05)',
    module: 'Módulo 05 — Node.js e Express',
    endpoints: ['GET /health', 'GET /api/info', 'GET /api/items', 'GET /api/items/:id'],
  });
});

// Bónus: Health endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Informações da API
app.get('/api/info', (req, res) => {
  res.status(200).json({
    exercise: 'EX05 — First Express API',
    author: {
      name: 'Vitor Silva',
      number: 13422,
    },
    nodeVersion: process.version,
  });
});

// Listar recursos em JSON
app.get('/api/items', (req, res) => {
  res.status(200).json({
    total: sampleItems.length,
    items: sampleItems,
  });
});

// Obter um recurso específico por ID
app.get('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = sampleItems.find((entry) => entry.id === id);

  if (!item) {
    return res.status(404).json({
      error: `Item com ID ${id} não encontrado.`,
    });
  }

  return res.status(200).json(item);
});

// Fallback 404 para rotas inexistentes
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada.',
    method: req.method,
    path: req.originalUrl,
  });
});

app.listen(PORT, () => {
  console.log(`Express API a correr em http://localhost:${PORT}`);
});
// EX04 — HTTP Server (Módulo 05 - Node.js e Express)
// Servidor HTTP nativo com node:http (sem Express), suportando URLs e métodos HTTP

const http = require('node:http');
const { URL } = require('node:url');

const PORT = 3000;

let items = [
  { id: 1, name: 'Servidor HTTP Nativo', status: 'ativo' },
  { id: 2, name: 'Rotas e Métodos HTTP', status: 'ativo' },
];

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload, null, 2));
};

const parseRequestBody = (req) =>
  new Promise((resolve, reject) => {
    let rawBody = '';

    req.on('data', (chunk) => {
      rawBody += chunk.toString('utf-8');
    });

    req.on('end', () => {
      if (!rawBody.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(rawBody));
      } catch {
        reject(new Error('JSON inválido no corpo do pedido.'));
      }
    });

    req.on('error', reject);
  });

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Rota raiz (/)
  if (pathname === '/') {
    if (method !== 'GET') {
      return sendJson(res, 405, { error: 'Método não permitido nesta rota.' });
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(`
      <h1>EX04 — HTTP Server (Node.js Nativo)</h1>
      <p>Servidor HTTP criado com <code>node:http</code> (sem Express).</p>
      <ul>
        <li><code>GET /</code> — Esta página</li>
        <li><code>GET /about</code> — Informações do exercício</li>
        <li><code>GET /api/items</code> — Listar itens (suporta query <code>?status=ativo</code>)</li>
        <li><code>POST /api/items</code> — Criar item (JSON: <code>{"name":"...","status":"..."}</code>)</li>
        <li><code>PUT /api/items/:id</code> — Atualizar item</li>
        <li><code>DELETE /api/items/:id</code> — Remover item</li>
      </ul>
    `);
  }

  // Rota /about
  if (pathname === '/about') {
    if (method !== 'GET') {
      return sendJson(res, 405, { error: 'Método não permitido em /about.' });
    }
    return sendJson(res, 200, {
      exercise: 'EX04 — HTTP Server',
      module: 'Módulo 05 — Node.js e Express',
      framework: 'Nenhum (módulo nativo node:http)',
      author: { name: 'Vitor Silva', number: 13422 },
    });
  }

  // Coleção /api/items
  if (pathname === '/api/items') {
    if (method === 'GET') {
      const statusFilter = parsedUrl.searchParams.get('status');
      const result = statusFilter
        ? items.filter((item) => item.status === statusFilter)
        : items;
      return sendJson(res, 200, { total: result.length, data: result });
    }

    if (method === 'POST') {
      try {
        const body = await parseRequestBody(req);
        if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
          return sendJson(res, 400, { error: 'O campo "name" é obrigatório.' });
        }

        const nextId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
        const newItem = {
          id: nextId,
          name: body.name.trim(),
          status: (body.status || 'ativo').trim(),
        };
        items.push(newItem);
        return sendJson(res, 201, newItem);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    return sendJson(res, 405, { error: `Método ${method} não suportado em /api/items.` });
  }

  // Recurso individual /api/items/:id
  const itemMatch = pathname.match(/^\/api\/items\/(\d+)$/);
  if (itemMatch) {
    const id = Number(itemMatch[1]);
    const index = items.findIndex((item) => item.id === id);

    if (method === 'GET') {
      if (index === -1) {
        return sendJson(res, 404, { error: `Item com ID ${id} não encontrado.` });
      }
      return sendJson(res, 200, items[index]);
    }

    if (method === 'PUT') {
      if (index === -1) {
        return sendJson(res, 404, { error: `Item com ID ${id} não encontrado.` });
      }
      try {
        const body = await parseRequestBody(req);
        if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
          return sendJson(res, 400, { error: 'O campo "name" é obrigatório para atualizar.' });
        }
        items[index] = {
          ...items[index],
          name: body.name.trim(),
          status: body.status ? String(body.status).trim() : items[index].status,
        };
        return sendJson(res, 200, items[index]);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    if (method === 'DELETE') {
      if (index === -1) {
        return sendJson(res, 404, { error: `Item com ID ${id} não encontrado.` });
      }
      const [deleted] = items.splice(index, 1);
      return sendJson(res, 200, { deleted });
    }

    return sendJson(res, 405, { error: `Método ${method} não suportado em /api/items/${id}.` });
  }

  // Rota inexistente (404)
  return sendJson(res, 404, {
    error: 'Rota não encontrada.',
    path: pathname,
  });
});

server.listen(PORT, () => {
  console.log(`Servidor HTTP nativo a correr em http://localhost:${PORT}`);
});
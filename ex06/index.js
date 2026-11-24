// EX06 — Routes and Parameters (Módulo 05 - Node.js e Express)
// API de livros com GET /api/books, GET /api/books/:id e query parameters

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const books = [
  {
    id: 1,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    category: 'JavaScript',
    year: 2008,
  },
  {
    id: 2,
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    category: 'JavaScript',
    year: 2018,
  },
  {
    id: 3,
    title: 'Node.js Design Patterns',
    author: 'Mario Casciaro',
    category: 'Node.js',
    year: 2020,
  },
  {
    id: 4,
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'Arquitetura',
    year: 2017,
  },
];

// Rota raiz
app.get('/', (req, res) => {
  res.status(200).json({
    exercise: 'EX06 — Routes and Parameters',
    endpoints: [
      'GET /api/books',
      'GET /api/books?category=JavaScript&year=2018&q=eloquent',
      'GET /api/books/:id',
    ],
  });
});

// GET /api/books (com suporte bónus a query parameters)
app.get('/api/books', (req, res) => {
  const { category, author, year, q } = req.query;
  let filteredBooks = [...books];

  if (category) {
    const catLower = String(category).trim().toLowerCase();
    filteredBooks = filteredBooks.filter(
      (book) => book.category.toLowerCase() === catLower
    );
  }

  if (author) {
    const authorLower = String(author).trim().toLowerCase();
    filteredBooks = filteredBooks.filter((book) =>
      book.author.toLowerCase().includes(authorLower)
    );
  }

  if (year) {
    const yearNum = Number(year);
    if (Number.isNaN(yearNum)) {
      return res.status(400).json({
        error: 'O parâmetro de consulta "year" deve ser um número válido.',
      });
    }
    filteredBooks = filteredBooks.filter((book) => book.year === yearNum);
  }

  if (q) {
    const queryLower = String(q).trim().toLowerCase();
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(queryLower) ||
        book.author.toLowerCase().includes(queryLower) ||
        book.category.toLowerCase().includes(queryLower)
    );
  }

  return res.status(200).json({
    total: filteredBooks.length,
    filtersApplied: { category, author, year, q },
    books: filteredBooks,
  });
});

// GET /api/books/:id (parâmetro de rota dinâmico)
app.get('/api/books/:id', (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: 'O parâmetro "id" deve ser um número válido.',
    });
  }

  const book = books.find((item) => item.id === id);

  if (!book) {
    return res.status(404).json({
      error: `Livro com ID ${id} não encontrado.`,
    });
  }

  return res.status(200).json(book);
});

// Rota inexistente (404)
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada.',
    path: req.originalUrl,
  });
});

app.listen(PORT, () => {
  console.log(`API de livros (EX06) a correr em http://localhost:${PORT}`);
});
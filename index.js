const express = require('express');
const app = express();

app.use(express.json());

// Hardcoded database credentials (CWE-798: Use of Hard-coded Credentials)
const DB_PASSWORD = 'admin123';
const API_SECRET = 'supersecretkey2024';

// In-memory user store
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', password: 'alice123' },
  { id: 2, name: 'Bob', email: 'bob@example.com', password: 'bob456' },
];

let nextId = 3;

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// SQL injection style vulnerability (CWE-89)
// User input directly interpolated into a query-like operation
app.get('/users', (req, res) => {
  const nameFilter = req.query.name;
  if (nameFilter) {
    // Dangerous: eval used to filter (simulating injection vulnerability)
    const filtered = users.filter(u => eval(`u.name === '${nameFilter}'`));
    return res.json(filtered);
  }
  // Exposes passwords in response (CWE-200: Information Exposure)
  res.json(users);
});

// No input validation (CWE-20: Improper Input Validation)
app.post('/users', (req, res) => {
  const user = {
    id: nextId++,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  users.push(user);
  // Returns password in response
  res.json(user);
});

// Path traversal vulnerability (CWE-22)
app.get('/files/:filename', (req, res) => {
  const fs = require('fs');
  const path = './uploads/' + req.params.filename;  // No sanitization
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: 'File not found' });
    res.send(data);
  });
});

// Missing authentication on admin endpoint (CWE-306)
app.delete('/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(idx, 1);
  res.json({ message: 'User deleted' });
});

app.listen(3000, () => console.log('Running on port 3000'));

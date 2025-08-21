const express = require('express');
const router = express.Router();

const PRIORITIES = ['low', 'medium', 'high'];
let tasks = [];
let nextId = 1;

function badRequest(message) {
  const err = new Error(message);
  err.statusCode = 400;
  throw err;
}

function notFound() {
  const err = new Error('Task not found');
  err.statusCode = 404;
  throw err;
}

function parseId(param) {
  const id = Number(param);
  if (!Number.isInteger(id)) badRequest('Invalid id');
  return id;
}

function validateCreate(body) {
  const keys = Object.keys(body);
  const allowed = ['title', 'description', 'priority'];
  if (!keys.every(k => allowed.includes(k))) badRequest('Unknown fields');
  if (typeof body.title !== 'string' || !body.title.trim()) badRequest('Title required');
  if (body.description !== undefined && typeof body.description !== 'string') badRequest('Description must be string');
  if (body.priority !== undefined && !PRIORITIES.includes(body.priority)) badRequest('Invalid priority');
}

function validatePut(body) {
  const keys = Object.keys(body);
  const allowed = ['title', 'description', 'priority', 'completed'];
  if (!keys.every(k => allowed.includes(k))) badRequest('Unknown fields');
  if (typeof body.title !== 'string' || !body.title.trim()) badRequest('Title required');
  if (body.description !== undefined && typeof body.description !== 'string') badRequest('Description must be string');
  if (body.priority !== undefined && !PRIORITIES.includes(body.priority)) badRequest('Invalid priority');
  if (body.completed !== undefined && typeof body.completed !== 'boolean') badRequest('Completed must be boolean');
}

router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', (req, res, next) => {
  try {
    validateCreate(req.body);
    const task = {
      id: nextId++,
      title: req.body.title,
      description: req.body.description || '',
      priority: req.body.priority || 'low',
      completed: false,
      createdAt: new Date().toISOString()
    };
    tasks.push(task);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) notFound();
    validatePut(req.body);
    const t = tasks[idx];
    t.title = req.body.title;
    t.description = req.body.description || '';
    t.priority = req.body.priority || 'low';
    if ('completed' in req.body) t.completed = req.body.completed;
    res.json(t);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) notFound();
    tasks.splice(idx, 1);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/toggle', (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) notFound();
    tasks[idx].completed = !tasks[idx].completed;
    res.json(tasks[idx]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

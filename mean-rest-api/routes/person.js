const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// GET /person - list all people
router.get('/', async (req, res) => {
  const people = await Person.find();
  res.render('list', { people });
});

// POST /person - show form to add person
router.get('/new', (req, res) => {
  res.render('form', { person: {}, action: '/person', method: 'POST' });
});

// POST create new person
router.post('/', async (req, res) => {
  await Person.create(req.body);
  res.redirect('/person');
});

// PUT /person/:id - show form to edit
router.get('/:id/edit', async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.render('form', { person, action: `/person/${person._id}?_method=PUT`, method: 'POST' });
});

// PUT update
router.put('/:id', async (req, res) => {
  await Person.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/person');
});

// DELETE confirm
router.get('/:id/delete', async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.render('delete', { person });
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.redirect('/person');
});

module.exports = router;
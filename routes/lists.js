// List Routes

const express = require('express');
const pug = require('pug');
const router = express.Router();
const List = require('../models/list');
const db = require('../db');

// Route to get all list items
router.get('/', async function(req, res, next) {
  try {
    let list_items = await List.getAllListItems();
    return res.render('index', { list_items: list_items });
  } catch (err) {
    err.status = 400;
    return next(err);
  }
});

// This route adds a new list entry into our database, returning {list_item: list_item}
router.post('/', async function(req, res, next) {
  try {
    let new_list = await List.create(req.body);
    // API returns JSON for JQuery to update DOM
    return res.json({ new_list });
  } catch (error) {
    error.status = 409;
    return next(error);
  }
});

// This route should update a single list item by the id provided.
// It should return a JSON of {list: listData}
router.patch('/', async function(req, res, next) {
  const { id, list_item } = req.body;

  try {
    const list = await List.update({
      id,
      list_item
    });
    return res.json({ list, message: 'List item updated' });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
});

// This route should remove a list item by the id provided(passed in by ajax req body in json form).
// Should return a JSON of {message: "List item deleted"}
router.delete('/', async function(req, res, next) {
  try {
    await List.delete(req.body.id);
    return res.json({ message: 'List item deleted', id: req.body.id });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
});

module.exports = router;

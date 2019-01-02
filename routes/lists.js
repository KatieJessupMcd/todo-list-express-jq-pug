// List Routes

const express = require('express');
const pug = require('pug');
const router = express.Router();
const List = require('../models/list');
const db = require('../db');

// Route to get all list items
router.get('/', async function(req, res, next) {
  console.log('we made it inside the get request!');
  try {
    let list_items = await List.getAllListItems();
    console.log(list_items);
    return res.render('index', list_items);
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

module.exports = router;

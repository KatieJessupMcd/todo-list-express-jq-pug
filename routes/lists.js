// List Routes

const express = require('express');
const pug = require('pug');
const router = express.Router();
const List = require('../models/list');
const db = require('../db');

// Route to get all list items
router.get('/', async function(req, res, next) {
  // console.log('we made it inside the get request!');
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
    console.log('THIS IS NEW_LIST IN POST ', new_list);
    // API returns JSON for JQuery to update DOM
    return res.json({ new_list });
    // let result = res.json({ new_list });
    // console.log(
    //   'this is the result for the POST req WITH list_item',
    //   result['new_list']['list_item']
    // );
    // return result;
    // return res.render('index', {});
  } catch (error) {
    error.status = 409;
    return next(error);
  }
});

// This route should remove a list item by the id provided.
// Should return a JSON of {message: "List item deleted"}
router.delete('/', async function(req, res, next) {
  try {
    await List.delete(req.body.id);
    return res.json({ message: 'List item deleted' });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
});

module.exports = router;

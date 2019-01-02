// List Model for Todo List

const db = require('../db');
const app = require('../app');

class List {
  // This method creates a new list entry for our list table, returning the new list entry record
  static async create({ list_item }) {
    console.log('here in create');
    const result = await db.query(
      `INSERT INTO lists (list_item) VALUES ($1) RETURNING *`,
      [list_item]
    );
    return result.rows[0];
  }
  // This method gets all list entries from list table
  static async getAllListItems() {
    const result = await db.query(`SELECT list_item FROM lists`);
    return result.rows;
  }
}

module.exports = List;

// List Model for Todo List

const db = require('../db');
const app = require('../app');

class List {
  // This method creates a new list entry for our list table, returning the new list entry record
  static async create({ list_item }) {
    const result = await db.query(
      `INSERT INTO lists (list_item) VALUES ($1) RETURNING *`,
      [list_item]
    );
    return result.rows[0];
  }
  // This method gets all list entries from list table
  static async getAllListItems() {
    const result = await db.query(`SELECT id, list_item FROM lists`);
    return result.rows;
  }

  // update should update a list item with user provided data
  static async update({ id, list_item }) {
    const result = await db.query(
      `UPDATE lists SET list_item=$1 WHERE id=$2 RETURNING *`,
      [list_item, id]
    );

    if (result.rows.length === 0) {
      throw new Error(`No job could be updated, no company found :(`);
    }
    return result.rows[0];
  }

  // delete should remove a list item in the database
  static async delete(id) {
    const result = await db.query(`DELETE FROM lists WHERE id=$1 RETURNING *`, [
      id
    ]);
    if (result.rows.length === 0) {
      throw new Error(`List item doesn't exist, or already deleted? :(`);
    }
    return result.rows[0];
  }
} // end List class

module.exports = List;

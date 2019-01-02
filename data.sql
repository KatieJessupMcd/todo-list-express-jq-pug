CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    list_item text NOT NULL, 
    date_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);